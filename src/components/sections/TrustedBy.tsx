"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "18+", label: "Years of Experience" },
  { value: "600+", label: "Audited Manufacturers" },
  { value: "5K+", label: "Units Shipped Annually" },
  { value: "10+", label: "Countries Served" },
];

const PILLARS = [
  {
    tag: "Vision",
    kicker: "Where We're Headed",
    text: "To become a trusted Global Sourcing Partner that makes international sourcing simple, transparent, and accessible for every business from startups to global enterprises through reliable sourcing solutions and long-term manufacturing partnerships.",
  },
  {
    tag: "Mission",
    kicker: "Why We Exist",
    text: "To provide reliable, transparent, and end-to-end sourcing solutions by connecting businesses with verified manufacturers, optimizing procurement costs, maintaining uncompromising quality standards, and delivering exceptional customer service throughout every stage of the procurement journey. As a trusted Global Sourcing Company, we are committed to creating lasting value for our clients.",
  },
];

export default function TrustedBy() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".trusted-eyebrow", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
      gsap.from(".trusted-headline-word", {
        opacity: 0,
        y: -80,
        duration: 0.9,
        stagger: 0.08,
        ease: "bounce.out",
        scrollTrigger: {
          trigger: ".trusted-headline",
          start: "top 85%",
          toggleActions: "restart none none reset",
        },
      });
      gsap.from(".trusted-cta", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
      gsap.from(".trusted-stat", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
      gsap.from(".trusted-pillar-eyebrow", {
        opacity: 0,
        y: 16,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".trusted-pillars", start: "top 85%" },
      });
      gsap.from(".trusted-pillar-heading", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".trusted-pillars", start: "top 85%" },
      });
      gsap.from(".trusted-pillar-intro", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".trusted-pillars", start: "top 85%" },
      });
      gsap.utils.toArray<HTMLElement>(".trusted-pillar-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".trusted-pillars", start: "top 85%" },
        });
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="about" ref={root} className="relative bg-canvas py-20 md:py-28 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="trusted-eyebrow flex items-center gap-3 mb-8 md:mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="text-xs uppercase tracking-[0.3em] text-ink-soft">
            About Us
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <h2 className="trusted-headline font-display text-5xl sm:text-6xl md:text-7xl font-black leading-[0.95] text-ink flex flex-wrap gap-x-[0.25em]">
            {["Your", "Reliable", "Global", "Sourcing", "Partner"].map((word, i) => (
              <span key={i} className="inline-block overflow-hidden align-top">
                <span className="trusted-headline-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <div>
            <p className="font-display text-2xl md:text-3xl font-light leading-[1.3] text-ink mb-6">
              Helping Businesses Source Smarter with Confidence
            </p>

            <p className="trusted-copy text-sm md:text-base leading-relaxed text-ink-soft">
              Finding a reliable supplier and ensuring smooth production can
              be challenging.{" "}
              <span className="text-accent">
                Navkar Global Sourcing
              </span>{" "}
              is a trusted Global Sourcing Partner and Global Sourcing Company
              that manages the complete sourcing process, from supplier
              identification to final product delivery. Backed by a Verified
              Supplier Network and End-to-End Procurement solutions, we help
              businesses source with confidence while making global sourcing
              easier, safer, and more transparent.
            </p>

            <a
              href="#why-choose-us"
              className="trusted-cta mt-8 inline-flex items-center gap-3 rounded-full bg-ink text-canvas pl-6 pr-2 py-2 text-sm font-medium hover:bg-ink/90 transition-colors duration-300"
            >
              Know More About Us
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-canvas text-ink">
                →
              </span>
            </a>
          </div>
        </div>

        <div className="mt-16 md:mt-20 pt-10 md:pt-12 border-t border-line grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="trusted-stat text-left">
              <p className="font-display text-4xl md:text-6xl font-black text-ink">
                {s.value}
              </p>
              <p className="mt-2 text-xs md:text-sm uppercase tracking-[0.15em] text-ink-soft leading-snug">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="trusted-pillars w-full max-w-6xl mx-auto mt-16 md:mt-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span className="trusted-pillar-eyebrow inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-ink-soft mb-4">
              [ 04 &middot; Our Purpose ]
            </span>
            <h2 className="trusted-pillar-heading font-display text-4xl sm:text-5xl md:text-6xl font-black leading-[0.95] text-ink">
              Vision &amp;
              <br />
              Mission
            </h2>
          </div>
          <p className="trusted-pillar-intro text-sm md:text-base text-ink-soft leading-relaxed max-w-xs md:text-right">
            The intent behind every shipment. This is what stands behind
            every partnership we build.
          </p>
        </div>

        <div className="trusted-pillar-grid grid md:grid-cols-2 gap-5 md:gap-6">
          {PILLARS.map((p, i) => (
            <div
              key={p.tag}
              className="trusted-pillar-card group relative rounded-2xl border border-[#d6e6f2] bg-[#eaf3fb] p-7 md:p-8 overflow-hidden transition-all duration-400 hover:-translate-y-1.5 hover:border-accent hover:shadow-[0_20px_50px_-15px_rgba(32,57,74,0.35)]"
            >
              <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_30%_0%,rgba(32,57,74,0.08),transparent_70%)]" />

              <span className="relative block font-mono text-xs text-accent mb-6">
                0{i + 1}
              </span>

              <h3 className="relative font-display text-2xl md:text-3xl font-bold text-ink mb-3">
                {p.tag}
              </h3>

              <p className="relative text-sm md:text-base leading-relaxed text-ink-soft mb-6">
                {p.text}
              </p>

              <span className="relative text-[11px] uppercase tracking-[0.2em] text-ink-soft/60">
                {p.kicker}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
