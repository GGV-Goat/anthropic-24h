"use client";
import { useState, useCallback } from "react";
import { CursorEffect } from "./CursorEffect";
import { Modal } from "./ui/Modal";
import { HeroPage } from "./pages/HeroPage";
import { ToolsPage } from "./pages/ToolsPage";
import { CodePage } from "./pages/CodePage";
import { NewsPage } from "./pages/NewsPage";
import type { ModalItem } from "@/lib/data";

const NAV_ITEMS = [
  { id: "hero", label: "Inicio" },
  { id: "tools", label: "Herramientas Anthropic" },
  { id: "code", label: "Claude Code" },
  { id: "news", label: "Noticias 24H" },
];

export function App() {
  const [page, setPage] = useState("hero");
  const [modal, setModal] = useState<ModalItem | null>(null);

  const openModal = useCallback((item: ModalItem) => setModal(item), []);
  const closeModal = useCallback(() => setModal(null), []);

  const pages: Record<string, React.ReactNode> = {
    hero: <HeroPage setPage={setPage} />,
    tools: <ToolsPage openModal={openModal} />,
    code: <CodePage openModal={openModal} />,
    news: <NewsPage />,
  };

  return (
    <>
      {/* Background iris */}
      <div id="iris-wrap">
        <div id="iris-scaler">
          <div id="iris" />
        </div>
        <div id="s1" className="star" />
        <div id="s2" className="star" />
        <div id="s3" className="star" />
      </div>

      {/* Cursor layers */}
      <div id="cf" />
      <div id="cc" />
      <div id="cd" />

      {/* Cursor JS effect */}
      <CursorEffect />

      {/* Navigation */}
      <nav>
        <a
          href="#"
          className="nl"
          onClick={(e) => { e.preventDefault(); setPage("hero"); }}
        >
          <div className="nlm">A</div>
          <span>Anthropic<span style={{ color: "var(--v)" }}>24H</span></span>
        </a>
        <div className="ntabs">
          {NAV_ITEMS.map((n) => (
            <button
              key={n.id}
              className={`nt ${page === n.id ? "on" : ""}`}
              onClick={() => setPage(n.id)}
            >
              {n.label}
            </button>
          ))}
        </div>
        <div className="nlive">
          <span className="ndot" />
          <span>Live</span>
        </div>
      </nav>

      {/* Pages */}
      <div id="main">
        {Object.entries(pages).map(([id, el]) => (
          <div key={id} className={`page ${page === id ? "visible" : "hidden"}`}>
            {el}
            <footer className="foot">
              <div className="fleft">
                Anthropic<span style={{ color: "var(--v)" }}>24H</span> — No oficial
              </div>
              <div className="fright">
                <span className="fdot" />
                Actualización automática activada
                <span style={{ marginLeft: 8, fontSize: 10, color: "var(--t3)" }}>· cada hora</span>
              </div>
            </footer>
          </div>
        ))}
      </div>

      {/* Modal rendered at root level — no fixed-inside-transform issue */}
      {modal && <Modal item={modal} onClose={closeModal} />}
    </>
  );
}
