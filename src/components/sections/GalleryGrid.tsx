"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pexels = (id: number, w = 900) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const TILES = [
  { label: "Supplier Sourcing", sub: "Identification & shortlisting", src: pexels(3183197) },
  { label: "Factory Audits", sub: "On-site verification", src: pexels(3862627) },
  { label: "Production Floor", sub: "Manufacturing in progress", src: pexels(3846508) },
  { label: "Quality Inspection", sub: "Pre-shipment checks", src: pexels(3184292) },
  { label: "Packing & Labeling", sub: "Export-ready preparation", src: pexels(4481259) },
  { label: "Documentation", sub: "Compliance & paperwork", src: pexels(6694543) },
  { label: "Shipping & Logistics", sub: "Sea & air freight", src: "/cargo-ship-sailing-ocean.jpg" },
  { label: "Our Team", sub: "Coordinating every order", src: pexels(3182773) },
];

export default function GalleryGrid() {
  const root = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const distance = track.scrollWidth / 2;
    const tween = gsap.fromTo(
      track,
      { x: 0 },
      { x: -distance, duration: 40, ease: "none", repeat: -1 }
    );

    const onEnter = () => tween.pause();
    const onLeave = () => tween.resume();
    track.addEventListener("mouseenter", onEnter);
    track.addEventListener("mouseleave", onLeave);

    return () => {
      tween.kill();
      track.removeEventListener("mouseenter", onEnter);
      track.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gg-eyebrow, .gg-heading", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
      gsap.from(".gg-stage", {
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".gg-stage", start: "top 88%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + TILES.length) % TILES.length)),
    []
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % TILES.length)),
    []
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, close, prev, next]);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-canvas py-20 md:py-28"
    >
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
        preserveAspectRatio="none"
      >
        <pattern id="gg-dots" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1.4" cy="1.4" r="1.4" fill="rgba(14,31,28,0.06)" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#gg-dots)" />
      </svg>

      <div className="relative z-10 max-w-[90rem] mx-auto px-6 md:px-10 mb-12 md:mb-16 text-center">
        <span className="gg-eyebrow inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-accent mb-5 justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          The Work Behind Every Shipment
        </span>
        <h2 className="gg-heading font-display font-bold leading-[1.1] text-3xl md:text-5xl text-ink">
          Real products, <span className="text-accent">real factories.</span>
        </h2>
      </div>

      <div className="gg-stage relative">
        <div className="overflow-hidden">
          <div ref={trackRef} className="flex w-max gap-4 sm:gap-5">
            {[...TILES, ...TILES].map((t, i) => (
              <button
                key={`${t.label}-${i}`}
                type="button"
                onClick={() => setOpenIndex(i % TILES.length)}
                className="group relative shrink-0 overflow-hidden rounded-2xl w-[240px] sm:w-[300px] aspect-[4/5] bg-canvas-deep text-left shadow-[0_20px_45px_-24px_rgba(14,31,28,0.35)] ring-1 ring-black/5"
              >
                <img
                  src={t.src}
                  alt={t.label}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-transparent"
                />

                <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-semibold text-ink">
                    {String((i % TILES.length) + 1).padStart(2, "0")}
                  </span>
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm text-white ring-1 ring-white/25 opacity-0 -translate-y-1.5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-white group-hover:text-ink">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/70 [text-shadow:0_1px_4px_rgba(0,0,0,0.5)] mb-1.5">
                    {t.sub}
                  </p>
                  <p className="font-display text-xl font-bold text-white tracking-tight [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
                    {t.label}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* lightbox */}
      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[80] bg-ink/95 backdrop-blur-sm flex items-center justify-center px-6 py-10"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-6 right-6 flex items-center justify-center w-11 h-11 rounded-full border border-canvas/20 text-canvas hover:bg-canvas hover:text-ink transition-colors duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full border border-canvas/20 text-canvas hover:bg-canvas hover:text-ink transition-colors duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full border border-canvas/20 text-canvas hover:bg-canvas hover:text-ink transition-colors duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            className="relative max-w-4xl w-full max-h-[80vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)]">
              <img
                src={TILES[openIndex].src}
                alt={TILES[openIndex].label}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="mt-6 text-center">
              <p className="text-[11px] uppercase tracking-[0.2em] text-accent-soft mb-1.5">
                {TILES[openIndex].sub}
              </p>
              <p className="font-display text-xl font-bold text-canvas">
                {TILES[openIndex].label}
              </p>
              <p className="mt-2 font-mono text-xs text-canvas/40">
                {String(openIndex + 1).padStart(2, "0")} / {String(TILES.length).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
