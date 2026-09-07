"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TILES = [
  {
    icon: (
      <>
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.4" />
        <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
    title: "Experienced Leadership",
    copy: "Decades of combined sourcing and manufacturing experience behind every engagement.",
  },
  {
    icon: (
      <>
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    title: "Third-Party Quality Checks",
    copy: "Independent inspection and factory audits at every stage of production.",
  },
  {
    icon: (
      <>
        <path d="M12 3v18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M5 7l-3 5a3 3 0 006 0l-3-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M19 7l-3 5a3 3 0 006 0l-3-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M5 7h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M7 21h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
    title: "Compliance-First Focus",
    copy: "Documentation, terms, and trade compliance handled to global standards.",
  },
];

export default function TrustSection() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".trust-eyebrow, .trust-heading", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });

      gsap.from(".trust-card", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".trust-card", start: "top 85%" },
      });

      gsap.utils.toArray<HTMLElement>(".trust-tile").forEach((tile, i) => {
        gsap.from(tile, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: tile, start: "top 90%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-ink py-24 md:py-32 px-6 md:px-10"
    >
      {/* layered dark texture standing in for a photographic backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 15% 20%, rgba(79,179,166,0.16), transparent 55%), radial-gradient(ellipse at 85% 80%, rgba(32,57,74,0.5), transparent 55%)",
        }}
      />
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.25]"
        preserveAspectRatio="none"
      >
        <pattern id="trust-dots" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1.4" cy="1.4" r="1.4" fill="rgba(242,246,245,0.14)" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#trust-dots)" />
      </svg>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-canvas/10"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <span className="trust-eyebrow inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-accent-soft mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-soft" />
          Trust &amp; Transparency
        </span>
        <h2 className="trust-heading font-display font-bold leading-[1.08] text-3xl md:text-5xl text-canvas max-w-xl mb-14 md:mb-20">
          Verified Standards
          <br />
          In All We Do
        </h2>

        <div className="grid md:grid-cols-[minmax(0,26rem)_1fr] gap-6 md:gap-8 items-start">
          {/* highlighted card */}
          <div className="trust-card rounded-3xl bg-canvas text-ink p-8 shadow-[0_35px_80px_-24px_rgba(0,0,0,0.55)]">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 text-accent mb-5">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M4 21h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M6 21V9l6-5 6 5v12" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                <path d="M10 21v-6h4v6" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
            </span>
            <h3 className="font-display text-lg font-bold text-ink mb-2">
              Verified Supplier Network
            </h3>
            <p className="text-sm text-ink-soft leading-relaxed mb-6">
              Every supplier we work with is screened, audited, and held to
              consistent quality and compliance standards before your order
              is placed.
            </p>
            <div className="h-px bg-line mb-5" />
            <div className="flex items-center gap-4 text-xs uppercase tracking-[0.15em] text-ink-soft/70">
              <span>Factory Audits</span>
              <span className="w-1 h-1 rounded-full bg-ink-soft/40" />
              <span>Quality Checks</span>
              <span className="w-1 h-1 rounded-full bg-ink-soft/40" />
              <span>Trade Compliance</span>
            </div>
          </div>

          {/* feature tiles */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {TILES.map((t) => (
              <div
                key={t.title}
                className="trust-tile rounded-2xl bg-canvas/[0.06] border border-canvas/10 p-6 backdrop-blur-sm hover:bg-canvas/10 hover:border-canvas/20 transition-colors duration-300"
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-canvas/10 text-accent-soft mb-4">
                  <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]">
                    {t.icon}
                  </svg>
                </span>
                <h4 className="text-sm font-semibold text-canvas mb-2 leading-snug">
                  {t.title}
                </h4>
                <p className="text-xs text-canvas/60 leading-relaxed">
                  {t.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
