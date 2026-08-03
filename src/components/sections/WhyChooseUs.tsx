"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
  {
    num: "01",
    tag: "Reliable Supplier Network",
    title: "Reliable Supplier Network",
    copy: "As a trusted Global Sourcing Company, we provide access to a Verified Supplier Network of carefully selected manufacturers that match your product specifications, quality standards, and business requirements.",
  },
  {
    num: "02",
    tag: "End-to-End Sourcing Support",
    title: "End-to-End Sourcing Support",
    copy: "Our comprehensive Product Sourcing Services cover every stage of the sourcing journey from Supplier Identification and Supplier Verification Services to production coordination, Product Quality Inspection, Shipping & Logistics Services, and final delivery.",
  },
  {
    num: "03",
    tag: "Transparent Communication",
    title: "Transparent Communication",
    copy: "We believe successful sourcing is built on trust and transparency. Receive regular updates, clear reporting, and dedicated support throughout your procurement journey from our experienced Global Sourcing Partner team.",
  },
  {
    num: "04",
    tag: "Competitive Price Comparison",
    title: "Competitive Price Comparison",
    copy: "We obtain quotations from multiple suppliers, perform detailed Quotation Comparison, and negotiate the best commercial terms to help you achieve cost-effective sourcing solutions without compromising quality.",
  },
  {
    num: "05",
    tag: "Quality Assurance",
    title: "Quality Assurance",
    copy: "Our quality-focused approach includes Factory Audit Services, Production Monitoring, and Product Quality Inspection to ensure every product meets your specifications before shipment.",
  },
  {
    num: "06",
    tag: "Comprehensive Logistics Support",
    title: "Comprehensive Logistics Support",
    copy: "From shipping coordination and documentation to customs assistance and transportation, our End-to-End Sourcing Services ensure smooth, efficient, and timely product delivery worldwide.",
  },
];

export default function WhyChooseUs() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isMobile } = context.conditions as { isMobile: boolean };

        const ctx = gsap.context(() => {
          const cards = gsap.utils.toArray<HTMLElement>(".why-card");

          gsap.set(cards, { autoAlpha: 0, y: 60, scale: 0.96 });
          gsap.set(".why-heading", { autoAlpha: 1, filter: "blur(0px)" });

          if (isMobile) return;

          const introHold = 0.7; // heading blur-out
          const cardHold = 1; // each card fully visible, alone, for this long
          const fade = 0.35; // fade-in / fade-out transition either side of a hold

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: () => `+=${(introHold + cards.length * (cardHold + fade)) * 700}`,
              scrub: true,
              pin: ".why-pin",
              anticipatePin: 1,
            },
          });

          // heading holds briefly, then blurs and recedes as the cards begin
          tl.to(".why-heading", {
            filter: "blur(14px)",
            autoAlpha: 0.2,
            scale: 1.06,
            duration: introHold,
            ease: "power1.inOut",
          });

          let cursor = introHold;

          cards.forEach((card, i) => {
            // fade the previous card fully out before this one starts fading in,
            // so no two cards are ever legible at the same time
            if (i > 0) {
              tl.to(
                cards[i - 1],
                { autoAlpha: 0, scale: 0.94, y: -30, duration: fade, ease: "power1.in" },
                cursor
              );
            }

            tl.fromTo(
              card,
              { autoAlpha: 0, y: 60, scale: 0.96 },
              { autoAlpha: 1, y: 0, scale: 1, duration: fade, ease: "power2.out" },
              cursor
            );

            cursor += fade + cardHold;
          });

          // fade the last card out at the very end instead of leaving it stuck
          tl.to(cards[cards.length - 1], {
            autoAlpha: 0,
            scale: 0.94,
            y: -30,
            duration: fade,
            ease: "power1.in",
          });
        }, root);

        return () => ctx.revert();
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section id="why-choose-us" ref={root} className="relative bg-ink text-canvas">
      <div className="why-pin relative min-h-screen w-full overflow-hidden px-6 md:px-10">
        {/* giant background heading, each word staggered to its own corner —
            desktop-only: it's the backdrop for the pinned card sequence and
            has no mobile layout of its own, so it would otherwise render at
            full size/opacity and collide with the mobile stacked list */}
        <div className="why-heading absolute inset-0 pointer-events-none select-none hidden md:block">
          <span
            className="absolute top-40 md:top-48 left-6 md:left-10 font-display font-black uppercase leading-[0.85] text-canvas"
            style={{ fontSize: "clamp(3rem, 11vw, 10rem)" }}
          >
            Why
          </span>
          <span
            className="absolute top-1/2 -translate-y-1/2 right-6 md:right-10 font-display font-black uppercase leading-[0.85] text-canvas"
            style={{ fontSize: "clamp(3rem, 11vw, 10rem)" }}
          >
            Choose
          </span>
          <span
            className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 font-display font-black uppercase leading-[0.85] text-canvas"
            style={{ fontSize: "clamp(3rem, 11vw, 10rem)" }}
          >
            Us
          </span>
        </div>

        {/* intro copy + CTA, left side, matching "Why"'s left edge, in the
            gap between "Why" (top) and "Us" (bottom) */}
        <div className="why-intro absolute z-10 hidden md:block left-6 md:left-10 top-[19rem] md:top-[23rem] pointer-events-none" style={{ marginLeft: "9rem" }}>
          <div className="max-w-xs pointer-events-auto">
            <p className="text-sm text-canvas/75 leading-relaxed mb-5">
              Sourcing is nothing without execution. We build both. From
              factory audits to freight, we run the systems that get your
              products made and delivered.
            </p>
            <a
              href="#plans"
              className="inline-flex items-center gap-2 rounded-full bg-canvas text-ink px-5 py-2.5 text-[11px] uppercase tracking-[0.15em] font-medium hover:bg-accent-soft transition-colors duration-300"
            >
              Our Services ↗
            </a>
          </div>
        </div>

        {/* mobile: simple stacked list, no pin/blur animation */}
        <div className="relative z-10 w-full md:hidden py-24">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-sm text-accent-soft"></span>
            <span className="h-px flex-1 bg-canvas/15" />
            <span className="text-xs uppercase tracking-[0.3em] text-canvas/60">
              Why Choose Us
            </span>
          </div>
          <div className="flex flex-col gap-6">
            {REASONS.map((r) => (
              <div key={r.num} className="rounded-2xl bg-canvas/5 border border-canvas/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-sm text-accent-soft">{r.num}</span>
                  <span className="h-px flex-1 mx-4 bg-canvas/15" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-canvas mb-3">
                  {r.title}
                </h3>
                <p className="text-sm text-canvas/75 leading-relaxed">{r.copy}</p>
              </div>
            ))}
          </div>
        </div>

        {/* desktop: pinned card-overlap sequence */}
        <div className="hidden md:flex absolute inset-0 z-10 items-center justify-center pointer-events-none">
          {REASONS.map((r) => (
            <div
              key={r.num}
              className="why-card absolute w-full max-w-md rounded-2xl bg-canvas text-ink p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)] pointer-events-auto"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-xs uppercase tracking-[0.2em] text-accent">
                  Why Choose Navkar Global Sourcing
                </span>
                <span className="font-mono text-4xl font-semibold text-ink/10 shrink-0 ml-4">
                  {r.num}
                </span>
              </div>

              <h3 className="font-display text-2xl font-semibold text-ink mb-4 leading-snug">
                {r.title}
              </h3>

              <p className="text-sm text-ink-soft leading-relaxed border-t border-line pt-5">
                {r.copy}
              </p>
            </div>
          ))}
        </div>

        {/* eyebrow, top-left */}
        <div className="hidden md:flex absolute z-20 left-6 md:left-10 top-28 items-center gap-4">
          <span className="font-mono text-sm text-accent-soft"></span>
          <span className="h-px w-10 bg-canvas/25" />
          <span className="text-xs uppercase tracking-[0.3em] text-canvas/60">
            Why Choose Us
          </span>
        </div>
      </div>
    </section>
  );
}
