"use client";

interface HeroPageProps {
  setPage: (page: string) => void;
}

export function HeroPage({ setPage }: HeroPageProps) {
  return (
    <div className="hero-wrap">
      <div className="grid-bg" />
      <div
        style={{
          position: "absolute",
          top: "18%",
          right: "6%",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(59,130,246,0.05) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div className="inner" style={{ position: "relative", zIndex: 1 }}>
        <div className="eyebrow fade-up d1">Ecosistema Anthropic — 2026</div>
        <h1 className="htitle fade-up d2">
          Todo sobre el ecosistema <span>Anthropic.</span>
        </h1>
        <p className="hsub fade-up d3">
          El dashboard de referencia para desarrolladores, automatizadores y power users del ecosistema Claude.
        </p>
        <div className="hbtns fade-up d4">
          <button className="bp" onClick={() => setPage("tools")}>Ver herramientas</button>
          <button className="bs" onClick={() => setPage("code")}>Claude Code →</button>
          <button className="bs" onClick={() => setPage("news")}>Noticias →</button>
        </div>
        <div className="hstats fade-up d5">
          {[
            { v: "4", l: "herramientas activas" },
            { v: "24h", l: "actualización continua" },
            { v: "500+", l: "servidores MCP" },
            { v: "72.5%", l: "SWE-bench SOTA" },
          ].map((s) => (
            <div key={s.l}>
              <div className="hsv">{s.v}</div>
              <div className="hsl">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
