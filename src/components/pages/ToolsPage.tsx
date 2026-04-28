"use client";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { ToolLogo } from "@/components/logos/ToolLogos";
import { TOOLS } from "@/lib/data";
import type { ModalItem } from "@/lib/data";

interface ToolsPageProps {
  openModal: (item: ModalItem) => void;
}

export function ToolsPage({ openModal }: ToolsPageProps) {
  return (
    <div className="inner">
      <div className="sh fade-up d1">
        <div className="sl">01 — Suite Anthropic</div>
        <h2 className="st">Herramientas <span>oficiales</span></h2>
        <p className="sd">Las cuatro herramientas del ecosistema Anthropic. Estado y acceso en tiempo real.</p>
      </div>
      <div className="tgrid">
        {TOOLS.map((t, i) => (
          <GlassCard key={t.id} className={`tcard fade-up d${i + 2}`}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
              <ToolLogo id={t.logoId} size={44} />
              <Badge type={t.status} />
            </div>
            <div className="tname">{t.name}</div>
            <div className="tdesc">{t.desc}</div>
            <div className="tfoot">
              <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--t3)" }}>{t.url}</span>
              <button className="tmore" onClick={() => openModal({ ...t, logoId: t.logoId })}>Ver más →</button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
