"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PLANS = [
  {
    num: "01",
    name: "Basic",
    tagline: "If you already have your supplier.",
    blurb: "Light-touch support for teams who've already found their factory.",
    features: [
      "Contact Suppliers",
      "Payment Assistance",
      "Receiving Products",
      "Counting Quantity",
    ],
    icon: (
      <>
        <path d="M6 3h9l3 3v15H6V3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M15 3v3h3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M9 12.5l2 2 4-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    num: "02",
    name: "Pro",
    tagline: "If you don't have a supplier yet.",
    blurb: "Our most-booked desk — full sourcing from a cold start to a verified factory.",
    features: [
      "Product Categorization",
      "Supplier Sourcing",
      "Competitive Price Negotiation",
      "Supplier Verification",
    ],
    featured: true,
    icon: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 12.5l2.5 2.5L16.5 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    num: "03",
    name: "Custom",
    tagline: "Bundled solutions, quoted case-to-case.",
    blurb: "For requirements that don't fit a template — scoped and quoted directly.",
    features: [
      "Tailor-Made Sourcing Solutions",
      "Import & Logistics Support",
      "Payment Routing & Support",
      "Shipment Consolidation",
    ],
    icon: (
      <>
        <path d="M4 20V9l8-6 8 6v11" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M4 20h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <rect x="9" y="12" width="6" height="8" stroke="currentColor" strokeWidth="1.6" />
      </>
    ),
  },
  {
    num: "04",
    name: "Custom Pro",
    tagline: "For clients travelling to source themselves.",
    blurb: "Boots on the ground alongside you — audits, translation, and factory visits.",
    features: [
      "Business Travel Assistance",
      "Supplier Audits & Verification",
      "Language & Communication Support",
      "Supplier & Factory Meeting Coordination",
    ],
    icon: (
      <>
        <path d="M3 12l4-4 4 3 4-3 4 3v3l-4 4-3-2-3 2-4-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="12" cy="6" r="2" stroke="currentColor" strokeWidth="1.6" />
      </>
    ),
  },
];

export default function ServicesShowcase({
  hideDetailRail = false,
  hideCta = false,
}: {
  hideDetailRail?: boolean;
  hideCta?: boolean;
} = {}) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(1);

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

      gsap.utils.toArray<HTMLElement>(".svc-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%" },
        });
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

        <div className="relative z-10 max-w-2xl mx-auto text-center mb-16 md:mb-20">
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

        <div className="relative z-10 max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {PLANS.map((p) => (
            <div
              key={p.num}
              onMouseEnter={() => setActive(PLANS.indexOf(p))}
              className={`svc-card group relative flex flex-col rounded-3xl p-7 transition-all duration-400 ${
                p.featured
                  ? "bg-ink text-canvas lg:-translate-y-3 shadow-[0_30px_70px_-20px_rgba(15,118,110,0.45)] ring-1 ring-white/10"
                  : "bg-white border border-line hover:-translate-y-1.5 hover:shadow-[0_25px_55px_-24px_rgba(20,40,50,0.25)] hover:border-accent/40"
              }`}
            >
              {p.featured && (
                <>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl"
                    style={{ background: "radial-gradient(circle, rgba(79,179,166,0.4), transparent 70%)" }}
                  />
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-accent-soft text-canvas text-[10px] uppercase tracking-[0.15em] font-semibold px-4 py-1.5 shadow-[0_8px_20px_-6px_rgba(15,118,110,0.6)]">
                    Most Popular
                  </span>
                </>
              )}

              <div className="relative flex items-center justify-between mb-6">
                <span
                  className={`flex items-center justify-center w-12 h-12 rounded-2xl ${
                    p.featured
                      ? "bg-gradient-to-br from-accent-soft to-accent text-canvas"
                      : "bg-accent/10 text-accent"
                  }`}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]">
                    {p.icon}
                  </svg>
                </span>
                <span
                  className={`font-mono text-xs ${
                    p.featured ? "text-canvas/40" : "text-ink-soft/40"
                  }`}
                >
                  {p.num}
                </span>
              </div>

              <h3 className="relative font-display text-xl font-bold mb-1.5">
                {p.name}
              </h3>
              <p
                className={`relative text-[13px] mb-5 ${
                  p.featured ? "text-canvas/60" : "text-ink-soft"
                }`}
              >
                {p.tagline}
              </p>

              <div
                className={`relative h-px w-full mb-5 ${
                  p.featured ? "bg-white/10" : "bg-line"
                }`}
              />

              <ul className="relative flex flex-col gap-2.5 mb-7 flex-1">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-start gap-2 text-[13px] leading-snug ${
                      p.featured ? "text-canvas/85" : "text-ink-soft"
                    }`}
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        p.featured ? "text-accent-soft" : "text-accent"
                      }`}
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

              <a
                href="#consultation"
                className={`relative flex items-center justify-center gap-2 rounded-full py-3 text-xs uppercase tracking-[0.15em] font-medium transition-colors duration-300 ${
                  p.featured
                    ? "bg-canvas text-ink hover:bg-accent-soft"
                    : "border border-line text-ink group-hover:border-ink"
                }`}
              >
                Enquire
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* detail rail: a slimmer, editorial follow-up that expands on
          whichever plan the visitor last touched, styled like a quoted
          case study rather than another card grid */}
      {!hideDetailRail && (
        <section className="relative bg-ink py-20 md:py-24 px-6 md:px-10 overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-0 w-[34rem] h-[34rem] rounded-full bg-[radial-gradient(circle,rgba(32,57,74,0.5),transparent_70%)] blur-3xl"
          />
          <div className="relative z-10 max-w-5xl mx-auto grid md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-center">
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
              <span className="text-[11px] uppercase tracking-[0.25em] text-accent-soft mb-4 block">
                {PLANS[active].name}
              </span>
              <p className="font-display text-2xl md:text-3xl font-light leading-snug text-canvas">
                &ldquo;{PLANS[active].blurb}&rdquo;
              </p>
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
              you to the right desk — no obligation, no jargon.
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
