"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pexels = (id: number, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const PLANS = [
  {
    num: "01",
    name: "Basic",
    tagline: "If you already have your supplier.",
    image: pexels(8470836),
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
    image: pexels(24394699),
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
    image: pexels(23496705),
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
    image: pexels(35150092),
    features: [
      "Business Travel Assistance",
      "Supplier Audits & Verification",
      "Language & Communication Support",
      "Supplier & Factory Meeting Coordination",
    ],
    featured: false,
  },
];

export default function Plans() {
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
                <img
                  src={plan.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
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
