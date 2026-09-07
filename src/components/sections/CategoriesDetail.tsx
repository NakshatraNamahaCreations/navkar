"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pexels = (id: number, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const CATEGORIES = [
  {
    label: "Toys",
    sub: "Bricks, plush & RC",
    src: "/toys.webp",
    items: ["Building Bricks", "Plush Toys", "RC Vehicles", "Die-Cast Models", "Educational Toys", "Board Games"],
  },
  {
    label: "Clothing",
    sub: "Apparel & finishing",
    src: pexels(18699670),
    items: ["Knitwear", "Woven Apparel", "Activewear", "Kidswear", "Denim", "Garment Finishing"],
  },
  {
    label: "Jewellery",
    sub: "Fashion & fine stone",
    src: "/WhatsApp Image 2026-08-01 at 18.24.25.jpeg",
    items: ["Fashion Jewellery", "Fine Stone Setting", "Silver Jewellery", "Bridal Sets", "Earrings & Studs", "Bracelets & Chains"],
  },
  {
    label: "Furniture",
    sub: "Wood & upholstery",
    src: "/WhatsApp Image 2026-08-01 at 18.35.28.jpeg",
    items: ["Wooden Furniture", "Upholstered Seating", "Modular Storage", "Office Furniture", "Outdoor Furniture", "Flat-Pack Units"],
  },
  {
    label: "Accessories",
    sub: "Leather & silver",
    src: "/accessories.webp",
    items: ["Leather Goods", "Belts & Wallets", "Silver Accessories", "Sunglasses", "Watches", "Fashion Add-Ons"],
  },
  {
    label: "Electronics",
    sub: "Consumer & OEM",
    src: "/WhatsApp Image 2026-08-01 at 18.35.27.jpeg",
    items: ["Consumer Electronics", "OEM Components", "Home Appliances", "Audio Equipment", "Mobile Accessories", "Smart Devices"],
  },
  {
    label: "Machinery",
    sub: "Industrial & vehicles",
    src: "/WhatsApp Image 2026-08-01 at 18.35.52.jpeg",
    items: ["Industrial Machinery", "Power Tools", "Vehicle Parts", "Compressors & Generators", "Workshop Equipment", "Spare Parts"],
  },
  {
    label: "Home Decor",
    sub: "Interiors & gifting",
    src: "/WhatsApp Image 2026-08-01 at 18.35.29.jpeg",
    items: ["Wall Decor", "Lighting", "Vases & Planters", "Gifting Sets", "Textiles & Rugs", "Seasonal Decor"],
  },
  {
    label: "Footwear & Bags",
    sub: "Leather & performance",
    src: "/WhatsApp Image 2026-08-01 at 18.36.53.jpeg",
    items: ["Leather Footwear", "Performance Footwear", "Handbags", "Backpacks", "Travel Bags", "Sports Bags"],
  },
  {
    label: "Stationery",
    sub: "Paper & desk supply",
    src: "/stationary.webp",
    items: ["Paper Goods", "Desk Supplies", "Notebooks & Diaries", "Writing Instruments", "Printed Stationery", "Office Organizers"],
  },
  {
    label: "Hardware",
    sub: "Fasteners & tools",
    src: "/hardware.webp",
    items: ["Fasteners", "Hand Tools", "Power Tool Accessories", "Door & Cabinet Hardware", "Plumbing Fittings", "Safety Equipment"],
  },
  {
    label: "Other",
    sub: "Custom & niche requests",
    src: pexels(3862627),
    items: ["Custom Products", "Niche Categories", "Private Label", "Sample Development", "Seasonal Items", "Specialty Sourcing"],
  },
];

export default function CategoriesDetail() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cd-eyebrow, .cd-heading", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
      gsap.from(".cd-panel", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".cd-panel", start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cd-chip", {
        opacity: 0,
        y: 14,
        duration: 0.5,
        stagger: 0.05,
        ease: "power3.out",
      });
      gsap.from(".cd-photo-info", {
        opacity: 0,
        x: -16,
        duration: 0.6,
        ease: "power3.out",
      });
    }, root);
    return () => ctx.revert();
  }, [active]);

  const current = CATEGORIES[active];

  return (
    <section
      ref={root}
      className="relative bg-canvas py-20 md:py-28 px-6 md:px-10"
    >
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
        preserveAspectRatio="none"
      >
        <pattern id="cd-dots" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1.4" cy="1.4" r="1.4" fill="rgba(14,31,28,0.06)" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#cd-dots)" />
      </svg>

      <div className="relative z-10 max-w-[90rem] mx-auto">
        <div className="max-w-2xl mb-14 md:mb-16">
          <span className="cd-eyebrow inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-accent mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Inside Each Category
          </span>
          <h2 className="cd-heading font-display font-bold leading-[1.08] text-3xl md:text-5xl text-ink">
            What we source, <span className="text-accent">category by category.</span>
          </h2>
        </div>

        <div className="cd-panel grid md:grid-cols-[280px_1fr] gap-3 md:gap-4 items-start">
          {/* left rail: category selector */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 -mx-1 px-1 md:mx-0 md:px-0">
            {CATEGORIES.map((c, i) => (
              <button
                key={c.label}
                type="button"
                onClick={() => setActive(i)}
                className={`shrink-0 md:shrink flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-left transition-colors duration-300 ${
                  i === active
                    ? "bg-ink text-canvas"
                    : "bg-canvas-deep text-ink hover:bg-ink/5"
                }`}
              >
                <span className="whitespace-nowrap md:whitespace-normal">
                  <span className="block text-sm font-semibold">{c.label}</span>
                  <span
                    className={`hidden md:block text-[11px] mt-0.5 ${
                      i === active ? "text-canvas/60" : "text-ink-soft"
                    }`}
                  >
                    {c.sub}
                  </span>
                </span>
                <span
                  className={`hidden md:flex items-center justify-center w-6 h-6 rounded-full shrink-0 font-mono text-[10px] ${
                    i === active ? "bg-canvas/15 text-canvas" : "bg-ink/5 text-ink-soft"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>

          {/* right panel: inset thumbnail + info header, then sub-category chips */}
          <div className="relative overflow-hidden rounded-3xl bg-ink shadow-[0_35px_80px_-30px_rgba(14,31,28,0.5)] md:sticky md:top-28">
            <div key={active} className="cd-photo-info flex items-center gap-5 md:gap-7 p-5 md:p-7">
              <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-2xl overflow-hidden ring-1 ring-white/10 shrink-0">
                <img
                  src={current.src}
                  alt={current.label}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-center brightness-[1.02] saturate-[1.08]"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-accent-soft mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-soft" />
                  {current.sub}
                </span>
                <p className="font-display text-2xl md:text-4xl font-bold text-white tracking-tight">
                  {current.label}
                </p>
              </div>
              <span className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/20 font-mono text-sm text-white shrink-0">
                {String(active + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="bg-canvas-deep p-5 md:p-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px flex-1 bg-line" />
                <p className="text-[11px] uppercase tracking-[0.2em] text-ink-soft/70 shrink-0">
                  Sub-categories we source
                </p>
                <span className="h-px flex-1 bg-line" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {current.items.map((item, idx) => (
                  <div
                    key={`${active}-${item}`}
                    className="cd-chip group flex items-center gap-3.5 rounded-2xl border border-line bg-canvas px-4 py-3.5 transition-all duration-300 hover:border-accent/50 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-14px_rgba(20,40,50,0.3)]"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent text-xs font-mono font-semibold shrink-0 transition-colors duration-300 group-hover:bg-accent group-hover:text-canvas">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[13px] font-medium text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
