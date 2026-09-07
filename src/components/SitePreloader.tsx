"use client";

import { useEffect, useState } from "react";

export default function SitePreloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    // a short, deterministic ramp — this is a brand moment, not a real
    // asset-loading progress bar, so it always completes quickly
    const DURATION = 1400;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / DURATION) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setVisible(false), 250);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!visible) {
      const t = setTimeout(() => {
        setRemoved(true);
        // scroll-triggered animations across the site compute their
        // start/end positions against layout that's still settling while
        // this overlay covers the page — recompute once it's gone so
        // those triggers fire at the right scroll position
        window.dispatchEvent(new Event("site-preloader-done"));
      }, 700);
      return () => clearTimeout(t);
    }
  }, [visible]);

  if (removed) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink transition-opacity duration-700 ease-out"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
    >
      <p className="text-xs uppercase tracking-[0.4em] text-canvas/80">
        Navkar <span className="text-accent-soft">Global</span>
      </p>
      <div className="mt-8 w-56 h-px bg-canvas/15" />
      <div className="mt-4 flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-canvas/50">
        <span>Composing the descent</span>
        <span className="font-mono text-canvas/70">{progress}%</span>
      </div>
    </div>
  );
}
