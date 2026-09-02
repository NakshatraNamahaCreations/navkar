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
    planTitle: "Basic Sourcing Plan",
    subtitle: "Professional Support for Your Existing Supplier",
    intro: [
      "Already have a supplier or factory but need professional assistance? Our Basic Global Sourcing Services Plan is designed for businesses that have identified their supplier and require support with one specific sourcing service.",
      "We act as your trusted representative, coordinating directly with your supplier and helping ensure that the selected international sourcing service is completed professionally and efficiently.",
    ],
    idealFor: [
      "Already have a supplier or manufacturer identified",
      "Require support with one specific sourcing service",
      "Need a reliable global sourcing partner to coordinate with their supplier",
      "Want greater transparency and confidence before shipment",
      "Need professional assistance without choosing a complete sourcing package",
    ],
    servicesHeading: "Available Sourcing Support",
    servicesList: [
      "Supplier Verification",
      "Factory Verification",
      "Product Quality Inspection",
      "Pre-Shipment Inspection",
      "Supplier Communication",
      "Price Verification",
      "Production Follow-Up",
      "Packaging Verification",
      "Order Coordination",
    ],
    whyChooseHeading: "Why Choose the Basic Plan?",
    whyChooseQuote: "Your Supplier. Our Support. Your Peace of Mind.",
    whyChooseText:
      "Get professional global sourcing support without paying for a complete sourcing package. Our team helps you coordinate with your existing supplier and reduce sourcing-related risks before your products are shipped.",
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
    blurb: "Our most-booked desk: full sourcing from a cold start to a verified factory.",
    features: [
      "Product Categorization",
      "Supplier Sourcing",
      "Competitive Price Negotiation",
      "Supplier Verification",
    ],
    featured: true,
    planTitle: "Pro Sourcing Plan",
    subtitle: "End-to-End Global Sourcing Services",
    intro: [
      "Looking for a reliable partner to manage your complete sourcing journey? Our Pro Global Sourcing Services Plan provides end-to-end sourcing support, from finding the right supplier to production, quality control, and shipment coordination.",
      "Our team works as your dedicated global sourcing agent, helping you identify suitable manufacturers, evaluate suppliers, negotiate competitive prices, monitor production, inspect product quality, and coordinate the sourcing process.",
    ],
    idealFor: [
      "Do not yet have a supplier or factory identified",
      "Need complete product sourcing support",
      "Want access to reliable manufacturers and suppliers",
      "Need professional supplier evaluation and negotiation",
      "Want competitive sourcing prices",
      "Require quality control and inspection support",
      "Prefer one partner to manage the complete sourcing process",
    ],
    servicesHeading: "Our Pro Sourcing Services Include",
    servicesList: [
      "Supplier & Manufacturer Sourcing",
      "Supplier Verification",
      "Factory Background Checks",
      "Factory Audit & Assessment",
      "Product & Sample Evaluation",
      "Price & Commercial Negotiation",
      "Production Monitoring",
      "Quality Control Inspection",
      "Pre-Shipment Inspection",
      "Packaging & Labelling Verification",
      "Logistics & Shipping Coordination",
      "Documentation Support",
      "Order Management & Tracking",
    ],
    whyChooseHeading: "Why Choose the Pro Plan?",
    whyChooseQuote: "One Partner. Complete Global Sourcing Support.",
    whyChooseText:
      "From finding reliable manufacturers to coordinating quality checks and shipment, Navkar Global Sourcing helps you manage the entire sourcing journey while saving time, reducing sourcing risks, and improving supplier confidence.",
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
    blurb: "For requirements that don't fit a template, scoped and quoted directly.",
    features: [
      "Tailor-Made Sourcing Solutions",
      "Import & Logistics Support",
      "Payment Routing & Support",
      "Shipment Consolidation",
    ],
    planTitle: "Custom Sourcing Plan",
    subtitle: "Flexible Global Sourcing Services for Your Business",
    intro: [
      "Every business has different sourcing requirements. Our Custom Global Sourcing Services Plan is designed for clients who already have a supplier or manufacturer but need professional support with multiple sourcing activities.",
      "Instead of choosing a complete sourcing package, you can select and combine the services that match your specific product, supplier, and business requirements.",
    ],
    idealFor: [
      "Already have a supplier or factory identified",
      "Need support with multiple sourcing services",
      "Want professional assistance without a complete sourcing package",
      "Require flexible sourcing support based on their project",
      "Need specialized assistance during production or shipment",
    ],
    servicesHeading: "Services You Can Combine",
    servicesList: [
      "Supplier Verification & Background Checks",
      "Factory Audit & Assessment",
      "Product & Sample Quality Inspection",
      "Price & Commercial Negotiation",
      "Quality Control & Pre-Shipment Inspection",
      "Production Monitoring",
      "Packaging & Labelling Verification",
      "Logistics & Shipping Coordination",
      "Documentation & Compliance Support",
      "Supplier Communication & Follow-Up",
      "Order Management & Tracking",
    ],
    whyChooseHeading: "Why Choose the Custom Plan?",
    whyChooseQuote: "Your Requirements. Your Combination. Full Flexibility.",
    whyChooseText:
      "Build a sourcing package that matches your exact needs. Combine the services you require and get professional support at every step, without paying for services you don't need.",
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
    blurb: "Boots on the ground alongside you: audits, translation, and factory visits.",
    features: [
      "Business Travel Assistance",
      "Supplier Audits & Verification",
      "Language & Communication Support",
      "Supplier & Factory Meeting Coordination",
    ],
    planTitle: "Custom Pro Sourcing Plan",
    subtitle: "On-the-Ground Support When You Travel to Source",
    intro: [
      "Planning to travel and source directly with your suppliers? Our Custom Pro Global Sourcing Services Plan gives you a trusted partner on the ground, helping you navigate factory visits, negotiations, and supplier meetings with confidence.",
      "Our team accompanies and supports you throughout your sourcing trip, handling language barriers, coordination, and verification so you can focus on building the right supplier relationships.",
    ],
    idealFor: [
      "Are travelling to meet suppliers or visit factories in person",
      "Need local language and communication support",
      "Want supplier and factory audits carried out during their visit",
      "Require help coordinating supplier and factory meetings",
      "Prefer real-time, on-ground sourcing guidance",
    ],
    servicesHeading: "Available On-Ground Support",
    servicesList: [
      "Business Travel Assistance",
      "Supplier & Factory Audits",
      "Language & Communication Support",
      "Supplier & Factory Meeting Coordination",
      "Local Logistics Assistance",
      "On-Site Negotiation Support",
      "Real-Time Sourcing Guidance",
    ],
    whyChooseHeading: "Why Choose the Custom Pro Plan?",
    whyChooseQuote: "Your Trip. Our Ground Support. Confident Sourcing.",
    whyChooseText:
      "Travel to source with a trusted local partner by your side. From factory visits to supplier negotiations, we help you make confident sourcing decisions in person.",
    icon: (
      <>
        <path d="M3 12l4-4 4 3 4-3 4 3v3l-4 4-3-2-3 2-4-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="12" cy="6" r="2" stroke="currentColor" strokeWidth="1.6" />
      </>
    ),
  },
];

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
                  className={`svc-card group relative flex flex-col h-full rounded-3xl p-7 transition-all duration-400 ${
                    p.featured
                      ? "bg-ink text-canvas shadow-[0_30px_70px_-20px_rgba(15,118,110,0.45)] ring-1 ring-white/10"
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
              <span className="text-[11px] uppercase tracking-[0.25em] text-accent-soft mb-3 block">
                {PLANS[active].planTitle}
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold leading-snug text-canvas mb-5">
                {PLANS[active].subtitle}
              </h3>

              <div className="space-y-4 text-sm text-canvas/65 leading-relaxed mb-9 max-w-3xl">
                {PLANS[active].intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-9 mb-9">
                <div>
                  <h4 className="text-[11px] uppercase tracking-[0.2em] text-accent-soft mb-4">
                    Ideal For
                  </h4>
                  <ul className="flex flex-col gap-2.5">
                    {PLANS[active].idealFor.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[13px] leading-snug text-canvas/75">
                        <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 mt-0.5 shrink-0 text-accent-soft">
                          <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.4" />
                          <path d="M6.5 10.2l2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[11px] uppercase tracking-[0.2em] text-accent-soft mb-4">
                    {PLANS[active].servicesHeading}
                  </h4>
                  <ul className="flex flex-col gap-2.5">
                    {PLANS[active].servicesList.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[13px] leading-snug text-canvas/75">
                        <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 mt-0.5 shrink-0 text-accent">
                          <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.4" />
                          <path d="M6.5 10.2l2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
                <span className="text-[11px] uppercase tracking-[0.2em] text-accent-soft mb-3 block">
                  {PLANS[active].whyChooseHeading}
                </span>
                <p className="font-display text-lg md:text-xl font-medium text-canvas mb-3">
                  {PLANS[active].whyChooseQuote}
                </p>
                <p className="text-sm text-canvas/60 leading-relaxed">
                  {PLANS[active].whyChooseText}
                </p>
              </div>
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
