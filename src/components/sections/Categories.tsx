"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pexels = (id: number, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const ROW_1 = [
  { label: "Toys", sub: "Bricks, plush & RC", src: "/toys.webp" },
  { label: "Clothing", sub: "Apparel & finishing", src: pexels(18699670) },
  { label: "Jewellery", sub: "Fashion & fine stone", src: "/WhatsApp Image 2026-08-01 at 18.24.25.jpeg" },
  { label: "Furniture", sub: "Wood & upholstery", src: "/WhatsApp Image 2026-08-01 at 18.35.28.jpeg" },
  { label: "Accessories", sub: "Leather & silver", src: "/accessories.webp" },
  { label: "Electronics", sub: "Consumer & OEM", src: "/WhatsApp Image 2026-08-01 at 18.35.27.jpeg" },
];

const ROW_2 = [
  { label: "Machinery", sub: "Industrial & vehicles", src: "/WhatsApp Image 2026-08-01 at 18.35.52.jpeg" },
  { label: "Home Decor", sub: "Interiors & gifting", src: "/WhatsApp Image 2026-08-01 at 18.35.29.jpeg" },
  { label: "Footwear & Bags", sub: "Leather & performance", src: "/WhatsApp Image 2026-08-01 at 18.36.53.jpeg" },
  { label: "Stationery", sub: "Paper & desk supply", src: "/stationary.webp" },
  { label: "Hardware", sub: "Fasteners & tools", src: "/hardware.webp" },
  { label: "Other", sub: "Custom & niche requests", src: pexels(3862627) },
];

function Card({
  label,
  sub,
  src,
}: {
  label: string;
  sub: string;
  src: string;
}) {
  return (
    <article className="category-card group relative shrink-0 overflow-hidden rounded-2xl w-[210px] sm:w-[260px] aspect-[5/4] bg-canvas-deep shadow-[0_10px_30px_-15px_rgba(14,31,28,0.35)]">
      <img
        src={src}
        alt={label}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover brightness-[1.06] saturate-[1.05] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.12]"
      />
      {/* gradient only occupies the bottom third, so the rest of the photo
          stays bright and true to color instead of looking dim overall —
          strong enough right behind the text to keep it legible on any image */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-ink/90 via-ink/35 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <p className="text-[13px] sm:text-[15px] font-semibold text-white tracking-tight [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]">
          {label}
        </p>
        <p className="text-[11px] text-white/85 [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">{sub}</p>
      </div>
    </article>
  );
}

export type MarqueeRowHandle = { step: (dir: 1 | -1) => void };

const MarqueeRow = forwardRef<
  MarqueeRowHandle,
  { items: typeof ROW_1; direction: "left" | "right"; speed: number }
>(function MarqueeRow({ items, direction, speed }, ref) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const distanceRef = useRef(0);
  const manualRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const distance = track.scrollWidth / 2;
    distanceRef.current = distance;
    const tween = gsap.fromTo(
      track,
      { x: direction === "left" ? 0 : -distance },
      {
        x: direction === "left" ? -distance : 0,
        duration: speed,
        ease: "none",
        repeat: -1,
      },
    );
    tweenRef.current = tween;

    const onEnter = () => tween.pause();
    const onLeave = () => {
      if (!manualRef.current) tween.resume();
    };
    track.addEventListener("mouseenter", onEnter);
    track.addEventListener("mouseleave", onLeave);

    return () => {
      tween.kill();
      track.removeEventListener("mouseenter", onEnter);
      track.removeEventListener("mouseleave", onLeave);
    };
  }, [direction, speed]);

  // "forward" always means advancing along this row's own configured
  // direction, not a fixed screen direction — the two rows drift opposite
  // ways on purpose, so a shared pair of arrows steps each one along its
  // own path rather than both visually the same way
  useImperativeHandle(ref, () => ({
    step(dir) {
      const track = trackRef.current;
      const distance = distanceRef.current;
      if (!track || !distance) return;

      if (!manualRef.current) {
        manualRef.current = true;
        tweenRef.current?.pause();
      }

      const rowDir = direction === "left" ? 1 : -1;
      const card = track.firstElementChild as HTMLElement | null;
      const cardStep = card ? card.getBoundingClientRect().width + 16 : 260;
      const current = Number(gsap.getProperty(track, "x"));
      let next = current - dir * rowDir * cardStep;
      if (next <= -distance) next += distance;
      if (next > 0) next -= distance;

      gsap.to(track, { x: next, duration: 0.5, ease: "power3.out", overwrite: true });
    },
  }));

  return (
    <div className="overflow-hidden">
      <div ref={trackRef} className="flex w-max gap-3 sm:gap-4">
        {[...items, ...items].map((item, i) => (
          <Card key={`${item.label}-${i}`} {...item} />
        ))}
      </div>
    </div>
  );
});

export default function Categories({ hideHeading = false }: { hideHeading?: boolean } = {}) {
  const root = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<MarqueeRowHandle>(null);
  const row2Ref = useRef<MarqueeRowHandle>(null);

  const step = (dir: 1 | -1) => {
    row1Ref.current?.step(dir);
    row2Ref.current?.step(dir);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap.from(".categories-eyebrow, .categories-heading, .categories-copy", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });

      gsap.from(".categories-rows", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="categories"
      ref={root}
      className="relative overflow-hidden bg-canvas py-24 md:py-32"
    >
      {!hideHeading && (
        <div className="relative z-10 max-w-2xl mx-auto text-center mb-14 md:mb-16 px-6 md:px-10">
          <span className="categories-eyebrow inline-flex items-center rounded-full border border-line bg-canvas px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-ink-soft">
            What we source
          </span>
          <h2 className="categories-heading font-display font-bold leading-[1.05] text-4xl md:text-6xl text-ink mt-5 mb-5">
            Categories <span className="text-accent">we cater to.</span>
          </h2>
          <p className="categories-copy text-ink-soft text-base md:text-lg leading-relaxed">
            From everyday essentials to specialized products, Navkar Global
            Sourcing connects you with verified manufacturers, competitive
            pricing, and dedicated quality inspection at every stage.
          </p>
        </div>
      )}

      <div className="relative z-10 flex items-center justify-end gap-2 max-w-[90rem] mx-auto px-6 md:px-10 mb-3 sm:mb-4">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous categories"
          className="w-9 h-9 rounded-full border border-ink/15 flex items-center justify-center text-ink hover:bg-ink hover:text-canvas hover:border-ink transition-colors duration-300"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next categories"
          className="w-9 h-9 rounded-full border border-ink/15 flex items-center justify-center text-ink hover:bg-ink hover:text-canvas hover:border-ink transition-colors duration-300"
        >
          →
        </button>
      </div>

      <div className="categories-rows relative z-10 flex flex-col gap-3 sm:gap-4">
        <MarqueeRow ref={row1Ref} items={ROW_1} direction="left" speed={38} />
        <MarqueeRow ref={row2Ref} items={ROW_2} direction="right" speed={32} />
      </div>

    </section>
  );
}
