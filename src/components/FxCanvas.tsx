"use client";

import { useEffect, useRef } from "react";
import type { HeroId } from "@/data/heroes";

type Pt = [number, number];
interface Fx {
  ink: string;
  kind: HeroId;
  x: number;
  y: number;
  t0: number;
  seed: number;
  ox: number;
  oy: number;
  bolt: Pt[];
  branches: Pt[][];
}

const DUR: Record<HeroId, number> = { spider: 1700, cap: 1500, strange: 1500, thor: 800 };

function subdivide(x1: number, y1: number, x2: number, y2: number, d: number, out: Pt[]) {
  if (d < 5) {
    out.push([x2, y2]);
    return;
  }
  const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * d;
  const my = (y1 + y2) / 2 + (Math.random() - 0.5) * d;
  subdivide(x1, y1, mx, my, d / 2, out);
  subdivide(mx, my, x2, y2, d / 2, out);
}
function makeBolt(x1: number, y1: number, x2: number, y2: number, d = 90): Pt[] {
  const out: Pt[] = [[x1, y1]];
  subdivide(x1, y1, x2, y2, d, out);
  return out;
}
function trace(ctx: CanvasRenderingContext2D, pts: Pt[]) {
  ctx.beginPath();
  pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.stroke();
}
function starPath(ctx: CanvasRenderingContext2D, cx: number, cy: number, R: number, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rad = i % 2 ? r : R;
    const x = cx + Math.cos(a) * rad;
    const y = cy + Math.sin(a) * rad;
    if (i) ctx.lineTo(x, y);
    else ctx.moveTo(x, y);
  }
  ctx.closePath();
}

function drawSpider(ctx: CanvasRenderingContext2D, f: Fx, t: number) {
  const fade = t > 0.7 ? 1 - (t - 0.7) / 0.3 : 1;
  ctx.save();
  ctx.globalAlpha = fade;
  ctx.strokeStyle = f.ink;
  ctx.shadowColor = "#2d5bff";
  ctx.shadowBlur = 12;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  const p = Math.min(1, t / 0.14);
  ctx.beginPath();
  ctx.moveTo(f.ox, f.oy);
  ctx.lineTo(f.ox + (f.x - f.ox) * p, f.oy + (f.y - f.oy) * p);
  ctx.stroke();
  if (t > 0.12) {
    const g = Math.min(1, (t - 0.12) / 0.2);
    const R = 85 * g;
    const n = 8;
    ctx.lineWidth = 1.5;
    for (let i = 0; i < n; i++) {
      const a = (i * Math.PI * 2) / n + f.seed;
      ctx.beginPath();
      ctx.moveTo(f.x, f.y);
      ctx.lineTo(f.x + Math.cos(a) * R, f.y + Math.sin(a) * R);
      ctx.stroke();
    }
    for (const k of [0.33, 0.62, 1]) {
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const a = (i * Math.PI * 2) / n + f.seed;
        const am = a - Math.PI / n;
        const x = f.x + Math.cos(a) * R * k;
        const y = f.y + Math.sin(a) * R * k;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.quadraticCurveTo(f.x + Math.cos(am) * R * k * 0.78, f.y + Math.sin(am) * R * k * 0.78, x, y);
      }
      ctx.stroke();
    }
  }
  ctx.restore();
}

function drawShield(ctx: CanvasRenderingContext2D, x: number, y: number, R: number, sx: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(sx, 1);
  const layers: [number, string][] = [
    [1, "#c1121f"],
    [0.8, "#f1f1f1"],
    [0.6, "#c1121f"],
    [0.4, "#1d3fa8"],
  ];
  for (const [k, c] of layers) {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(0, 0, R * k, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "#f1f1f1";
  starPath(ctx, 0, 0, R * 0.34, R * 0.14);
  ctx.fill();
  ctx.restore();
}

function drawCap(ctx: CanvasRenderingContext2D, f: Fx, t: number) {
  const ang = f.seed * Math.PI * 2;
  const fade = t > 0.9 ? (1 - t) / 0.1 : 1;
  for (let k = 3; k >= 0; k--) {
    const tt = t - k * 0.03;
    if (tt < 0) continue;
    const d = Math.sin(Math.PI * Math.min(1, tt));
    const px = f.x + Math.cos(ang) * 280 * d;
    const py = f.y + Math.sin(ang) * 180 * d;
    ctx.save();
    ctx.globalAlpha = (k === 0 ? 1 : 0.16) * fade;
    ctx.shadowColor = "#2b6bff";
    ctx.shadowBlur = k === 0 ? 18 : 0;
    drawShield(ctx, px, py, 30, Math.max(0.2, Math.abs(Math.cos(tt * Math.PI * 12))));
    ctx.restore();
  }
}

function drawStrange(ctx: CanvasRenderingContext2D, f: Fx, t: number) {
  const e = 1 - Math.pow(1 - Math.min(1, t * 1.4), 3);
  const R = 20 + 90 * e;
  ctx.save();
  ctx.translate(f.x, f.y);
  ctx.globalAlpha = 1 - t * t;
  ctx.strokeStyle = "#ff9a1f";
  ctx.shadowColor = "#ff9a1f";
  ctx.shadowBlur = 16;
  ctx.lineWidth = 3;
  ctx.setLineDash([10, 8]);
  ctx.lineDashOffset = -t * 420;
  ctx.beginPath();
  ctx.arc(0, 0, R, 0, Math.PI * 2);
  ctx.stroke();
  ctx.lineWidth = 2;
  ctx.setLineDash([4, 10]);
  ctx.lineDashOffset = t * 420;
  ctx.beginPath();
  ctx.arc(0, 0, R * 0.7, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "#ffd166";
  for (let i = 0; i < 44; i++) {
    const a = f.seed * 6 + i * 2.399 + t * 5;
    const r = R * (0.55 + 0.55 * ((i * 0.37) % 1));
    ctx.beginPath();
    ctx.arc(Math.cos(a) * r, Math.sin(a) * r, 1.6 + ((i * 0.13) % 1.6), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawThor(ctx: CanvasRenderingContext2D, f: Fx, t: number) {
  if (t < 0.12) {
    ctx.fillStyle = `rgba(190,235,255,${0.35 * (1 - t / 0.12)})`;
    ctx.fillRect(0, 0, innerWidth, innerHeight);
  }
  const alpha = t < 0.6 ? (Math.sin(t * 90) > -0.3 ? 1 : 0.3) : 1 - (t - 0.6) / 0.4;
  ctx.save();
  ctx.globalAlpha = Math.max(0, alpha);
  ctx.lineJoin = "round";
  ctx.shadowColor = "#4cc9ff";
  ctx.shadowBlur = 24;
  ctx.strokeStyle = "#4cc9ff";
  ctx.lineWidth = 6;
  trace(ctx, f.bolt);
  for (const b of f.branches) {
    ctx.lineWidth = 3;
    trace(ctx, b);
  }
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  trace(ctx, f.bolt);
  ctx.restore();
}

export default function FxCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let fx: Fx[] = [];
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const loop = (now: number) => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      fx = fx.filter((f) => now - f.t0 < DUR[f.kind]);
      for (const f of fx) {
        const t = (now - f.t0) / DUR[f.kind];
        if (f.kind === "spider") drawSpider(ctx, f, t);
        else if (f.kind === "cap") drawCap(ctx, f, t);
        else if (f.kind === "strange") drawStrange(ctx, f, t);
        else drawThor(ctx, f, t);
      }
      raf = fx.length ? requestAnimationFrame(loop) : 0;
    };

    const onDown = (e: PointerEvent) => {
      if (reduced) return;
      if ((e.target as HTMLElement).closest("a,button,input,textarea,select,[data-nofx]")) return;
      // The hero effect depends on which zone of the page you click in.
      const zone = (e.target as HTMLElement).closest<HTMLElement>("[data-hero]");
      const kind = (zone?.dataset.hero as HeroId | undefined) ?? "spider";
      const ink = getComputedStyle(document.documentElement).getPropertyValue("--fg").trim() || "#fff";
      const bolt = kind === "thor" ? makeBolt(e.clientX + (Math.random() - 0.5) * 120, -10, e.clientX, e.clientY) : [];
      const branches: Pt[][] = [];
      if (kind === "thor") {
        for (let i = 0; i < 3; i++) {
          const [bx, by] = bolt[Math.floor(8 + Math.random() * (bolt.length - 14))];
          branches.push(makeBolt(bx, by, bx + (Math.random() - 0.5) * 240, by + 40 + Math.random() * 100, 40));
        }
      }
      fx.push({
        ink,
        kind,
        x: e.clientX,
        y: e.clientY,
        t0: performance.now(),
        seed: Math.random(),
        ox: e.clientX < innerWidth / 2 ? 0 : innerWidth,
        oy: innerHeight,
        bolt,
        branches,
      });
      if (!raf) raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", onDown);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-[60] h-full w-full" />;
}
