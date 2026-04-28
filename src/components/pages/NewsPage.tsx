"use client";
import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { NewsImg } from "@/components/logos/NewsImages";
import { STATIC_NEWS, NEWS_CATS, CAT_LABELS, CAT_CLASSES } from "@/lib/data";
import type { Noticia } from "@/lib/database.types";

interface NewsItem {
  title: string;
  source: string;
  time: string;
  cat: string;
  excerpt: string;
  url?: string;
}

export function NewsPage() {
  const [filter, setFilter] = useState("all");
  const [news, setNews] = useState<NewsItem[]>(STATIC_NEWS);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/noticias");
        if (res.ok) {
          const data: Noticia[] = await res.json();
          if (data.length > 0) {
            const mapped: NewsItem[] = data.map((n) => ({
              title: n.titulo,
              source: n.fuente,
              time: new Date(n.fecha_publicacion).toLocaleDateString("es-ES", { day: "numeric", month: "short" }),
              cat: n.categoria,
              excerpt: n.descripcion,
              url: n.url_fuente,
            }));
            setNews(mapped);
          }
        }
      } catch {
        // Fallback to static data
      }
    }
    fetchNews();
  }, []);

  const shown = filter === "all" ? news : news.filter((n) => n.cat === filter);

  return (
    <div className="inner">
      <div className="sh fade-up d1">
        <div className="sl">03 — Noticias 24H</div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <h2 className="st">Feed en <span>tiempo real</span></h2>
            <p className="sd">Lo más relevante del ecosistema Anthropic, curado cada hora.</p>
          </div>
          <div className="nlive" style={{ marginBottom: 8 }}>
            <span className="ndot" />actualización automática
          </div>
        </div>
      </div>

      <div className="fbar">
        {NEWS_CATS.map((c) => (
          <button key={c.id} className={`fb ${filter === c.id ? "on" : ""}`} onClick={() => setFilter(c.id)}>
            {c.label}
          </button>
        ))}
      </div>

      <div className="ngrid">
        {shown.map((n, i) => (
          <GlassCard
            key={n.title}
            className={`ncard fade-up d${(i % 8) + 1}`}
            onClick={n.url ? () => window.open(n.url, "_blank") : undefined}
          >
            <div className="nimg">
              <NewsImg cat={n.cat} idx={i} />
            </div>
            <div className="nbody">
              <div className={`ncat ${CAT_CLASSES[n.cat] ?? ""}`}>{CAT_LABELS[n.cat] ?? n.cat}</div>
              <div className="ntitle">{n.title}</div>
              <div className="nexc">{n.excerpt}</div>
              <div className="nsrc">
                <span className="nsrc-left">{n.source}</span>
                <span className="ntime">{n.time}</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
