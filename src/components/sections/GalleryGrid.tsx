"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// masonry-style tiles, mixed sizes for visual rhythm instead of a flat
// uniform grid — reuses the same real category photography already on
// the site rather than stock placeholders
const TILES = [
  { label: "Toys", src: "/toys.webp", span: "row-span-2" },
  { label: "Jewellery", src: "/WhatsApp Image 2026-08-01 at 18.24.25.jpeg", span: "" },
  { label: "Furniture", src: "/WhatsApp Image 2026-08-01 at 18.35.28.jpeg", span: "" },
  { label: "Electronics", src: "/WhatsApp Image 2026-08-01 at 18.35.27.jpeg", span: "row-span-2" },
  { label: "Accessories", src: "/accessories.webp", span: "" },
  { label: "Machinery", src: "/WhatsApp Image 2026-08-01 at 18.35.52.jpeg", span: "" },
  { label: "Home Decor", src: "/WhatsApp Image 2026-08-01 at 18.35.29.jpeg", span: "row-span-2" },
  { label: "Footwear & Bags", src: "/WhatsApp Image 2026-08-01 at 18.36.53.jpeg", span: "" },
  { label: "Stationery", src: "/stationary.webp", span: "" },
  { label: "Hardware", src: "/hardware.webp", span: "" },
];

export default function GalleryGrid() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gallery-tile").forEach((tile, i) => {
        gsap.from(tile, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          delay: (i % 5) * 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: tile, start: "top 92%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative bg-ink py-20 md:py-28 px-6 md:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 auto-rows-[140px] md:auto-rows-[160px] gap-3 md:gap-4">
        {TILES.map((t) => (
          <div
            key={t.label}
            className={`gallery-tile group relative rounded-2xl overflow-hidden ${t.span}`}
          >
            <img
              src={t.src}
              alt={t.label}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <span className="absolute inset-x-0 bottom-0 p-3 md:p-4 text-[13px] md:text-sm font-semibold text-canvas opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
              {t.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
