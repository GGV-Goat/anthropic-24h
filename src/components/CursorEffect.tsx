"use client";
import { useEffect, useRef } from "react";

export function triggerSmokeTransition(): void {
  if (typeof window !== "undefined") window.dispatchEvent(new Event("smoke-wave"));
}

export function CursorEffect() {
  const mpRef        = useRef({ x: 0, y: 0 });
  const lagRef       = useRef({ x: 0, y: 0 });
  const rafRef       = useRef<number | null>(null);
  const smokeRafRef  = useRef<number | null>(null);
  const meshRafRef   = useRef<number | null>(null);
  const sweepRef     = useRef(0);

  useEffect(() => {
    const W0 = window.innerWidth, H0 = window.innerHeight;
    mpRef.current  = { x: W0 / 2, y: H0 / 2 };
    lagRef.current = { x: W0 / 2, y: H0 / 2 };

    const cf   = document.getElementById("cf");
    const cc   = document.getElementById("cc");
    const cdEl = document.getElementById("cd");
    const cm   = document.getElementById("cm");

    // ── pixel-shader smoke (192×108, upscaled via CSS) ────────────────────
    const SC = 192, SH = 108;
    const smoke = document.getElementById("smoke") as HTMLCanvasElement | null;
    let smokeCtx: CanvasRenderingContext2D | null = null;
    let imgData: ImageData | null = null;
    let buf: Uint32Array | null = null;

    if (smoke) {
      smoke.width = SC; smoke.height = SH;
      smokeCtx = smoke.getContext("2d");
      if (smokeCtx) {
        imgData = smokeCtx.createImageData(SC, SH);
        buf = new Uint32Array(imgData.data.buffer);
      }
    }

    // Color ramp: near-black → deep purple → vivid purple → fuchsia → light pink
    const CS: [number, [number,number,number]][] = [
      [0,    [3,   0,   8  ]],
      [0.28, [28,  0,   44 ]],
      [0.50, [74,  0,   114]],
      [0.70, [139, 0,   199]],
      [0.85, [192, 38,  211]],
      [1,    [240, 171, 252]],
    ];
    function sColor(v: number): [number,number,number] {
      for (let i = 0; i < CS.length - 1; i++) {
        if (v <= CS[i + 1][0]) {
          const t = (v - CS[i][0]) / (CS[i + 1][0] - CS[i][0]);
          const a = CS[i][1], b = CS[i + 1][1];
          return [a[0] + t*(b[0]-a[0]), a[1] + t*(b[1]-a[1]), a[2] + t*(b[2]-a[2])];
        }
      }
      return CS[CS.length - 1][1];
    }

    function smokeNoise(x: number, y: number, t: number): number {
      const wx = x + 2.8 * Math.sin(y * 0.043 + t * 0.48);
      const wy = y + 2.8 * Math.cos(x * 0.038 - t * 0.38);
      let v = Math.sin(wx * 0.037 + wy * 0.027 + t * 0.55);
      v += 0.5 * Math.sin(wx * 0.076 - wy * 0.062 - t * 0.72 + Math.cos(wy * 0.05 + t * 0.28));
      return (v / 1.5 + 1) / 2;
    }

    function drawSmoke(now: number) {
      smokeRafRef.current = requestAnimationFrame(drawSmoke);
      if (!smokeCtx || !imgData || !buf) return;
      const t  = now / 1000;
      const cx = (mpRef.current.x / window.innerWidth)  * SC;
      const cy = (mpRef.current.y / window.innerHeight) * SH;
      const sw = sweepRef.current > 0 ? (now - sweepRef.current) / 3000 : 0;

      for (let y = 0; y < SH; y++) {
        for (let x = 0; x < SC; x++) {
          let v = smokeNoise(x, y, t);

          // Cursor radial glow
          const dx = x - cx, dy = y - cy;
          const cg = Math.max(0, 1 - Math.sqrt(dx*dx + dy*dy) / (SC * 0.38)) * 0.6;

          // Sweep illumination on page change
          let sg = 0;
          const yn = y / SH;
          if      (sw > 0   && sw <= 1.0) { sg = sw > yn ? Math.min(1, (sw - yn) * 6) * 0.7 : 0; }
          else if (sw > 1.0 && sw <= 1.8) { sg = 0.7; }
          else if (sw > 1.8 && sw <= 3.0) { sg = Math.max(0, (3.0 - sw) / 1.2) * 0.7; }

          v = Math.min(1, v + cg + sg);
          const [r, g, b] = sColor(v);
          buf[y * SC + x] = (255 << 24) | (Math.round(b) << 16) | (Math.round(g) << 8) | Math.round(r);
        }
      }
      smokeCtx.putImageData(imgData, 0, 0);
    }
    smokeRafRef.current = requestAnimationFrame(drawSmoke);

    // ── animated node mesh ────────────────────────────────────────────────
    const mesh    = document.getElementById("mesh") as HTMLCanvasElement | null;
    let meshCtx: CanvasRenderingContext2D | null = null;
    let mW = 0, mH = 0;

    interface MeshNode { x:number; y:number; vx:number; vy:number; r:number; }
    let nodes: MeshNode[] = [];

    function resizeMesh() {
      if (!mesh) return;
      mW = mesh.width  = window.innerWidth;
      mH = mesh.height = window.innerHeight;
    }

    if (mesh) {
      meshCtx = mesh.getContext("2d");
      resizeMesh();
      const N = 55;
      nodes = Array.from({ length: N }, () => ({
        x: Math.random() * mW, y: Math.random() * mH,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.2 + 0.4,
      }));
    }
    window.addEventListener("resize", resizeMesh);

    function drawMesh() {
      meshRafRef.current = requestAnimationFrame(drawMesh);
      if (!meshCtx) return;
      meshCtx.clearRect(0, 0, mW, mH);
      const N = nodes.length;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d  = Math.hypot(dx, dy);
          if (d < 150) {
            meshCtx.beginPath();
            meshCtx.moveTo(nodes[i].x, nodes[i].y);
            meshCtx.lineTo(nodes[j].x, nodes[j].y);
            meshCtx.strokeStyle = `rgba(124,58,237,${0.1 * (1 - d / 150)})`;
            meshCtx.lineWidth = 0.6;
            meshCtx.stroke();
          }
        }
      }
      nodes.forEach((n) => {
        meshCtx!.beginPath();
        meshCtx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        meshCtx!.fillStyle = "rgba(124,58,237,0.38)";
        meshCtx!.fill();
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > mW) n.vx *= -1;
        if (n.y < 0 || n.y > mH) n.vy *= -1;
      });
    }
    meshRafRef.current = requestAnimationFrame(drawMesh);

    // ── aurora cursor layers ───────────────────────────────────────────────
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    function spawnSparkles(x: number, y: number) {
      [0, 120, 240].forEach((deg) => {
        const el = document.createElement("div");
        el.className = "sparkle";
        const rad = (deg * Math.PI) / 180, d = 18 + Math.random() * 14;
        el.style.cssText = `left:${x}px;top:${y}px;--dx:${Math.cos(rad)*d}px;--dy:${Math.sin(rad)*d}px;`;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 500);
      });
    }

    function onMove(e: MouseEvent) {
      const { clientX: x, clientY: y } = e;
      mpRef.current = { x, y };
      if (cc)   { cc.style.left   = x + "px"; cc.style.top   = y + "px"; }
      if (cdEl) { cdEl.style.left = x + "px"; cdEl.style.top = y + "px"; }
      if (cm)   { cm.style.left   = x + "px"; cm.style.top   = y + "px"; }
      if (idleTimer) clearTimeout(idleTimer);
      if (cc) cc.classList.remove("idle");
      idleTimer = setTimeout(() => { if (cc) cc.classList.add("idle"); }, 3000);
    }

    function onOver(e: MouseEvent) {
      const target = e.target as Element;
      if (target.closest("button,a,.gc")) spawnSparkles(mpRef.current.x, mpRef.current.y);
      if (cm && target.closest("button,.mclose")) cm.classList.add("h");
    }

    function onOut(e: MouseEvent) {
      if (cm && !(e.target as Element).closest("button,.mclose")) cm.classList.remove("h");
    }

    function onWave() { sweepRef.current = performance.now(); }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout",  onOut);
    window.addEventListener("smoke-wave",  onWave);

    // Lagged fog layer (#cf)
    function loop() {
      lagRef.current.x += (mpRef.current.x - lagRef.current.x) * 0.06;
      lagRef.current.y += (mpRef.current.y - lagRef.current.y) * 0.06;
      if (cf) { cf.style.left = lagRef.current.x + "px"; cf.style.top = lagRef.current.y + "px"; }
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout",  onOut);
      window.removeEventListener("resize",     resizeMesh);
      window.removeEventListener("smoke-wave", onWave);
      if (rafRef.current)      cancelAnimationFrame(rafRef.current);
      if (smokeRafRef.current) cancelAnimationFrame(smokeRafRef.current);
      if (meshRafRef.current)  cancelAnimationFrame(meshRafRef.current);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, []);

  return null;
}
