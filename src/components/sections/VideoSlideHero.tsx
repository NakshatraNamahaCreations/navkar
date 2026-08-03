"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SLIDES = [
  {
    kicker: "Global Product Sourcing Studio",
    titleParts: ["Shaping", "the future of", "global sourcing."],
    description:
      "At Navkar Global Sourcing, we help businesses source high-quality products at competitive prices from China. As a trusted Global Sourcing Company, we provide reliable Product Sourcing Services that cover every stage of procurement from supplier identification and quotation comparison to quality assurance, Shipping & Logistics Services, and timely delivery ensuring a seamless and efficient sourcing experience.",
    primaryCta: "Start Your Enquiry",
    secondaryCta: "Explore Services",
    video: "/videos/12028871_1920_1080_24fps.mp4",
  },
  {
    kicker: "From Factory Floor to Your Shelf",
    titleParts: ["Sourcing Excellence,", "Delivering", "Globally"],
    description:
      "Navkar Global Sourcing is a trusted Global Sourcing Company connecting businesses with verified manufacturers and suppliers worldwide. As an experienced China Sourcing Company, we simplify international procurement through transparent sourcing, dependable supplier management, and efficient Global Sourcing Solutions, ensuring quality, reliability, and on-time delivery for every project.",
    primaryCta: "Find a Supplier",
    secondaryCta: "View Our Process",
    video: "/videos/step-04-verification.mp4",
  },
  {
    kicker: "18 Years of Sourcing Relationships",
    titleParts: ["Empowering Businesses", "Through", "Smart Sourcing"],
    description:
      "Partner with Navkar Global Sourcing, a reliable Global Sourcing Company, to unlock global sourcing opportunities. We help businesses source quality products from verified manufacturers in China through comprehensive Supplier Verification Services, Product Quality Inspection, competitive price negotiation, and End-to-End Sourcing Services, delivering a smooth procurement journey from factory to destination.",
    primaryCta: "Discuss Your Requirement",
    secondaryCta: "Contact Our Team",
    video: "/videos/step-13-shipping.mp4",
  },
];

const AUTO_ADVANCE_MS = 7000;
const COLUMN_BOUNDS = [0, 32, 65, 100]; // percent splits: 3 columns
const COLUMN_SLIDE_MS = 700;
const COLUMN_STAGGER_MS = 160;
const TRANSITION_MS =
  COLUMN_SLIDE_MS + COLUMN_STAGGER_MS * (COLUMN_BOUNDS.length - 1);

export default function VideoSlideHero() {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [entered, setEntered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitionRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    setActive((current) => {
      const next = ((index % SLIDES.length) + SLIDES.length) % SLIDES.length;
      if (next === current) return current;
      setPrevious(current);
      if (transitionRef.current) clearTimeout(transitionRef.current);
      transitionRef.current = setTimeout(() => setPrevious(null), TRANSITION_MS);
      return next;
    });
  }, []);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(next, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, next]);

  useEffect(() => {
    return () => {
      if (transitionRef.current) clearTimeout(transitionRef.current);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-ink text-canvas"
    >
      <div className="relative h-full w-full overflow-hidden">
        {/* every slide keeps a single, permanently-mounted <video> so it never
            reloads/reflickers; stacking order alone decides what's visible */}
        {SLIDES.map((slide, i) => {
          const isActive = i === active;
          const isOutgoing = i === previous;
          if (!isActive && !isOutgoing) return null;

          return (
            <div key={slide.video} className="absolute inset-0" style={{ zIndex: isActive ? 1 : 0 }}>
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={slide.video}
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(14,31,28,0.85)_10%,rgba(14,31,28,0.35)_50%,rgba(14,31,28,0.15)_100%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(14,31,28,0.85)_0%,rgba(14,31,28,0.1)_35%,rgba(14,31,28,0.05)_60%,rgba(14,31,28,0.55)_100%)]" />
            </div>
          );
        })}

        {/* transition curtains: solid panels over the incoming slide, one per
            column, that rise up and off the top on a stagger to reveal the
            single shared video underneath, as if it's rising from below */}
        {previous !== null &&
          COLUMN_BOUNDS.slice(0, -1).map((start, colIndex) => {
            const end = COLUMN_BOUNDS[colIndex + 1];
            const delay = colIndex * COLUMN_STAGGER_MS;

            return (
              <div
                key={colIndex}
                className="absolute inset-y-0"
                style={{
                  left: `${start}%`,
                  width: `${end - start}%`,
                  zIndex: 2,
                  backgroundColor: "var(--ink)",
                  animation: `hero-curtain-up ${COLUMN_SLIDE_MS}ms cubic-bezier(0.76,0,0.24,1) ${delay}ms both`,
                }}
              />
            );
          })}

        {/* vertical column dividers */}
        {COLUMN_BOUNDS.slice(1, -1).map((pos) => (
          <div
            key={pos}
            className="hidden md:block absolute top-0 bottom-0 z-10 w-px bg-canvas/25 pointer-events-none"
            style={{ left: `${pos}%` }}
          />
        ))}

        <style jsx>{`
          @keyframes hero-curtain-up {
            from {
              transform: translateY(0%);
            }
            to {
              transform: translateY(-100%);
            }
          }
        `}</style>

        <p className="absolute top-28 md:top-32 right-6 md:right-10 z-10 text-[11px] uppercase tracking-[0.3em] text-canvas/60 text-right max-w-[220px]">
          {SLIDES[active].kicker}
        </p>

        {/* headline: left-aligned block, stacked onto 3 lines */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-center px-6 md:px-10 pt-36 md:pt-40 h-[62%] md:h-[65%]">
          <h1 className="max-w-2xl font-display font-semibold leading-[1.05] text-[11vw] md:text-[3.6vw] overflow-hidden">
            {SLIDES[active].titleParts.map((part, i) => (
              <span key={i} className="block overflow-hidden">
                <span
                  className="block transition-transform duration-700 ease-out"
                  style={{
                    transform: entered ? "translateY(0%)" : "translateY(110%)",
                    transitionDelay: `${i * 350}ms`,
                  }}
                >
                  {part}
                </span>
              </span>
            ))}
          </h1>
        </div>

        {/* bottom-left: counter + arrows */}
        <div className="absolute bottom-6 md:bottom-8 left-6 md:left-10 z-10 flex items-center gap-3">
          <span className="font-mono text-xs text-canvas/70 tracking-[0.15em]">
            {String(active + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="w-8 h-8 rounded-full border border-canvas/40 flex items-center justify-center text-canvas hover:bg-canvas hover:text-ink transition-colors duration-300"
            >
              ←
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="w-8 h-8 rounded-full border border-canvas/40 flex items-center justify-center text-canvas hover:bg-canvas hover:text-ink transition-colors duration-300"
            >
              →
            </button>
          </div>
        </div>

        {/* bottom-right: caption + read more, kept clear of the floating
            chat widget (and its hover tooltip) which also anchors to this corner */}
        <div className="absolute bottom-24 md:bottom-28 right-6 md:right-10 z-10 max-w-[260px] md:max-w-[400px] text-right hidden sm:block">
          <p className="text-xs md:text-sm text-canvas/75 leading-relaxed mb-2">
            {SLIDES[active].description}
          </p>
          <button
            onClick={() =>
              document.getElementById("process")?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-[11px] uppercase tracking-[0.2em] text-accent-soft hover:text-canvas transition-colors duration-300"
          >
            {SLIDES[active].secondaryCta} →
          </button>
        </div>

        {/* slide progress dashes */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.video}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="relative h-[3px] flex-1 bg-canvas/20 overflow-hidden"
            >
              <span
                className="absolute inset-y-0 left-0 bg-accent-soft"
                style={{
                  width: i === active ? "100%" : "0%",
                  transition:
                    i === active
                      ? `width ${AUTO_ADVANCE_MS}ms linear`
                      : "width 300ms ease-out",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
