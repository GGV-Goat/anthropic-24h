"use client";
import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { LogoCode } from "@/components/logos/ToolLogos";
import { SKILLS, MCP_SERVERS, CLIS, COMMUNITY, CATS } from "@/lib/data";
import type { ModalItem } from "@/lib/data";

const CAT_COLORS: Record<string, Record<string, string>> = {
  skills:  { web: "#06b6d4", auto: "#8b5cf6", data: "#3b82f6", prod: "#10b981" },
  mcp:     { web: "#0ea5e9", auto: "#6366f1", data: "#2dd4bf", prod: "#a78bfa" },
  clis:    { web: "#f97316", auto: "#ec4899", data: "#eab308", prod: "#84cc16" },
};

const TABS = [
  { id: "skills", label: "Skills" },
  { id: "mcp", label: "MCP Servers" },
  { id: "clis", label: "CLIs" },
  { id: "community", label: "Comunidad" },
];

const TAB_DESC: Record<string, { title: string; desc: string }> = {
  skills: {
    title: "Skills",
    desc: "Instrucciones especializadas en archivos .md que enseñan a Claude Code a trabajar mejor en tareas concretas. Curadas por categoría y popularidad.",
  },
  mcp: {
    title: "MCP Servers",
    desc: "Servidores que expanden las capacidades nativas de Claude Code: conectarse a apps externas, controlar browsers, leer bases de datos y más. Cada uno con badge de estado y categoría.",
  },
  clis: {
    title: "CLIs",
    desc: "Herramientas de terminal que potencian el workflow junto a Claude Code: gestión de modelos locales, control de repositorios, automatización de entornos y más.",
  },
  community: {
    title: "Comunidad y recursos",
    desc: "Los mejores recursos creados por la comunidad: repositorios con prompts y configuraciones probadas, servidores MCP oficiales, foros activos y guías de arquitectura. Todo lo que necesitas para sacar el máximo partido a Claude Code.",
  },
};

interface CodePageProps {
  openModal: (item: ModalItem) => void;
}

export function CodePage({ openModal }: CodePageProps) {
  const [tab, setTab] = useState("skills");
  const [cat, setCat] = useState("web");

  const dataMap: Record<string, Record<string, ModalItem[]>> = {
    skills: SKILLS,
    mcp: MCP_SERVERS,
    clis: CLIS,
  };

  const items = dataMap[tab]?.[cat] ?? [];
  const td = TAB_DESC[tab];

  return (
    <div className="inner">
      <div className="sh fade-up d1">
        <div className="sl">02 — Claude Code</div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 8 }}>
          <LogoCode s={44} />
          <div>
            <h2 className="st" style={{ marginBottom: 6 }}>El agente de <span>terminal</span></h2>
            <p className="sd">Se instala en tu ordenador y programa de forma autónoma. Skills, herramientas del ecosistema y recursos de la comunidad.</p>
          </div>
        </div>
      </div>

      <div className="itabs">
        {TABS.map((t) => (
          <button key={t.id} className={`itab ${tab === t.id ? "on" : ""}`} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="tab-desc">
        <strong>{td.title}</strong>
        <span>{td.desc}</span>
      </div>

      {(tab === "skills" || tab === "mcp" || tab === "clis") && (
        <div className="fbar">
          {CATS.map((c) => (
            <button key={c.id} className={`fb ${cat === c.id ? "on" : ""}`} onClick={() => setCat(c.id)}>
              {c.label}
            </button>
          ))}
        </div>
      )}

      {(tab === "skills" || tab === "mcp" || tab === "clis") && (
        <div className="sgrid">
          {items.map((s) => (
            <GlassCard key={s.name} className="scard" color={(CAT_COLORS[tab] ?? {})[cat]}>
              <div className="scat">{s.cat}</div>
              <div className="srow">
                <div className="sname">{s.name}</div>
                <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                  {s.pop && <Badge type={s.pop} />}
                  {s.status && <Badge type={s.status} />}
                </div>
              </div>
              <div className="sdesc">{s.desc}</div>
              <div className="sfoot">
                <div />
                <button className="expand-btn" onClick={() => openModal(s)}>Ver más</button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {tab === "community" && (
        <div className="cgrid">
          {COMMUNITY.map((c) => (
            <GlassCard key={c.name} className="ccard" color={c.color}>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
                <span
                  style={{
                    background: `${c.color}18`,
                    color: c.color,
                    border: `1px solid ${c.color}30`,
                    borderRadius: 6,
                    padding: "2px 8px",
                    fontSize: 10,
                    fontFamily: "var(--mono)",
                    fontWeight: 500,
                  }}
                >
                  {c.type}
                </span>
              </div>
              <div className="ctitle">{c.name}</div>
              <div className="cdesc">{c.desc}</div>
              <div className="cfoot">
                <div className="cmeta">
                  <span>{c.contrib}</span>
                  <span>·</span>
                  <span>{c.lang}</span>
                </div>
                <button className="expand-btn" onClick={() => openModal(c)}>Ver más</button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
