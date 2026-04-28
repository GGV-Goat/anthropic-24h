import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anthropic 24H — El dashboard del ecosistema Claude",
  description: "El dashboard de referencia para desarrolladores, automatizadores y power users del ecosistema Anthropic: Claude, Claude Code, Claude Design y Claude Cowork.",
  keywords: ["Anthropic", "Claude", "Claude Code", "Claude Design", "MCP", "AI", "IA", "LLM"],
  authors: [{ name: "Anthropic 24H" }],
  openGraph: {
    title: "Anthropic 24H — El dashboard del ecosistema Claude",
    description: "Dashboard de referencia para el ecosistema Anthropic: noticias 24H, skills, MCP servers, CLIs y herramientas.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anthropic 24H",
    description: "Dashboard de referencia para el ecosistema Anthropic.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
