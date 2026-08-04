"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Variant = "centered" | "split" | "editorial" | "light";

export default function PageHero({
  eyebrow,
  title,
  accentWord,
  copy,
  variant = "centered",
  side,
  meta,
}: {
  eyebrow: string;
  title: string;
  accentWord?: string;
  copy?: string;
  /** centered: portrait, brand-dark (About Us). split: text left, custom
   *  panel right (Services/Sourcing Process). editorial: magazine-style,
   *  big oversized title (Gallery/Blogs). light: canvas bg, not dark
   *  (Contact Us/Product Categories) */
  variant?: Variant;
  /** only used by "split" — the right-hand panel content */
  side?: ReactNode;
  /** small labelled stats/notes row under the copy */
  meta?: { label: string; value: string }[];
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".page-hero-eyebrow", {
        opacity: 0,
        y: 16,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".page-hero-title .split-line > span", {
        yPercent: 110,
        duration: 1,
        stagger: 0.08,
        delay: 0.1,
        ease: "power3.out",
      });
      gsap.from(".page-hero-copy", {
        opacity: 0,
        y: 16,
        duration: 0.8,
        delay: 0.35,
        ease: "power3.out",
      });
      gsap.from(".page-hero-side", {
        opacity: 0,
        x: 30,
        duration: 0.9,
        delay: 0.25,
        ease: "power3.out",
      });
      gsap.from(".page-hero-meta", {
        opacity: 0,
        y: 14,
        duration: 0.7,
        stagger: 0.08,
        delay: 0.45,
        ease: "power3.out",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const isDark = variant !== "light";

  const titleEl = (
    <h1
      className={`page-hero-title font-banner font-bold leading-[1.05] text-4xl md:text-6xl mb-6 ${
        isDark ? "text-canvas" : "text-ink"
      } ${variant === "editorial" ? "md:text-7xl" : ""}`}
    >
      <span className="split-line block overflow-hidden">
        <span className="block">
          {title}
          {accentWord && (
            <>
              {" "}
              <span className="bg-gradient-to-r from-accent-soft to-accent bg-clip-text text-transparent">
                {accentWord}
              </span>
            </>
          )}
        </span>
      </span>
    </h1>
  );

  const eyebrowEl = (
    <div className="page-hero-eyebrow flex items-center gap-4 mb-6">
      <span className={`h-px w-16 ${isDark ? "bg-canvas/15" : "bg-ink/15"}`} />
      <span
        className={`text-xs uppercase tracking-[0.3em] ${
          isDark ? "text-canvas/50" : "text-ink-soft"
        }`}
      >
        {eyebrow}
      </span>
      <span className={`h-px w-16 ${isDark ? "bg-canvas/15" : "bg-ink/15"}`} />
    </div>
  );

  const copyEl = copy && (
    <p
      className={`page-hero-copy text-sm md:text-base leading-relaxed ${
        isDark ? "text-canvas/60" : "text-ink-soft"
      } ${variant === "centered" ? "max-w-2xl mx-auto" : "max-w-xl"}`}
    >
      {copy}
    </p>
  );

  const metaEl = meta && meta.length > 0 && (
    <div className="flex flex-wrap gap-6 mt-8">
      {meta.map((m) => (
        <div key={m.label} className="page-hero-meta">
          <p
            className={`font-display text-2xl font-black ${
              isDark ? "text-canvas" : "text-ink"
            }`}
          >
            {m.value}
          </p>
          <p
            className={`text-[10px] uppercase tracking-[0.15em] mt-0.5 ${
              isDark ? "text-canvas/45" : "text-ink-soft/70"
            }`}
          >
            {m.label}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <section
      ref={root}
      data-page-hero
      className={`relative overflow-hidden pt-40 pb-20 md:pt-48 md:pb-28 px-6 md:px-10 ${
        isDark ? "bg-ink" : "bg-canvas"
      }`}
    >
      {isDark ? (
        <>
          {/* fine dot-grid texture, consistent with the darker sections
              further down the page instead of a flat solid navy */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.35]"
            preserveAspectRatio="none"
          >
            <pattern id="page-hero-dots" width="26" height="26" patternUnits="userSpaceOnUse">
              <circle cx="1.4" cy="1.4" r="1.4" fill="rgba(79,179,166,0.22)" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#page-hero-dots)" />
          </svg>
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[46rem] h-[46rem] rounded-full bg-[radial-gradient(circle,rgba(79,179,166,0.16),transparent_70%)] blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 right-0 w-[26rem] h-[26rem] rounded-full bg-[radial-gradient(circle,rgba(32,57,74,0.4),transparent_70%)] blur-3xl"
          />
        </>
      ) : (
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 w-[34rem] h-[34rem] rounded-full bg-[radial-gradient(circle,rgba(15,118,110,0.08),transparent_70%)] blur-3xl"
        />
      )}

      {variant === "centered" && (
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="justify-center flex">{eyebrowEl}</div>
          {titleEl}
          {copyEl && <div className="flex justify-center">{copyEl}</div>}
          {metaEl && <div className="justify-center flex">{metaEl}</div>}
        </div>
      )}

      {variant === "split" && (
        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            {eyebrowEl}
            {titleEl}
            {copyEl}
            {metaEl}
          </div>
          <div className="page-hero-side">{side}</div>
        </div>
      )}

      {variant === "editorial" && (
        <div className="relative z-10 max-w-5xl mx-auto">
          {eyebrowEl}
          {titleEl}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            {copyEl}
            {metaEl}
          </div>
        </div>
      )}

      {variant === "light" && (
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="justify-center flex">{eyebrowEl}</div>
          {titleEl}
          {copyEl && <div className="flex justify-center">{copyEl}</div>}
          {metaEl && <div className="justify-center flex">{metaEl}</div>}
        </div>
      )}
    </section>
  );
}
