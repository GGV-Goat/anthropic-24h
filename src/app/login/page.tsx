"use client";
import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      const from = searchParams.get("from") || "/";
      router.push(from);
    } else {
      setError("Contraseña incorrecta");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#04040a" }}>
      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          backdropFilter: "blur(20px)",
          padding: "48px 40px",
          width: "100%",
          maxWidth: 400,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              width: 48,
              height: 48,
              background: "linear-gradient(135deg,#7c3aed,#3b82f6)",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              fontSize: 22,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            A
          </div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.02em",
              marginBottom: 6,
              fontFamily: "Space Grotesk, sans-serif",
            }}
          >
            Anthropic<span style={{ color: "#7c3aed" }}>24H</span>
          </h1>
          <p style={{ fontSize: 13, color: "#94a3b8", fontFamily: "Space Grotesk, sans-serif" }}>
            Introduce la contraseña para acceder
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            autoFocus
            required
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.05)",
              border: `1px solid ${error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`,
              borderRadius: 8,
              padding: "12px 16px",
              color: "#fff",
              fontSize: 14,
              fontFamily: "Space Grotesk, sans-serif",
              outline: "none",
              marginBottom: error ? 8 : 16,
              boxSizing: "border-box",
            }}
          />
          {error && (
            <p style={{ fontSize: 12, color: "#f87171", marginBottom: 16, fontFamily: "Space Grotesk, sans-serif" }}>
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: loading ? "rgba(124,58,237,0.5)" : "#7c3aed",
              border: "none",
              borderRadius: 8,
              padding: "12px 24px",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "Space Grotesk, sans-serif",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "opacity 0.2s",
            }}
          >
            {loading ? "Verificando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
