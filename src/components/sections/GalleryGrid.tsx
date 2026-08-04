"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

const TILES = [
  { label: "Toys", sub: "Bricks, plush & RC", src: "/toys.webp" },
  { label: "Jewellery", sub: "Fashion & fine stone", src: "/WhatsApp Image 2026-08-01 at 18.24.25.jpeg" },
  { label: "Furniture", sub: "Wood & upholstery", src: "/WhatsApp Image 2026-08-01 at 18.35.28.jpeg" },
  { label: "Electronics", sub: "Consumer & OEM", src: "/WhatsApp Image 2026-08-01 at 18.35.27.jpeg" },
  { label: "Accessories", sub: "Leather & silver", src: "/accessories.webp" },
  { label: "Machinery", sub: "Industrial & vehicles", src: "/WhatsApp Image 2026-08-01 at 18.35.52.jpeg" },
  { label: "Home Decor", sub: "Interiors & gifting", src: "/WhatsApp Image 2026-08-01 at 18.35.29.jpeg" },
  { label: "Footwear & Bags", sub: "Leather & performance", src: "/WhatsApp Image 2026-08-01 at 18.36.53.jpeg" },
  { label: "Stationery", sub: "Paper & desk supply", src: "/stationary.webp" },
  { label: "Hardware", sub: "Fasteners & tools", src: "/hardware.webp" },
];

export default function GalleryGrid() {
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
      { x: -distance, duration: 36, ease: "none", repeat: -1 }
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
    <section className="relative overflow-hidden bg-canvas py-20 md:py-28">
      <div className="overflow-hidden">
        <div ref={trackRef} className="flex w-max gap-3 sm:gap-4">
          {[...TILES, ...TILES].map((t, i) => (
            <button
              key={`${t.label}-${i}`}
              type="button"
              onClick={() => setOpenIndex(i % TILES.length)}
              className="group relative shrink-0 overflow-hidden rounded-2xl w-[240px] sm:w-[280px] aspect-[4/5] bg-canvas-deep text-left"
            >
              <img
                src={t.src}
                alt={t.label}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent"
              />
              <span className="absolute top-3.5 right-3.5 flex items-center justify-center w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm text-white opacity-0 -translate-y-1.5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-[10px] uppercase tracking-[0.15em] text-canvas/60 mb-1">
                  {t.sub}
                </p>
                <p className="text-sm font-semibold text-canvas">{t.label}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* edge fades so cards dissolve into the canvas instead of hard-cutting */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-canvas to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-canvas to-transparent"
      />

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
