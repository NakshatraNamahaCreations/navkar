"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FOUNDERS = [
  {
    name: "Parshwa Shah",
    role: "Founder",
    years: "16+",
    field: "Garment, fashion accessories & consumer goods",
    paragraphs: [
      "Parshwa Shah founded Navkar Sourcing with a clear vision: to simplify global sourcing and make it more reliable, transparent, and accessible for businesses of all sizes. Having witnessed the challenges companies face in identifying trustworthy manufacturers, ensuring consistent product quality, and managing international procurement, he established Navkar Sourcing as a dependable sourcing partner that businesses can trust.",
      "With 16+ years of entrepreneurial experience in the garment, fashion accessories, and consumer goods industries, Parshwa brings a deep understanding of manufacturing, supplier management, procurement, and international trade. His strategic approach, combined with a strong commitment to quality, integrity, and customer satisfaction, enables clients to source confidently while building resilient supply chains.",
      "Parshwa believes that successful sourcing goes beyond transactions. It is about building lasting relationships that create value for both clients and manufacturing partners.",
    ],
  },
  {
    name: "Monty M Mehta",
    role: "Co-Founder",
    years: "17+",
    field: "Steel Manufacturing, Alloy & Ferrous Material, Industrial Machinery & AI Automation Expert",
    paragraphs: [
      "As Co-Founder, Monty Mehta plays a pivotal role in strengthening industrial supplier partnerships, driving business development, and ensuring exceptional client experiences throughout the sourcing journey with technical expertise.",
      "With 17+ years of entrepreneurial experience in the steel processing, trading, and manufacturing industry, Monty possesses extensive expertise in manufacturing operations, industrial automations, intelligent systems, material negotiations, procurement, and project execution. His practical business acumen and solution-oriented mindset help clients navigate the complexities of global sourcing with confidence.",
      "Committed to transparency, operational efficiency, and long-term collaboration, Monty works closely with suppliers and customers alike to deliver high-quality products, competitive pricing, and seamless procurement experiences.",
    ],
  },
];

export default function FoundersSection() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".founder-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.9,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      });

      gsap.from(".commitment-heading .split-line > span", {
        yPercent: 110,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".commitment-heading", start: "top 88%" },
      });

      gsap.from(".commitment-fade", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".commitment-heading", start: "top 88%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      {/* founders */}
      <section className="relative bg-canvas py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-6xl mx-auto flex flex-col gap-16 md:gap-24">
          {FOUNDERS.map((f, i) => (
            <article
              key={f.name}
              className={`founder-card flex flex-col md:flex-row gap-8 md:gap-14 items-start ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="w-full md:w-[280px] shrink-0">
                <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-accent-soft to-accent flex items-center justify-center shadow-[0_30px_60px_-24px_rgba(32,57,74,0.45)]">
                  <span className="font-display text-7xl font-black text-canvas/90">
                    {f.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div className="mt-5 flex items-center gap-4 text-center md:text-left justify-center md:justify-start">
                  <span className="font-mono text-3xl font-bold text-accent">
                    {f.years}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-ink-soft leading-snug max-w-[9rem]">
                    Years of entrepreneurial experience
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <span className="inline-flex items-center rounded-full border border-line px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-accent mb-4">
                  {f.role}
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mb-2">
                  {f.name}
                </h2>
                <p className="text-sm uppercase tracking-[0.15em] text-ink-soft mb-6">
                  {f.field}
                </p>
                <div className="flex flex-col gap-4">
                  {f.paragraphs.map((p, pi) => (
                    <p
                      key={pi}
                      className="text-sm md:text-base text-ink-soft leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* our commitment */}
      <section className="relative overflow-hidden bg-ink py-24 md:py-32 px-6 md:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/cargo-ship-sailing-ocean.jpg')" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-ink/55"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/25"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 w-[50rem] h-[50rem] rounded-full bg-[radial-gradient(circle,rgba(79,179,166,0.14),transparent_70%)] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="w-full max-w-4xl h-[26rem] rounded-full bg-ink/55 blur-3xl" />
        </div>

        <div
          className="relative z-10 max-w-3xl mx-auto text-center mb-16"
          style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
        >
          <span className="commitment-fade inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-accent-soft mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-soft" />
            Our Commitment
          </span>

          <h2 className="commitment-heading font-display font-bold leading-[1.1] text-3xl md:text-5xl text-canvas mb-6">
            <span className="split-line block overflow-hidden">
              <span className="block">
                Together, over{" "}
                <span className="text-accent-soft">33 years</span>
              </span>
            </span>
            <span className="split-line block overflow-hidden">
              <span className="block">of combined experience.</span>
            </span>
          </h2>

          <p className="commitment-fade text-sm md:text-base text-canvas/90 leading-relaxed max-w-2xl mx-auto">
            Parshwa Shah and Monty Mehta bring expertise across consumer
            goods, fashion, industrial manufacturing, and global procurement.
            Their shared mission is simple: to help businesses source
            smarter, reduce supply chain risks, and build sustainable growth
            through trusted manufacturing partnerships.
          </p>

          <p className="commitment-fade mt-5 text-sm md:text-base text-canvas/90 leading-relaxed max-w-2xl mx-auto">
            Today, Navkar Global Sourcing serves as a reliable bridge between
            global buyers and verified manufacturers, delivering sourcing
            solutions that emphasize quality, transparency, efficiency, and
            long-term value. At Navkar Global Sourcing, we don&apos;t just
            connect businesses with suppliers. We build partnerships that
            drive lasting success.
          </p>
        </div>
      </section>
    </div>
  );
}
