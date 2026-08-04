"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pexels = (id: number, w = 900) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const POSTS = [
  {
    tag: "Sourcing Strategy",
    date: "March 12, 2026",
    title: "How to Vet a Manufacturer Before You Place Your First Order",
    excerpt:
      "Choosing the wrong factory is the single most expensive mistake in global sourcing. Here's the verification checklist a Global Sourcing Company runs before any purchase order goes out — from business license checks to on-site factory audits.",
    src: pexels(3862627),
  },
  {
    tag: "Quality Control",
    date: "March 5, 2026",
    title: "What a Pre-Shipment Inspection Actually Checks",
    excerpt:
      "Product Quality Inspection isn't a single pass/fail stamp — it covers workmanship, function testing, packaging, and quantity verification. A breakdown of what happens on the factory floor before your goods are cleared to ship.",
    src: pexels(3846508),
  },
  {
    tag: "Procurement",
    date: "February 21, 2026",
    title: "MOQ Negotiation: What's Actually Flexible with Suppliers",
    excerpt:
      "Minimum order quantities are rarely as fixed as suppliers first quote. We break down the levers that move MOQ — tooling costs, off-season timing, and material batch sizes — and how a sourcing partner negotiates on your behalf.",
    src: pexels(3183197),
  },
  {
    tag: "Logistics",
    date: "February 10, 2026",
    title: "Sea Freight vs Air Freight: Choosing the Right Shipping Method",
    excerpt:
      "Freight mode affects your landed cost more than most importers realize. A practical comparison of transit time, cost per kilogram, and order-size thresholds to help you decide when air freight is actually worth the premium.",
    src: "/cargo-ship-sailing-ocean.jpg",
  },
  {
    tag: "Supplier Verification",
    date: "January 28, 2026",
    title: "Red Flags That Signal a Fraudulent or Unreliable Supplier",
    excerpt:
      "From mismatched company registration details to suspiciously low quotes, we outline the warning signs that separate legitimate manufacturers from trading companies posing as factories — and how supplier verification catches them early.",
    src: pexels(3184292),
  },
  {
    tag: "Featured",
    date: "January 14, 2026",
    title: "A Complete Guide to Landed Cost When Importing from China",
    excerpt:
      "The factory quote is never the full picture. This guide walks through every cost layer — freight, duties, customs clearance, and inland transport — so you can compare supplier quotes on a true apples-to-apples basis.",
    src: pexels(6694543),
  },
];

export default function BlogGrid() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".blog-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          delay: (i % 3) * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative bg-canvas py-16 md:py-24 px-6 md:px-10"
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.25em] text-accent mb-3">
          Browse and read the latest stuff
        </p>
        <h2 className="font-display font-bold leading-[1.05] text-3xl md:text-4xl text-ink mb-12 md:mb-16">
          Latest Stories
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {POSTS.map((p) => (
            <article key={p.title} className="blog-card group flex flex-col">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-5">
                <img
                  src={p.src}
                  alt={p.title}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover brightness-[1.02] saturate-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
              </div>

              <h3 className="font-display text-lg font-bold text-ink leading-snug mb-2 transition-colors duration-300 group-hover:text-accent">
                {p.title}
              </h3>

              <p className="text-[11px] uppercase tracking-[0.1em] text-ink-soft/70 mb-3">
                {p.date} &middot; {p.tag}
              </p>

              <p className="text-[13px] text-ink-soft leading-relaxed mb-4">
                {p.excerpt}
              </p>

              <div className="h-px bg-line mb-4" />

              <a
                href="/contact-us"
                className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] font-semibold text-accent hover:text-ink transition-colors duration-300"
              >
                Read More
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
