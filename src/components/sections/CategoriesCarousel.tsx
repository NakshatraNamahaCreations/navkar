"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pexels = (id: number, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const CATEGORIES = [
  { label: "Toys", sub: "Bricks, plush & RC", src: "/toys.webp" },
  { label: "Clothing", sub: "Apparel & finishing", src: pexels(18699670) },
  { label: "Jewellery", sub: "Fashion & fine stone", src: "/WhatsApp Image 2026-08-01 at 18.24.25.jpeg" },
  { label: "Furniture", sub: "Wood & upholstery", src: "/WhatsApp Image 2026-08-01 at 18.35.28.jpeg" },
  { label: "Accessories", sub: "Leather & silver", src: "/accessories.webp" },
  { label: "Electronics", sub: "Consumer & OEM", src: "/WhatsApp Image 2026-08-01 at 18.35.27.jpeg" },
  { label: "Machinery", sub: "Industrial & vehicles", src: "/WhatsApp Image 2026-08-01 at 18.35.52.jpeg" },
  { label: "Home Decor", sub: "Interiors & gifting", src: "/WhatsApp Image 2026-08-01 at 18.35.29.jpeg" },
  { label: "Footwear & Bags", sub: "Leather & performance", src: "/WhatsApp Image 2026-08-01 at 18.36.53.jpeg" },
  { label: "Stationery", sub: "Paper & desk supply", src: "/stationary.webp" },
  { label: "Hardware", sub: "Fasteners & tools", src: "/hardware.webp" },
];

export default function CategoriesCarousel() {
  const root = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const distance = track.scrollWidth / 2;
    const tween = gsap.fromTo(
      track,
      { x: 0 },
      { x: -distance, duration: 42, ease: "none", repeat: -1 }
    );

    return () => {
      tween.kill();
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cat-eyebrow, .cat-heading, .cat-caption", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
      gsap.from(".cat-stage", {
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".cat-stage", start: "top 88%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-canvas-deep py-24 md:py-32 px-6 md:px-10"
    >
      <div className="relative z-10 max-w-[90rem] mx-auto">
        <div className="cat-stage relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-20">
          <div ref={trackRef} className="flex w-max">
            {[...CATEGORIES, ...CATEGORIES].map((c, i) => {
              return (
                <div
                  key={`${c.label}-${i}`}
                  className="shrink-0 px-3 md:px-4 w-[220px] sm:w-[260px] md:w-[300px]"
                >
                  <article className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-canvas shadow-[0_25px_50px_-20px_rgba(14,31,28,0.4)]">
                    <img
                      src={c.src}
                      alt={c.label}
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover brightness-[1.04] saturate-[1.05]"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent"
                    />

                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/70 [text-shadow:0_1px_4px_rgba(0,0,0,0.5)] mb-1.5">
                        {c.sub}
                      </p>
                      <p className="font-display text-xl font-bold text-white tracking-tight [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
                        {c.label}
                      </p>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          {/* edge fades so cards dissolve into the background instead of hard-cutting */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-canvas-deep to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-canvas-deep to-transparent"
          />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <span className="cat-eyebrow inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-accent mb-5 justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            What We Source
          </span>
          <p className="cat-caption text-xs text-ink-soft/70 mb-3">
            Behind every category there are vetted factories. Real partners.
          </p>
          <h2 className="cat-heading font-display font-bold leading-[1.15] text-2xl md:text-4xl text-ink">
            Eleven categories, one sourcing desk
            <br className="hidden sm:block" /> that brings them to life.
          </h2>
        </div>
      </div>
    </section>
  );
}
