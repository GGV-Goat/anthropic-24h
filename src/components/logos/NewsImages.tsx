interface NewsImgProps {
  cat: string;
  idx: number;
}

interface ShapeConfig {
  type: string;
  bg1: string;
  bg2: string;
  shapes: Array<{
    type: "circle" | "rect" | "path";
    cx?: number; cy?: number; r?: number;
    x?: number; y?: number; w?: number; h?: number; rx?: number;
    d?: string;
    fill?: string;
    stroke?: string;
    sw?: number;
  }>;
}

const CONFIGS: Record<string, ShapeConfig> = {
  claude: {
    type: "circle",
    bg1: "#3b1d6e", bg2: "#1a0a3d",
    shapes: [
      { type: "circle", cx: 120, cy: 40, r: 80, fill: "rgba(167,139,250,0.15)" },
      { type: "circle", cx: 20, cy: 100, r: 50, fill: "rgba(124,58,237,0.2)" },
      { type: "path", d: "M0 80 Q80 20 200 90 L200 140 L0 140Z", fill: "rgba(167,139,250,0.08)" },
    ],
  },
  code: {
    type: "rect",
    bg1: "#0c1a3d", bg2: "#061028",
    shapes: [
      { type: "rect", x: 140, y: -20, w: 80, h: 80, fill: "rgba(59,130,246,0.15)", rx: 8 },
      { type: "rect", x: -20, y: 60, w: 60, h: 60, fill: "rgba(96,165,250,0.1)", rx: 8 },
      { type: "path", d: "M60 30 L80 50 L60 70", stroke: "rgba(96,165,250,0.4)", sw: 2 },
      { type: "path", d: "M30 30 L10 50 L30 70", stroke: "rgba(96,165,250,0.3)", sw: 2 },
    ],
  },
  design: {
    type: "circle",
    bg1: "#2d0a2e", bg2: "#1a0820",
    shapes: [
      { type: "circle", cx: 160, cy: 30, r: 60, fill: "rgba(244,114,182,0.12)" },
      { type: "circle", cx: 40, cy: 110, r: 40, fill: "rgba(236,72,153,0.1)" },
      { type: "circle", cx: 100, cy: 70, r: 25, fill: "rgba(167,139,250,0.15)", stroke: "rgba(167,139,250,0.3)", sw: 1 },
    ],
  },
  anthropic: {
    type: "path",
    bg1: "#1a1500", bg2: "#0d0e00",
    shapes: [
      { type: "path", d: "M180 0 L200 30 L160 30Z", fill: "rgba(251,191,36,0.2)" },
      { type: "path", d: "M0 100 L30 140 L60 100Z", fill: "rgba(251,191,36,0.1)" },
      { type: "circle", cx: 100, cy: 70, r: 35, fill: "none", stroke: "rgba(251,191,36,0.15)", sw: 1.5 },
      { type: "circle", cx: 100, cy: 70, r: 55, fill: "none", stroke: "rgba(251,191,36,0.07)", sw: 1 },
    ],
  },
  cowork: {
    type: "circle",
    bg1: "#1a0e00", bg2: "#0d0700",
    shapes: [
      { type: "circle", cx: 100, cy: 50, r: 60, fill: "rgba(245,158,11,0.12)" },
      { type: "circle", cx: 40, cy: 100, r: 35, fill: "rgba(251,191,36,0.08)" },
    ],
  },
};

export function NewsImg({ cat, idx }: NewsImgProps) {
  const c = CONFIGS[cat] ?? CONFIGS.claude;
  const gradId = `nb-${cat}-${idx}`;

  return (
    <svg width="100%" height="140" viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="200" y2="140" gradientUnits="userSpaceOnUse">
          <stop stopColor={c.bg1} />
          <stop offset="1" stopColor={c.bg2} />
        </linearGradient>
      </defs>
      <rect width="200" height="140" fill={`url(#${gradId})`} />
      {c.shapes.map((sh, i) => {
        if (sh.type === "circle")
          return <circle key={i} cx={sh.cx} cy={sh.cy} r={sh.r} fill={sh.fill ?? "none"} stroke={sh.stroke ?? "none"} strokeWidth={sh.sw ?? 0} />;
        if (sh.type === "rect")
          return <rect key={i} x={sh.x} y={sh.y} width={sh.w} height={sh.h} rx={sh.rx ?? 0} fill={sh.fill ?? "none"} />;
        if (sh.type === "path")
          return <path key={i} d={sh.d} fill={sh.fill ?? "none"} stroke={sh.stroke ?? "none"} strokeWidth={sh.sw ?? 0} strokeLinecap="round" />;
        return null;
      })}
    </svg>
  );
}
