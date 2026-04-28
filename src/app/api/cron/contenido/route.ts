export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const isVercelCron = request.headers.get("x-vercel-cron") === "1";
  if (!isVercelCron && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServerClient();
  const now = new Date();
  const twoWeeksAgo = new Date(now.getTime() - TWO_WEEKS_MS).toISOString();

  const results = { skills: 0, mcps: 0, clis: 0 };

  try {
    // Deactivate deprecated skills with successor, 2+ weeks deprecated, not widely used
    const { data: skills } = await supabase
      .from("skills")
      .select("id, fecha_creacion")
      .eq("estado", "en_desuso")
      .eq("activo", true);

    if (skills) {
      for (const s of skills) {
        if (new Date(s.fecha_creacion) < new Date(twoWeeksAgo)) {
          await supabase.from("skills").update({ activo: false }).eq("id", s.id);
          results.skills++;
        }
      }
    }

    // Deactivate deprecated MCPs (2+ weeks, not widely_used, has successor)
    const { data: mcps } = await supabase
      .from("mcp_servers")
      .select("id, fecha_inicio_desuso, ampliamente_usado, reemplazado_por")
      .eq("estado", "en_desuso")
      .eq("activo", true);

    if (mcps) {
      for (const m of mcps) {
        const desusoDate = m.fecha_inicio_desuso ? new Date(m.fecha_inicio_desuso) : null;
        if (
          desusoDate &&
          desusoDate < new Date(twoWeeksAgo) &&
          !m.ampliamente_usado &&
          m.reemplazado_por
        ) {
          await supabase.from("mcp_servers").update({ activo: false }).eq("id", m.id);
          results.mcps++;
        }
      }
    }

    // Deactivate deprecated CLIs (2+ weeks)
    const { data: clis } = await supabase
      .from("clis")
      .select("id, fecha_actualizacion")
      .eq("estado", "en_desuso")
      .eq("activo", true);

    if (clis) {
      for (const c of clis) {
        if (new Date(c.fecha_actualizacion) < new Date(twoWeeksAgo)) {
          await supabase.from("clis").update({ activo: false }).eq("id", c.id);
          results.clis++;
        }
      }
    }

    return NextResponse.json({ ok: true, deactivated: results });
  } catch (err) {
    console.error("Cron contenido error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
