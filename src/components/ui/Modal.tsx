"use client";
import { useEffect } from "react";
import { Badge } from "./Badge";
import { ToolLogo } from "../logos/ToolLogos";
import type { ModalItem } from "@/lib/data";

interface ModalProps {
  item: ModalItem;
  onClose: () => void;
}

export function Modal({ item, onClose }: ModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="mover"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="mbox">
        <button className="mclose" onClick={onClose}>✕</button>
        {item.logoId && (
          <div style={{ marginBottom: 16 }}>
            <ToolLogo id={item.logoId} size={48} />
          </div>
        )}
        <div className="mtag-top">{item.type || item.cat || ""}</div>
        <div className="mtitle">{item.name || item.title}</div>
        <div style={{ fontSize: 13, color: "var(--t2)", lineHeight: 1.65 }}>{item.desc}</div>
        {(item.status || item.pop) && (
          <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
            {item.status && <Badge type={item.status} />}
            {item.pop && <Badge type={item.pop} />}
          </div>
        )}
        {item.detail && (
          <div className="msec">
            <div className="msec-t">Descripción detallada</div>
            <div className="msec-c">{item.detail}</div>
          </div>
        )}
        {item.uses && item.uses.length > 0 && (
          <div className="msec">
            <div className="msec-t">Casos de uso</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 4 }}>
              {item.uses.map((u) => (
                <div key={u} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--v)", flexShrink: 0, marginTop: 2, fontSize: 12 }}>▸</span>
                  <span style={{ fontSize: 13, color: "var(--t2)", lineHeight: 1.5 }}>{u}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {item.contrib && (
          <div className="msec">
            <div className="msec-t">Comunidad</div>
            <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
              <span style={{ fontSize: 13, color: "var(--t2)" }}>{item.contrib}</span>
              {item.lang && <span style={{ fontSize: 13, color: "var(--t3)" }}>Idioma: {item.lang}</span>}
            </div>
          </div>
        )}
        {item.url && (
          <div style={{ marginTop: 20, padding: "11px 15px", background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.18)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--t3)" }}>{item.url}</span>
            <span style={{ fontSize: 12, color: "var(--v)", fontWeight: 600 }}>Abrir →</span>
          </div>
        )}
      </div>
    </div>
  );
}
