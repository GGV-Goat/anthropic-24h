-- ============================================================
-- Anthropic 24H — Supabase Schema
-- Ejecuta este SQL en el SQL Editor de tu proyecto Supabase
-- ============================================================

-- 1. SKILLS
CREATE TABLE IF NOT EXISTS skills (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre          TEXT NOT NULL,
  descripcion     TEXT NOT NULL,
  categoria       TEXT NOT NULL,  -- 'web' | 'auto' | 'data' | 'prod'
  popularidad     TEXT,           -- 'hot' | null
  estado          TEXT NOT NULL DEFAULT 'vigente',  -- 'vigente' | 'en_desuso' | 'descontinuado'
  fecha_creacion  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  activo          BOOLEAN NOT NULL DEFAULT TRUE
);

-- 2. MCP SERVERS
CREATE TABLE IF NOT EXISTS mcp_servers (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre               TEXT NOT NULL,
  descripcion          TEXT NOT NULL,
  categoria            TEXT NOT NULL,  -- 'web' | 'auto' | 'data' | 'prod'
  estado               TEXT NOT NULL DEFAULT 'vigente',
  reemplazado_por      TEXT,
  fecha_inicio_desuso  TIMESTAMPTZ,
  ampliamente_usado    BOOLEAN NOT NULL DEFAULT FALSE,
  activo               BOOLEAN NOT NULL DEFAULT TRUE,
  fecha_actualizacion  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. CLIs
CREATE TABLE IF NOT EXISTS clis (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre              TEXT NOT NULL,
  descripcion         TEXT NOT NULL,
  categoria           TEXT NOT NULL,  -- 'web' | 'auto' | 'data' | 'prod'
  estado              TEXT NOT NULL DEFAULT 'vigente',
  activo              BOOLEAN NOT NULL DEFAULT TRUE,
  fecha_actualizacion TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. NOTICIAS
CREATE TABLE IF NOT EXISTS noticias (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo            TEXT NOT NULL,
  descripcion       TEXT NOT NULL,
  url_fuente        TEXT NOT NULL DEFAULT '',
  fuente            TEXT NOT NULL,
  categoria         TEXT NOT NULL,  -- 'claude' | 'code' | 'design' | 'anthropic' | 'cowork'
  fecha_publicacion TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  fecha_expiracion  TIMESTAMPTZ NOT NULL
);

-- ── INDEXES ──────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_noticias_expiracion  ON noticias (fecha_expiracion);
CREATE INDEX IF NOT EXISTS idx_noticias_publicacion ON noticias (fecha_publicacion DESC);
CREATE INDEX IF NOT EXISTS idx_skills_activo        ON skills (activo);
CREATE INDEX IF NOT EXISTS idx_mcp_activo           ON mcp_servers (activo);
CREATE INDEX IF NOT EXISTS idx_clis_activo          ON clis (activo);

-- ── ROW LEVEL SECURITY (RLS) ────────────────────────────────
-- Habilitar RLS (lectura pública, escritura solo desde service role)
ALTER TABLE skills      ENABLE ROW LEVEL SECURITY;
ALTER TABLE mcp_servers ENABLE ROW LEVEL SECURITY;
ALTER TABLE clis        ENABLE ROW LEVEL SECURITY;
ALTER TABLE noticias    ENABLE ROW LEVEL SECURITY;

-- Política: lectura pública
CREATE POLICY "Public read skills"      ON skills      FOR SELECT USING (true);
CREATE POLICY "Public read mcp_servers" ON mcp_servers FOR SELECT USING (true);
CREATE POLICY "Public read clis"        ON clis        FOR SELECT USING (true);
CREATE POLICY "Public read noticias"    ON noticias    FOR SELECT USING (true);

-- Política: escritura solo con anon key (los crons usan anon key)
CREATE POLICY "Anon insert noticias" ON noticias FOR INSERT WITH CHECK (true);
CREATE POLICY "Anon delete noticias" ON noticias FOR DELETE USING (true);
CREATE POLICY "Anon update skills"   ON skills   FOR UPDATE USING (true);
CREATE POLICY "Anon update mcp"      ON mcp_servers FOR UPDATE USING (true);
CREATE POLICY "Anon update clis"     ON clis     FOR UPDATE USING (true);
