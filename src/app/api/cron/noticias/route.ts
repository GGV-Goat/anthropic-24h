export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

// ── RSS sources ───────────────────────────────────────────────────────────────
const RSS_FEEDS = [
  { url: "https://www.anthropic.com/news/rss.xml",       source: "Anthropic Blog" },
  { url: "https://www.theverge.com/rss/index.xml",       source: "The Verge" },
  { url: "https://techcrunch.com/category/artificial-intelligence/feed/", source: "TechCrunch AI" },
];

const KEYWORDS = ["anthropic", "claude", "claude code", "claude design", "claude cowork", "mcp", "model context protocol"];

const CAT_RULES: Array<{ pattern: RegExp; cat: string }> = [
  { pattern: /claude\s*code/i,   cat: "code" },
  { pattern: /claude\s*design/i, cat: "design" },
  { pattern: /claude\s*cowork/i, cat: "cowork" },
  { pattern: /\bclaude\b/i,      cat: "claude" },
  { pattern: /anthropic/i,       cat: "anthropic" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function detectCategory(text: string): string {
  for (const { pattern, cat } of CAT_RULES) {
    if (pattern.test(text)) return cat;
  }
  return "anthropic";
}

function isRelevant(text: string): boolean {
  const lower = text.toLowerCase();
  return KEYWORDS.some((kw) => lower.includes(kw));
}

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function truncate(str: string, max: number): string {
  return str.length <= max ? str : str.slice(0, max - 1) + "…";
}

interface RssItem {
  titulo: string;
  descripcion: string;
  url_fuente: string;
  fuente: string;
  categoria: string;
  fecha_publicacion: string;
}

async function fetchFeed(feedUrl: string, sourceName: string): Promise<RssItem[]> {
  const res = await fetch(feedUrl, {
    headers: { "User-Agent": "Anthropic24H-Bot/1.0" },
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${feedUrl}`);
  const xml = await res.text();

  const items: RssItem[] = [];

  // Match <item> or <entry> blocks (handles both RSS 2.0 and Atom)
  const itemRegex = /<(?:item|entry)[\s>]([\s\S]*?)<\/(?:item|entry)>/gi;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];

    const title = stripTags(
      (/<title[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/title>/i.exec(block) ??
       /<title[^>]*>([\s\S]*?)<\/title>/i.exec(block))?.[1] ?? ""
    );

    const desc = stripTags(
      (/<description[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/description>/i.exec(block) ??
       /<description[^>]*>([\s\S]*?)<\/description>/i.exec(block) ??
       /<summary[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/summary>/i.exec(block) ??
       /<summary[^>]*>([\s\S]*?)<\/summary>/i.exec(block))?.[1] ?? ""
    );

    const link =
      (/<link[^>]*href="([^"]+)"/i.exec(block) ??
       /<link[^>]*>(https?:\/\/[^<]+)<\/link>/i.exec(block))?.[1]?.trim() ?? "";

    const pubDate =
      (/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i.exec(block) ??
       /<published[^>]*>([\s\S]*?)<\/published>/i.exec(block) ??
       /<updated[^>]*>([\s\S]*?)<\/updated>/i.exec(block))?.[1]?.trim() ?? "";

    if (!title || !link) continue;
    const combined = `${title} ${desc}`;
    if (!isRelevant(combined)) continue;

    items.push({
      titulo: truncate(title, 200),
      descripcion: truncate(desc || title, 400),
      url_fuente: link,
      fuente: sourceName,
      categoria: detectCategory(combined),
      fecha_publicacion: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
    });
  }

  return items;
}

// ── Handler ───────────────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const isVercelCron = request.headers.get("x-vercel-cron") === "1";
  if (!isVercelCron && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createServerClient();

    // 1. Delete expired noticias
    await supabase
      .from("noticias")
      .delete()
      .lt("fecha_expiracion", new Date().toISOString());

    // 2. Fetch existing URLs to avoid duplicates
    const { data: existing } = await supabase
      .from("noticias")
      .select("url_fuente");
    const existingUrls = new Set((existing ?? []).map((r: { url_fuente: string }) => r.url_fuente));

    // 3. Fetch all RSS feeds in parallel
    const results = await Promise.allSettled(
      RSS_FEEDS.map((f) => fetchFeed(f.url, f.source))
    );

    const allItems: RssItem[] = [];
    for (const r of results) {
      if (r.status === "fulfilled") allItems.push(...r.value);
    }

    // 4. Deduplicate by URL, skip already-stored
    const seen = new Set<string>();
    const toInsert = allItems
      .filter((item) => {
        if (!item.url_fuente || existingUrls.has(item.url_fuente)) return false;
        if (seen.has(item.url_fuente)) return false;
        seen.add(item.url_fuente);
        return true;
      })
      .map((item) => ({
        ...item,
        fecha_expiracion: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ).toISOString(),
      }));

    if (toInsert.length === 0) {
      return NextResponse.json({ ok: true, inserted: 0, message: "No new items" });
    }

    const { error } = await supabase.from("noticias").insert(toInsert);
    if (error) throw error;

    return NextResponse.json({ ok: true, inserted: toInsert.length });
  } catch (err) {
    console.error("Cron noticias error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
