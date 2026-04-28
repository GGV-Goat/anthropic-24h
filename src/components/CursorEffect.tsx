"use client";
import { useEffect, useRef } from "react";

export function CursorEffect() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const lagRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize to center once window is available
    mouseRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    lagRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const cf = document.getElementById("cf");
    const cc = document.getElementById("cc");
    const cd = document.getElementById("cd");
    const iris = document.getElementById("iris");
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    function spawnSparkles(x: number, y: number) {
      [0, 120, 240].forEach((angle) => {
        const el = document.createElement("div");
        el.className = "sparkle";
        const rad = (angle * Math.PI) / 180;
        const dist = 20 + Math.random() * 14;
        el.style.cssText = `left:${x}px;top:${y}px;--dx:${Math.cos(rad) * dist}px;--dy:${Math.sin(rad) * dist}px;`;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 450);
      });
    }

    function onMove(e: MouseEvent) {
      const { clientX: x, clientY: y } = e;
      mouseRef.current = { x, y };
      if (cc) { cc.style.left = x + "px"; cc.style.top = y + "px"; }
      if (cd) { cd.style.left = x + "px"; cd.style.top = y + "px"; }
      if (idleTimer) clearTimeout(idleTimer);
      if (cc) cc.classList.remove("idle");
      idleTimer = setTimeout(() => { if (cc) cc.classList.add("idle"); }, 3000);

      if (iris) {
        const nx = x / window.innerWidth;
        const ny = y / window.innerHeight;
        const tx = (nx - 0.5) * 6;
        const ty = (ny - 0.3) * 4;
        const speed = Math.sqrt((x - lastX) ** 2 + (y - lastY) ** 2);
        if (speed > 30) {
          iris.style.opacity = "0.85";
          setTimeout(() => { if (iris) iris.style.removeProperty("opacity"); }, 300);
        }
        iris.style.transform = `translate(${tx}%, ${ty}%)`;
      }
      lastX = x; lastY = y;
    }

    function onOver(e: MouseEvent) {
      const target = e.target as Element;
      if (target.closest("button,a,.gc")) {
        spawnSparkles(mouseRef.current.x, mouseRef.current.y);
      }
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);

    function loop() {
      lagRef.current.x += (mouseRef.current.x - lagRef.current.x) * 0.06;
      lagRef.current.y += (mouseRef.current.y - lagRef.current.y) * 0.06;
      if (cf) {
        cf.style.left = lagRef.current.x + "px";
        cf.style.top = lagRef.current.y + "px";
      }
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, []);

  return null;
}
