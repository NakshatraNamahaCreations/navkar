"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const STEPS = [
  {
    title: "Client Enquiry",
    copy: "Share your product details, specifications, required quantity, target price, and delivery expectations. We'll source the right manufacturer and provide you with the best possible solution.",
    icon: "inquiry",
  },
  {
    title: "Requirement Review and Feasibility Assessment",
    copy: "We thoroughly analyze your requirements, assess sourcing feasibility, validate commercial viability, and develop the most efficient procurement strategy for your business.",
    icon: "analysis",
  },
  {
    title: "Supplier Identification",
    copy: "We carefully identify and verify manufacturers from China that align with your product specifications, quality standards, order quantity, and delivery requirements.",
    icon: "search",
  },
  {
    title: "Supplier Verification and Factory Audit",
    copy: "We thoroughly verify shortlisted suppliers and coordinate factory audits, when required, to assess their manufacturing capabilities, quality systems, compliance, and overall reliability—giving you confidence before placing an order.",
    icon: "shield",
  },
  {
    title: "Quotation Collection and Comparison",
    copy: "We collect quotations from shortlisted suppliers and perform a comprehensive comparison based on pricing, product specifications, quality, lead times, minimum order quantities (MOQs), and commercial terms to identify the best sourcing option.",
    icon: "compare",
  },
  {
    title: "Proposal Presentation to Client",
    copy: "We provide a comprehensive comparison of supplier options, pricing, delivery lead times, and commercial terms to help you select the best supplier.",
    icon: "doc",
  },
  {
    title: "Client Approval",
    copy: "You review the shortlisted supplier options and approve the preferred supplier based on pricing, quality, lead time, and commercial terms. Once approved, we proceed with order confirmation and supplier coordination.",
    icon: "check",
  },
  {
    title: "Price and Terms Negotiation",
    copy: "We negotiate with the selected supplier to secure the best possible pricing, favorable payment terms, appropriate packaging specifications, and optimized production timelines, ensuring a cost-effective and reliable sourcing outcome.",
    icon: "handshake",
  },
  {
    title: "Purchase Order Placement",
    copy: "Once you provide final approval of the product specifications, pricing, and commercial terms, we place the purchase order with the selected supplier and coordinate the production process to ensure timely execution.",
    icon: "cart",
  },
  {
    title: "Production Monitoring and Inspection",
    copy: "We closely monitor production progress, provide regular status updates, and coordinate quality inspections to ensure the products meet your specifications, quality standards, and delivery schedule before shipment.",
    icon: "gauge",
  },
  {
    title: "Shipping and Logistics",
    copy: "We coordinate end-to-end logistics, ensuring your goods are delivered safely, efficiently, and on schedule.",
    icon: "ship",
  },
  {
    title: "Final Delivery",
    copy: "Your products are delivered safely and on time to the agreed destination, completing a seamless end-to-end sourcing and logistics process with full coordination at every stage.",
    icon: "flag",
  },
];

function StepIcon({
  name,
  className,
  style,
}: {
  name: string;
  className?: string;
  style?: CSSProperties;
}) {
  const common = { className, style, viewBox: "0 0 24 24", fill: "none" as const, xmlns: "http://www.w3.org/2000/svg" };
  const stroke = { stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  switch (name) {
    case "inquiry":
      return (
        <svg {...common}>
          <path {...stroke} d="M4 5h16v11H8l-4 4V5z" />
          <path {...stroke} d="M8 9h8M8 12h5" />
        </svg>
      );
    case "analysis":
      return (
        <svg {...common}>
          <path {...stroke} d="M4 19h16M7 19V9m5 10V5m5 14v-7" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="10.5" cy="10.5" r="6.5" {...stroke} />
          <path {...stroke} d="M20 20l-5-5" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path {...stroke} d="M12 3l8 3v6c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V6l8-3z" />
          <path {...stroke} d="M9 12l2 2 4-4" />
        </svg>
      );
    case "compare":
      return (
        <svg {...common}>
          <path {...stroke} d="M7 3v18M17 3v18M4 8h6M14 16h6" />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <path {...stroke} d="M6 3h8l4 4v14H6V3z" />
          <path {...stroke} d="M14 3v4h4M9 12h6M9 16h6" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" {...stroke} />
          <path {...stroke} d="M8 12l3 3 5-6" />
        </svg>
      );
    case "handshake":
      return (
        <svg {...common}>
          <path {...stroke} d="M3 12l4-4 4 3 4-3 4 3v3l-4 4-3-2-3 2-4-3-2 2" />
        </svg>
      );
    case "flask":
      return (
        <svg {...common}>
          <path {...stroke} d="M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3" />
        </svg>
      );
    case "badge":
      return (
        <svg {...common}>
          <circle cx="12" cy="9" r="5" {...stroke} />
          <path {...stroke} d="M9 13.5L7 21l5-3 5 3-2-7.5" />
        </svg>
      );
    case "cart":
      return (
        <svg {...common}>
          <path {...stroke} d="M4 4h2l2.4 12.4a2 2 0 002 1.6h7.2a2 2 0 002-1.6L21 8H7" />
          <circle cx="10" cy="21" r="1.4" {...stroke} />
          <circle cx="18" cy="21" r="1.4" {...stroke} />
        </svg>
      );
    case "gauge":
      return (
        <svg {...common}>
          <path {...stroke} d="M4 15a8 8 0 1116 0" />
          <path {...stroke} d="M12 15l4-5" />
          <circle cx="12" cy="15" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "ship":
      return (
        <svg {...common}>
          <path {...stroke} d="M4 15l2 5h12l2-5-8-2-8 2z" />
          <path {...stroke} d="M11 13V4h2l3 4h-9" />
        </svg>
      );
    case "flag":
      return (
        <svg {...common}>
          <path {...stroke} d="M6 3v18" />
          <path {...stroke} d="M6 4h12l-3 4 3 4H6" />
        </svg>
      );
    default:
      return null;
  }
}

const MARQUEE_PX_PER_SEC = 34;

export default function Process() {
  const root = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // the track's content is the step list rendered twice back-to-back; once
    // scrollLeft passes the width of a single copy, snap back by that width
    // so the loop reads as continuous with no visible jump
    let setWidth = 0;
    const measure = () => {
      setWidth = track.scrollWidth / 2;
    };
    measure();
    window.addEventListener("resize", measure);

    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      if (last === 0) last = now;
      const dt = (now - last) / 1000;
      last = now;

      if (!pausedRef.current && setWidth > 0) {
        track.scrollLeft += MARQUEE_PX_PER_SEC * dt;
        if (track.scrollLeft >= setWidth) {
          track.scrollLeft -= setWidth;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const pause = () => {
      pausedRef.current = true;
    };
    const resume = () => {
      pausedRef.current = false;
    };
    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);
    track.addEventListener("touchstart", pause, { passive: true });
    track.addEventListener("touchend", resume);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
      track.removeEventListener("touchstart", pause);
      track.removeEventListener("touchend", resume);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".process-heading .split-line > span", {
        yPercent: 110,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".process-heading", start: "top 85%" },
      });

      gsap.from(".process-eyebrow", {
        opacity: 0,
        y: 12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".process-eyebrow", start: "top 85%" },
      });

      gsap.utils.toArray<HTMLElement>(".process-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: (i % 6) * 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 92%" },
        });
      });

      // the dotted trail only exists behind the ship — it draws in as the
      // ship sails, rather than being fully visible up front. A solid
      // stroke traced along the same curve inside an SVG <mask> gets the
      // classic "draw-on" treatment (dasharray = its own length, offset
      // animated from full-length to 0); wherever that mask stroke has
      // been drawn, the dotted path beneath it becomes visible.
      const flowPath = ".process-flow-path";
      const revealStroke = ".process-flow-reveal-stroke";
      const revealEl = root.current?.querySelector<SVGPathElement>(revealStroke);
      const pathLength = revealEl?.getTotalLength() ?? 1200;

      gsap.set(revealStroke, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // the ship sails the full voyage left-to-right, very slowly, drawing
      // the dotted trail in behind it, then dips below the waterline
      // (fades + sinks) before the next ship fades back in at the dock — a
      // soft cross-fade "reset" instead of a hard teleport-back. No
      // "align": the hull stays level rather than tilting to the curve's
      // tangent, since a ship isn't a directional arrow.
      const voyage = gsap.timeline({ repeat: -1 });

      voyage
        .set(".process-flow-ship", { opacity: 0 })
        .set(".process-flow-ship", {
          motionPath: { path: flowPath, start: 0, end: 0 },
        })
        .set(revealStroke, { strokeDashoffset: pathLength })
        .to(".process-flow-ship", { opacity: 1, duration: 1, ease: "power1.out" }, 0.15)
        .to(
          ".process-flow-ship",
          {
            motionPath: { path: flowPath, start: 0, end: 1 },
            duration: 16,
            ease: "power1.inOut",
          },
          0
        )
        .to(
          revealStroke,
          { strokeDashoffset: 0, duration: 16, ease: "power1.inOut" },
          0
        )
        .to(
          ".process-flow-ship",
          { opacity: 0, duration: 1, ease: "power1.in" },
          "-=1.1"
        )
        .to(flowPath, { opacity: 0, duration: 1, ease: "power1.in" }, "-=1.1")
        .set(flowPath, { opacity: 1 });

      // gentle bob + sway on the hull, riding small swells
      gsap.to(".process-flow-ship-bob", {
        y: -4,
        rotate: 2.5,
        duration: 1.9,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // wake trail streaming out behind the hull, pulsing gently
      gsap.to(".process-flow-wake", {
        opacity: 0.85,
        scaleX: 1.3,
        transformOrigin: "100% 50%",
        duration: 1.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".process-flow-head", {
        opacity: 0.5,
        duration: 1,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const scrollByCards = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    pausedRef.current = true;
    track.scrollBy({ left: dir * 320, behavior: "smooth" });
    window.setTimeout(() => {
      pausedRef.current = false;
    }, 900);
  };

  return (
    <section id="process" ref={root} className="relative bg-[#eef0f0] pt-16 pb-32 md:pt-20 md:pb-40">
      <div className="max-w-[1600px] mx-auto px-6 md:px-14">
        {/* headline + eyebrow + nav arrows */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-16 md:mb-20">
          <h2 className="process-heading font-display font-light leading-[1.05] text-5xl md:text-7xl max-w-xl">
            <span className="split-line">
              <span>How We</span>
            </span>
            <span className="split-line">
              <span>
                <span className="font-semibold text-accent">Work</span> Together
              </span>
            </span>
          </h2>

          <div className="flex flex-col items-start md:items-end gap-6 md:pt-3">
            <div className="process-eyebrow flex items-start gap-3 md:max-w-[240px] text-left md:text-right">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
              <p className="text-xs uppercase tracking-[0.2em] text-ink-soft leading-relaxed">
                For the accountable handling of every order
              </p>
            </div>

            {/* nav arrows, top-right above the cards */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => scrollByCards(-1)}
                aria-label="Previous steps"
                className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-ink hover:border-ink transition-colors duration-300"
              >
                ←
              </button>
              <button
                onClick={() => scrollByCards(1)}
                aria-label="Next steps"
                className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-ink hover:border-ink transition-colors duration-300"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* horizontal drag/scroll carousel */}
        <div className="relative">
          <div
            ref={trackRef}
            className="process-track flex gap-4 md:gap-5 overflow-x-auto pb-8 -mx-6 px-6 md:-mx-10 md:px-10"
            style={{ scrollbarWidth: "none" }}
          >
            {[...STEPS, ...STEPS].map((s, i) => (
              <div
                key={`${s.title}-${i}`}
                className="process-card shrink-0 w-[260px] md:w-[280px] rounded-2xl bg-white p-6 flex flex-col shadow-[0_4px_24px_rgba(14,31,28,0.08)]"
              >
                <div className="w-9 h-9 rounded-full bg-[#eef0f0] flex items-center justify-center mb-6 text-ink">
                  <StepIcon name={s.icon} className="w-4.5 h-4.5" />
                </div>
                <h3 className="font-display text-base font-semibold text-ink leading-snug mb-3">
                  {String((i % STEPS.length) + 1).padStart(2, "0")}. {s.title}
                </h3>
                <p className="text-sm text-ink-soft leading-relaxed">{s.copy}</p>
              </div>
            ))}
          </div>

          {/* connecting arrow flourish beneath the row: flowing dashes, a
              cargo ship sailing the same curve left to right leaving a
              wake trail, and a soft pulse on the arrowhead */}
          <svg
            className="process-flow-arrow hidden md:block w-full h-16 -mt-2 text-ink/40 overflow-visible"
            viewBox="0 0 1200 40"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <filter id="process-ship-shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="1.5" stdDeviation="1.6" floodColor="#0e1f1c" floodOpacity="0.28" />
              </filter>
              {/* reveal mask: a solid stroke traced along the same curve,
                  "drawn on" via strokeDasharray/strokeDashoffset in lockstep
                  with the ship — only the portion under this white stroke
                  shows the dotted path beneath it */}
              <mask id="process-flow-reveal" maskUnits="userSpaceOnUse">
                <path
                  className="process-flow-reveal-stroke"
                  d="M20 8 Q 600 44 1140 12"
                  stroke="#fff"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                />
              </mask>
            </defs>

            <path
              className="process-flow-path"
              d="M20 8 Q 600 44 1140 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="2 7"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              mask="url(#process-flow-reveal)"
            />

            <g className="process-flow-ship">
              {/* wake streak trailing behind the hull, tapering to a point */}
              <path
                className="process-flow-wake"
                d="M-30 0 Q -14 5 0 0 Q -14 -3.5 -30 0 Z"
                fill="var(--accent-soft)"
                opacity="0.5"
              />
              <g className="process-flow-ship-bob" filter="url(#process-ship-shadow)">
                <image
                  href="/cargo-ship.png"
                  x="-20"
                  y="-20"
                  width="40"
                  height="40"
                  preserveAspectRatio="xMidYMid meet"
                />
              </g>
            </g>

            <path
              className="process-flow-head"
              d="M1124 2 L1148 11 L1126 22"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>

      <style jsx>{`
        .process-track::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
