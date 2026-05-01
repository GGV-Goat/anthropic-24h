"use client";
import { useRef, useState, ReactNode, MouseEvent as RMouseEvent } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: RMouseEvent<HTMLDivElement>) => void;
  color?: string;
}

export function GlassCard({ children, className = "", style = {}, onClick, color }: GlassCardProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  function addRipple(e: RMouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 700);
    if (onClick) onClick(e);
  }

  const mergedStyle = color ? { "--cc": color, ...style } as React.CSSProperties : style;

  return (
    <div ref={ref} className={`gc ${className}`} style={mergedStyle} onClick={addRipple}>
      {ripples.map((r) => (
        <span
          key={r.id}
          className="ripple"
          style={{ left: r.x, top: r.y, width: 40, height: 40, marginLeft: -20, marginTop: -20 }}
        />
      ))}
      {children}
    </div>
  );
}
