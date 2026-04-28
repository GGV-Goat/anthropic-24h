import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#06060f",
        bg2: "#0a0a18",
        v: "#7c3aed",
        bl: "#3b82f6",
        t1: "#ffffff",
        t2: "#94a3b8",
        t3: "rgba(255,255,255,0.28)",
      },
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backdropBlur: {
        card: "20px",
      },
      animation: {
        "fade-up": "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both",
        "iris-scale": "irisScale 12s ease-in-out infinite",
        "iris-hue": "irisHue 20s linear infinite",
        "core-pulse": "corePulse 2s ease-in-out infinite",
        "fog-rotate": "fogRotate 8s linear infinite",
        "twinkle1": "twinkle1 3s ease-in-out infinite",
        "twinkle2": "twinkle2 5s ease-in-out infinite",
        "twinkle3": "twinkle3 7s ease-in-out infinite",
        "pulse-dot": "pulseDot 2s infinite",
        "slide-up": "slideUp 0.22s cubic-bezier(0.22,1,0.36,1)",
        "fade-in": "fadeIn 0.18s ease",
        "rip": "ripA 0.6s ease-out forwards",
        "sparkle-out": "sparkleOut 0.4s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        irisScale: {
          "0%,100%": { transform: "scale(0.95)" },
          "50%": { transform: "scale(1.05)" },
        },
        irisHue: {
          "0%": { filter: "blur(60px) hue-rotate(0deg)" },
          "100%": { filter: "blur(60px) hue-rotate(360deg)" },
        },
        corePulse: {
          "0%,100%": { transform: "translate(-50%,-50%) scale(1)" },
          "50%": { transform: "translate(-50%,-50%) scale(1.15)" },
        },
        fogRotate: {
          from: { filter: "hue-rotate(0deg) blur(40px)" },
          to: { filter: "hue-rotate(360deg) blur(40px)" },
        },
        twinkle1: {
          "0%,100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.3)" },
        },
        twinkle2: {
          "0%,100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.4)" },
        },
        twinkle3: {
          "0%,100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.2)" },
        },
        pulseDot: {
          "0%,100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.8)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        ripA: {
          to: { transform: "scale(4)", opacity: "0" },
        },
        sparkleOut: {
          "0%": { transform: "translate(-50%,-50%) scale(1)", opacity: "1" },
          "100%": { transform: "translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) scale(0)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
