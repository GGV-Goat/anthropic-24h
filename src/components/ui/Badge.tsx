interface BadgeProps {
  type: string | null | undefined;
}

const BADGE_MAP: Record<string, [string, string]> = {
  active: ["b-act", "● Activo"],
  beta: ["b-bet", "◐ Beta"],
  new: ["b-new", "✦ Nuevo"],
  hot: ["b-hot", "↑ Popular"],
  updated: ["b-upd", "↻ Actualizado"],
  vigente: ["b-vig", "● Vigente"],
  deprecated: ["b-dep", "✕ Descontinuado"],
  replaced: ["b-rep", "⇄ Reemplazada"],
};

export function Badge({ type }: BadgeProps) {
  if (!type || !BADGE_MAP[type]) return null;
  const [cls, lbl] = BADGE_MAP[type];
  return <span className={`badge ${cls}`}>{lbl}</span>;
}
