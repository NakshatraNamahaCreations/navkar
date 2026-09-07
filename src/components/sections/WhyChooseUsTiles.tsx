"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
  {
    title: "Reliable Supplier Network",
    copy: "Access a trusted network of carefully selected and verified manufacturers that match your product and business requirements.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 12.5l2.5 2.5L16.5 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "End-to-End Sourcing Support",
    copy: "From supplier identification and quotation management to production, quality control, shipping, and final delivery, we manage the entire sourcing process.",
    icon: (
      <>
        <path d="M4 20V9l8-6 8 6v11" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M4 20h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <rect x="9" y="12" width="6" height="8" stroke="currentColor" strokeWidth="1.6" />
      </>
    ),
  },
  {
    title: "Transparent Communication",
    copy: "Stay informed at every stage with regular updates, clear reporting, and dedicated support throughout your sourcing journey.",
    icon: (
      <>
        <path d="M4 5h16v11H8l-4 4V5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M8 9h8M8 12.5h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Competitive Price Comparison",
    copy: "We obtain multiple supplier quotations, compare commercial offers, and negotiate the best possible pricing and terms on your behalf.",
    icon: (
      <>
        <path d="M12 3v18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M5 7l-3 5a3 3 0 006 0l-3-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M19 7l-3 5a3 3 0 006 0l-3-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M5 7h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M7 21h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Quality Assurance",
    copy: "We coordinate product sampling, production monitoring, factory inspections, and pre-shipment quality checks to ensure your expectations are met.",
    icon: (
      <>
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "Comprehensive Logistics Support",
    copy: "We manage shipping, documentation, customs clearance support, and transportation to ensure smooth and timely delivery.",
    icon: (
      <>
        <path d="M3 12l4-4 4 3 4-3 4 3v3l-4 4-3-2-3 2-4-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="12" cy="6" r="2" stroke="currentColor" strokeWidth="1.6" />
      </>
    ),
  },
];

const AUTOPLAY_MS = 3800;

export default function WhyChooseUsTiles() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [perView, setPerView] = useState(3);
  const pausedRef = useRef(false);
  const total = REASONS.length;

  useEffect(() => {
    const setFromWidth = () => {
      const w = window.innerWidth;
      setPerView(w < 768 ? 1 : w < 1100 ? 2 : w < 1536 ? 3 : 4);
    };
    setFromWidth();
    window.addEventListener("resize", setFromWidth);
    return () => window.removeEventListener("resize", setFromWidth);
  }, []);

  const maxIndex = Math.max(0, total - perView);

  useEffect(() => {
    setActive((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    const t = window.setInterval(() => {
      if (pausedRef.current) return;
      setActive((i) => (i >= maxIndex ? 0 : i + 1));
    }, AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [maxIndex]);

  const go = (dir: 1 | -1) =>
    setActive((i) => Math.min(maxIndex, Math.max(0, i + dir)));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".wct-eyebrow, .wct-heading", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });

      gsap.from(".wct-stage", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".wct-stage", start: "top 88%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const trackPercent = (100 / perView) * active;

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-canvas py-20 md:py-28 px-6 md:px-10"
    >
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
        preserveAspectRatio="none"
      >
        <pattern id="wct-dots" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1.4" cy="1.4" r="1.4" fill="rgba(14,31,28,0.06)" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#wct-dots)" />
      </svg>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 w-[34rem] h-[34rem] rounded-full bg-[radial-gradient(circle,rgba(79,179,166,0.12),transparent_70%)] blur-3xl"
      />

      <div className="relative z-10 max-w-[90rem] mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span className="wct-eyebrow inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-accent mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Why Choose Us
            </span>
            <h2 className="wct-heading font-display font-bold leading-[1.08] text-3xl md:text-5xl text-ink max-w-2xl">
              Why Choose Navkar
              <br />
              Global Sourcing?
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous"
              className="grid place-items-center h-11 w-11 rounded-full border border-line text-ink-soft hover:border-ink hover:bg-ink hover:text-canvas transition-colors duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next"
              className="grid place-items-center h-11 w-11 rounded-full border border-line text-ink-soft hover:border-ink hover:bg-ink hover:text-canvas transition-colors duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* moving carousel stage */}
        <div
          className="wct-stage relative overflow-hidden"
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
        >
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${trackPercent}%)` }}
          >
            {REASONS.map((r) => (
              <div
                key={r.title}
                className="shrink-0 px-2.5"
                style={{ width: `${100 / perView}%` }}
              >
                <div className="group h-full rounded-3xl p-7 md:p-8 border border-line bg-white text-ink transition-all duration-500 hover:border-accent/40 hover:-translate-y-1 hover:shadow-[0_25px_55px_-24px_rgba(20,40,50,0.2)]">
                  <span className="flex items-center justify-center w-11 h-11 rounded-xl mb-6 bg-accent/10 text-accent">
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                      {r.icon}
                    </svg>
                  </span>
                  <h3 className="font-display text-lg md:text-xl font-bold mb-3 leading-snug">
                    {r.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-soft">
                    {r.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* progress dots */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-8 bg-ink" : "w-1.5 bg-ink/20 hover:bg-ink/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
