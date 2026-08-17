"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: "How does the sourcing process work with Navkar Global Sourcing?",
    a: "You share your product requirement: specifications, quantity, and target price. Our team identifies and verifies suitable manufacturers, collects and compares quotations, and manages the process through production, quality inspection, and shipping until your order reaches you.",
  },
  {
    q: "Is there a minimum order quantity (MOQ)?",
    a: "MOQ depends on the supplier and product category, not on us. Many factories have flexible MOQs based on material batch sizes and tooling costs, and we negotiate this on your behalf and let you know what's realistically achievable before you commit.",
  },
  {
    q: "How do you verify suppliers before recommending them?",
    a: "Every supplier is screened for business registration, production capability, and past performance. For larger orders, we can also arrange an on-site factory audit to confirm facilities, staffing, and quality control processes match what's claimed.",
  },
  {
    q: "How long does sourcing and production typically take?",
    a: "Supplier identification and quotation comparison usually take 1–2 weeks. Production timelines vary by product and order size, typically 20–45 days, followed by quality inspection and shipping. We'll give you a specific timeline once your requirement is scoped.",
  },
  {
    q: "Do you inspect products before they ship?",
    a: "Yes. We coordinate pre-shipment inspection covering workmanship, function testing, packaging, and quantity verification, so issues are caught at the factory rather than after the goods have left.",
  },
  {
    q: "What are the payment terms for an order?",
    a: "Payment terms are agreed per supplier and order, typically a deposit before production and the balance before or after shipment. We help you negotiate terms that protect you and route payments securely.",
  },
  {
    q: "Can you handle shipping and customs clearance?",
    a: "Yes. We manage freight booking, shipping documentation, and customs clearance support for both sea and air freight, coordinating door-to-door delivery so you don't have to manage multiple vendors.",
  },
  {
    q: "Which product categories do you source?",
    a: "We source across eleven core categories (toys, clothing, jewellery, furniture, accessories, electronics, machinery, home decor, footwear & bags, stationery, and hardware), each with its own vetted factory network.",
  },
];

export default function FAQ() {
  const root = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-eyebrow, .faq-heading", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });

      gsap.utils.toArray<HTMLElement>(".faq-item").forEach((item, i) => {
        gsap.from(item, {
          opacity: 0,
          y: 24,
          duration: 0.6,
          delay: i * 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 92%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden bg-canvas-deep py-20 md:py-28 px-6 md:px-10">
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
        preserveAspectRatio="none"
      >
        <pattern id="faq-dots" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1.4" cy="1.4" r="1.4" fill="rgba(14,31,28,0.06)" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#faq-dots)" />
      </svg>

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="text-center mb-14 md:mb-16">
          <span className="faq-eyebrow inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-accent mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            FAQ
          </span>
          <h2 className="faq-heading font-display font-bold leading-[1.08] text-3xl md:text-5xl text-ink">
            Frequently asked <span className="text-accent">questions.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.q}
                className={`faq-item rounded-2xl border transition-colors duration-300 ${
                  isOpen ? "border-accent/40 bg-white" : "border-line bg-white/60"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 md:px-6 py-5"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base md:text-lg font-semibold text-ink">
                    {item.q}
                  </span>
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 transition-all duration-300 ${
                      isOpen ? "bg-accent text-canvas rotate-45" : "bg-accent/10 text-accent"
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 md:px-6 pb-5 text-sm text-ink-soft leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
