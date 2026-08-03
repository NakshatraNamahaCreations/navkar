"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// custom on-brand panel icons — one distinct mark per plan, drawn in the
// site's own navy/teal palette instead of stock photography
function PlanArt({ variant }: { variant: "basic" | "pro" | "custom" | "customPro" }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(155deg, #2f4d63 0%, #20394a 55%, #12222d 100%)",
        }}
      />
      {/* decorative dot grid, echoes the dotted connector line used elsewhere on the site */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.18]" preserveAspectRatio="none">
        <pattern id={`dots-${variant}`} width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill="#ffffff" />
        </pattern>
        <rect width="100%" height="100%" fill={`url(#dots-${variant})`} />
      </svg>
      {/* soft glow */}
      <div
        className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle, rgba(79,179,166,0.4), transparent 70%)" }}
      />

      <div className="relative h-full w-full flex items-center justify-center">
        <span className="flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/20">
          <svg viewBox="0 0 24 24" fill="none" className="w-9 h-9 text-canvas">
            {variant === "basic" && (
              <>
                <path
                  d="M6 3h9l3 3v15H6V3z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
                <path d="M15 3v3h3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                <path
                  d="M9 12.5l2 2 4-4.5"
                  stroke="var(--accent-soft)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            )}
            {variant === "pro" && (
              <>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
                <path
                  d="M8 12.5l2.5 2.5L16.5 9"
                  stroke="var(--accent-soft)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              </>
            )}
            {variant === "custom" && (
              <>
                <path
                  d="M4 20V9l8-6 8 6v11"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
                <path d="M4 20h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <rect x="9" y="12" width="6" height="8" stroke="var(--accent-soft)" strokeWidth="1.6" />
              </>
            )}
            {variant === "customPro" && (
              <>
                <path
                  d="M3 12l4-4 4 3 4-3 4 3v3l-4 4-3-2-3 2-4-3z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="6" r="2" stroke="var(--accent-soft)" strokeWidth="1.6" />
              </>
            )}
          </svg>
        </span>
      </div>
    </div>
  );
}

const PLANS = [
  {
    num: "01",
    name: "Basic",
    tagline: "If you already have your supplier.",
    art: "basic" as const,
    features: [
      "Contact Suppliers",
      "Payment Assistance",
      "Receiving Products",
      "Counting Quantity",
    ],
    featured: false,
  },
  {
    num: "02",
    name: "Pro",
    tagline: "If you don't have a supplier yet.",
    art: "pro" as const,
    features: [
      "Product Categorization",
      "Supplier Sourcing",
      "Competitive Price Negotiation",
      "Supplier Verification",
    ],
    featured: true,
  },
  {
    num: "03",
    name: "Custom",
    tagline: "Bundled solutions, quoted case-to-case.",
    art: "custom" as const,
    features: [
      "Tailor-Made Sourcing Solutions",
      "Import & Logistics Support",
      "Payment Routing & Support",
      "Shipment Consolidation",
    ],
    featured: false,
  },
  {
    num: "04",
    name: "Custom Pro",
    tagline: "For clients travelling to source themselves.",
    art: "customPro" as const,
    features: [
      "Business Travel Assistance",
      "Supplier Audits & Verification",
      "Language & Communication Support",
      "Supplier & Factory Meeting Coordination",
    ],
    featured: false,
  },
];

export default function Plans({ hideHeading = false }: { hideHeading?: boolean }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".plans-mark", {
        opacity: 0,
        x: -30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".plans-mark", start: "top 85%" },
      });

      gsap.from(".plans-heading .split-line > span", {
        yPercent: 110,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".plans-heading", start: "top 85%" },
      });

      gsap.from(".plans-sub", {
        opacity: 0,
        y: 16,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".plans-sub", start: "top 90%" },
      });

      gsap.utils.toArray<HTMLElement>(".plan-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          duration: 0.9,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%" },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="plans"
      ref={root}
      className="relative bg-canvas pt-16 pb-32 md:pt-20 md:pb-48 px-6 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        {!hideHeading && (
          <>
            <div className="plans-mark flex items-center gap-4 mb-10 justify-center">
              <span className="font-mono text-sm text-accent"></span>
              <span className="hairline w-24" />
              <span className="text-xs uppercase tracking-[0.3em] text-ink-soft">
                Our Services
              </span>
              <span className="hairline w-24" />
            </div>

            <h2 className="plans-heading font-display font-light leading-[1.05] text-4xl md:text-6xl text-center max-w-3xl mx-auto mb-8">
              <span className="split-line">
                <span>Four ways to source,</span>
              </span>
              <span className="split-line">
                <span>
                  one <span className="font-semibold text-accent">accountable</span> desk.
                </span>
              </span>
            </h2>

            <p className="plans-sub text-center max-w-xl mx-auto text-ink-soft leading-relaxed mb-20 md:mb-24">
              Pick the plan that matches where you are in the sourcing journey,
              from a supplier-in-hand check to a full on-the-ground sourcing desk.
            </p>
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
          {PLANS.map((plan) => (
            <div
              key={plan.num}
              className={
                "plan-card relative rounded-3xl overflow-hidden border flex flex-col " +
                (plan.featured
                  ? "border-accent shadow-[0_20px_50px_rgba(32,57,74,0.18)] lg:-translate-y-4"
                  : "border-line")
              }
            >
              {plan.featured && (
                <div className="absolute top-0 left-0 right-0 z-10 bg-accent text-canvas text-center text-[11px] uppercase tracking-[0.2em] py-2">
                  Most Popular
                </div>
              )}

              <div className={"relative aspect-[4/3] " + (plan.featured ? "mt-8" : "")}>
                <PlanArt variant={plan.art} />
              </div>

              <div className="flex-1 flex flex-col p-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  Plan {plan.num}
                </span>
                <h3 className="font-display text-2xl font-semibold text-ink mt-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-ink-soft mt-1 mb-5">{plan.tagline}</p>

                <div className="hairline mb-5" />

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink-soft">
                      <svg
                        viewBox="0 0 20 20"
                        fill="none"
                        className="w-4 h-4 mt-0.5 shrink-0 text-accent"
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
                  className={
                    "flex items-center justify-center gap-2 rounded-full py-3.5 text-xs uppercase tracking-[0.2em] transition-colors duration-300 " +
                    (plan.featured
                      ? "bg-accent text-canvas hover:bg-ink"
                      : "border border-line text-ink hover:border-ink")
                  }
                >
                  Enquire ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
