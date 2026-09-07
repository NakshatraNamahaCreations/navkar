"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PLANS } from "@/data/plans";
import PlanDetail from "./PlanDetail";

gsap.registerPlugin(ScrollTrigger);

const AUTOPLAY_MS = 3800;

export default function ServicesShowcase({
  hideDetailRail = false,
  hideCta = false,
}: {
  hideDetailRail?: boolean;
  hideCta?: boolean;
} = {}) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(1);
  const [slide, setSlide] = useState(0);
  const [perView, setPerView] = useState(3);
  const pausedRef = useRef(false);

  const openPlanEnquiry = (planName: string) => {
    window.dispatchEvent(
      new CustomEvent("open-quick-enquiry", { detail: { planName } })
    );
  };

  useEffect(() => {
    const setFromWidth = () => {
      const w = window.innerWidth;
      setPerView(w < 640 ? 1 : w < 1024 ? 2 : w < 1280 ? 3 : 4);
    };
    setFromWidth();
    window.addEventListener("resize", setFromWidth);
    return () => window.removeEventListener("resize", setFromWidth);
  }, []);

  const maxSlide = Math.max(0, PLANS.length - perView);

  useEffect(() => {
    setSlide((i) => Math.min(i, maxSlide));
  }, [maxSlide]);

  useEffect(() => {
    const t = window.setInterval(() => {
      if (pausedRef.current) return;
      setSlide((i) => (i >= maxSlide ? 0 : i + 1));
    }, AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [maxSlide]);

  const goSlide = (dir: 1 | -1) =>
    setSlide((i) => Math.min(maxSlide, Math.max(0, i + dir)));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".svc-eyebrow, .svc-heading", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".svc-eyebrow", start: "top 85%" },
      });

      gsap.from(".svc-stage", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".svc-stage", start: "top 88%" },
      });

      gsap.from(".svc-cta", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".svc-cta", start: "top 90%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const trackPercent = (100 / perView) * slide;

  return (
    <div ref={root}>
      {/* four-card comparison, priced-page style: a raised, glowing
          "Popular" card set apart from the rest, all with icon badges,
          pill-style feature checks, and a hover lift. Background carries
          its own layered treatment (dot texture + dual ambient glows +
          top fade) instead of sitting on flat canvas white. */}
      <section className="relative overflow-hidden bg-canvas-deep py-20 md:py-28 px-6 md:px-10">
        {/* fine dot-grid texture across the whole section */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.4]"
          preserveAspectRatio="none"
        >
          <pattern id="svc-bg-dots" width="26" height="26" patternUnits="userSpaceOnUse">
            <circle cx="1.4" cy="1.4" r="1.4" fill="rgba(15,118,110,0.16)" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#svc-bg-dots)" />
        </svg>

        {/* dual ambient glows, brand navy + teal, for depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 w-[42rem] h-[42rem] rounded-full bg-[radial-gradient(circle,rgba(15,118,110,0.14),transparent_70%)] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-24 w-[36rem] h-[36rem] rounded-full bg-[radial-gradient(circle,rgba(32,57,74,0.16),transparent_70%)] blur-3xl"
        />
        {/* soft fade so the dot texture doesn't hard-cut against the hero above */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-canvas-deep to-transparent"
        />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <span className="svc-eyebrow inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-accent mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Compare Plans
            </span>
            <h2 className="svc-heading font-display font-bold leading-[1.1] text-3xl md:text-5xl text-ink">
              Built for wherever you are
              <br />
              <span className="bg-gradient-to-r from-accent to-accent-soft bg-clip-text text-transparent">
                in the sourcing journey.
              </span>
            </h2>
          </div>

          {maxSlide > 0 && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => goSlide(-1)}
                aria-label="Previous plan"
                className="grid place-items-center h-11 w-11 rounded-full border border-line text-ink-soft hover:border-ink hover:bg-ink hover:text-canvas transition-colors duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => goSlide(1)}
                aria-label="Next plan"
                className="grid place-items-center h-11 w-11 rounded-full border border-line text-ink-soft hover:border-ink hover:bg-ink hover:text-canvas transition-colors duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        </div>

        <div
          className="svc-stage relative z-10 max-w-7xl mx-auto overflow-hidden"
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
        >
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] py-3"
            style={{ transform: `translateX(-${trackPercent}%)` }}
          >
            {PLANS.map((p, i) => (
              <div
                key={p.num}
                className="shrink-0 px-2.5 md:px-3"
                style={{ width: `${100 / perView}%` }}
                onMouseEnter={() => setActive(i)}
              >
                <div
                  className="svc-card group relative flex flex-col h-full rounded-3xl p-7 bg-white text-ink border border-line transition-all duration-400 hover:-translate-y-1.5 hover:bg-ink hover:text-canvas hover:border-ink hover:shadow-[0_30px_70px_-20px_rgba(15,118,110,0.45)]"
                >
                  {p.featured && (
                    <>
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                        style={{ background: "radial-gradient(circle, rgba(79,179,166,0.4), transparent 70%)" }}
                      />
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-accent-soft text-canvas text-[10px] uppercase tracking-[0.15em] font-semibold px-4 py-1.5 shadow-[0_8px_20px_-6px_rgba(15,118,110,0.6)]">
                        Most Popular
                      </span>
                    </>
                  )}

                  <div className="relative flex items-center justify-between mb-6">
                    <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-accent/10 text-accent transition-colors duration-400 group-hover:bg-gradient-to-br group-hover:from-accent-soft group-hover:to-accent group-hover:text-canvas">
                      <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]">
                        {p.icon}
                      </svg>
                    </span>
                    <span className="font-mono text-xs text-ink-soft/40 transition-colors duration-400 group-hover:text-canvas/40">
                      {p.num}
                    </span>
                  </div>

                  <Link
                    href={`/services/${p.slug}`}
                    className="relative font-display text-xl font-bold mb-1.5 hover:underline underline-offset-4 w-fit block"
                  >
                    {p.name}
                  </Link>
                  <p className="relative text-[13px] mb-5 text-ink-soft transition-colors duration-400 group-hover:text-canvas/60">
                    {p.tagline}
                  </p>

                  <div className="relative h-px w-full mb-5 bg-line transition-colors duration-400 group-hover:bg-white/10" />

                  <ul className="relative flex flex-col gap-2.5 mb-7 flex-1">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-[13px] leading-snug text-ink-soft transition-colors duration-400 group-hover:text-canvas/85"
                      >
                        <svg
                          viewBox="0 0 20 20"
                          fill="none"
                          className="w-4 h-4 mt-0.5 shrink-0 text-accent transition-colors duration-400 group-hover:text-accent-soft"
                        >
                          <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.4" />
                          <path
                            d="M6.5 10.2l2.2 2.2 4.8-5"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {p.fee !== "Let's connect" && (
                    <p className="relative rounded-xl bg-ink/5 px-3 py-2 text-[13px] font-semibold leading-snug text-ink mb-3 transition-colors duration-400 group-hover:bg-canvas/10 group-hover:text-canvas">
                      {p.fee}
                    </p>
                  )}

                  <Link
                    href="/contact-us"
                    className="relative inline-flex items-center gap-1.5 self-start mb-4 rounded-full bg-gradient-to-r from-accent to-accent-soft px-4 py-2 text-sm font-bold text-canvas shadow-[0_10px_24px_-8px_rgba(15,118,110,0.6)] transition-transform duration-300 hover:scale-105"
                  >
                    Let&apos;s Connect
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                      ↗
                    </span>
                  </Link>

                  <Link
                    href={`/services/${p.slug}`}
                    className="relative flex items-center justify-center gap-1.5 mb-3 text-[11px] uppercase tracking-[0.15em] font-medium hover:underline underline-offset-4 text-ink-soft transition-colors duration-400 group-hover:text-canvas/70"
                  >
                    View Full Details
                    <span>→</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => openPlanEnquiry(p.name)}
                    className="relative flex items-center justify-center gap-2 rounded-full py-3 text-xs uppercase tracking-[0.15em] font-medium border border-line text-ink transition-colors duration-300 group-hover:border-canvas group-hover:bg-canvas group-hover:text-ink"
                  >
                    Enquire
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                      ↗
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {maxSlide > 0 && (
          <div className="relative z-10 max-w-7xl mx-auto mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: maxSlide + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSlide(i)}
                aria-label={`Show slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === slide ? "w-8 bg-accent" : "w-1.5 bg-ink/15 hover:bg-ink/30"
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* detail rail: a full breakdown of whichever plan the visitor last
          touched, intro copy, an "Ideal For" checklist, the services
          included, and a closing "why choose" quote panel */}
      {!hideDetailRail && (
        <section className="relative bg-ink py-20 md:py-24 px-6 md:px-10 overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-0 w-[34rem] h-[34rem] rounded-full bg-[radial-gradient(circle,rgba(32,57,74,0.5),transparent_70%)] blur-3xl"
          />
          <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-start">
            <div className="flex md:flex-col gap-2 md:gap-3">
              {PLANS.map((p, i) => (
                <button
                  key={p.num}
                  onClick={() => setActive(i)}
                  aria-label={`Show ${p.name} details`}
                  className={`flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full font-mono text-xs transition-all duration-300 ${
                    active === i
                      ? "bg-gradient-to-br from-accent-soft to-accent text-canvas scale-110 shadow-[0_10px_24px_-6px_rgba(15,118,110,0.6)]"
                      : "bg-white/5 text-canvas/50 hover:bg-white/10 hover:text-canvas/80"
                  }`}
                >
                  {p.num}
                </button>
              ))}
            </div>

            <div key={active} className="svc-detail">
              <PlanDetail plan={PLANS[active]} />
              <Link
                href={`/services/${PLANS[active].slug}`}
                className="inline-flex items-center gap-2 mt-7 text-xs uppercase tracking-[0.2em] font-medium text-accent-soft hover:text-canvas transition-colors duration-300"
              >
                View {PLANS[active].name} Plan Page
                <span>↗</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* closing CTA band */}
      {!hideCta && (
        <section className="relative overflow-hidden bg-canvas py-20 md:py-24 px-6 md:px-10 border-t border-line">
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-[radial-gradient(circle,rgba(15,118,110,0.08),transparent_70%)] blur-3xl"
          />
          <div className="svc-cta relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-4xl font-bold text-ink mb-4">
              Not sure which plan fits?
            </h2>
            <p className="text-sm md:text-base text-ink-soft leading-relaxed mb-8">
              Tell us where you are in the sourcing journey and we&apos;ll point
              you to the right desk, no obligation, no jargon.
            </p>
            <a
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-full bg-ink text-canvas px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-medium hover:bg-accent transition-colors duration-300"
            >
              Talk to Our Team
              <span>↗</span>
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
