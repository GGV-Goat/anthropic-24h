export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import Anthropic from "@anthropic-ai/sdk";

export async function GET(request: NextRequest) {
  // Verify cron auth
  const authHeader = request.headers.get("authorization");
  const isVercelCron = request.headers.get("x-vercel-cron") === "1";
  if (!isVercelCron && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createServerClient();
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    // 1. Delete expired news
    await supabase
      .from("noticias")
      .delete()
      .lt("fecha_expiracion", new Date().toISOString());

    // 2. Generate news with Claude
    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: `Genera exactamente 6 noticias ficticias pero realistas sobre el ecosistema Anthropic del día de hoy (${new Date().toISOString().split("T")[0]}).

Las noticias deben cubrir: Anthropic empresa, Claude (el modelo), Claude Code, Claude Design.

Devuelve un JSON array con exactamente este formato, sin texto adicional:
[
  {
    "titulo": "string (max 100 chars)",
    "descripcion": "string (2-3 frases, max 200 chars)",
    "fuente": "string (nombre de medio: Anthropic Blog, GitHub Releases, etc.)",
    "categoria": "claude|code|design|anthropic",
    "url_fuente": "https://example.com"
  }
]`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== "text") throw new Error("Unexpected response type");

    // Parse JSON from Claude's response
    const jsonMatch = content.text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error("No JSON found in response");

    const newsItems = JSON.parse(jsonMatch[0]) as Array<{
      titulo: string;
      descripcion: string;
      fuente: string;
      categoria: string;
      url_fuente: string;
    }>;

    const now = new Date();
    const expiration = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // +7 days

    // 3. Insert new news
    const toInsert = newsItems.map((item) => ({
      titulo: item.titulo,
      descripcion: item.descripcion,
      url_fuente: item.url_fuente,
      fuente: item.fuente,
      categoria: item.categoria,
      fecha_publicacion: now.toISOString(),
      fecha_expiracion: expiration.toISOString(),
    }));

    const { error } = await supabase.from("noticias").insert(toInsert);
    if (error) throw error;

    return NextResponse.json({ ok: true, inserted: toInsert.length });
  } catch (err) {
    console.error("Cron noticias error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
