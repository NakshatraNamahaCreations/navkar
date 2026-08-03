"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AUDIENCES = [
  {
    label: "Startups",
    icon: (
      <path
        d="M12 3l2.4 5.1L20 9.3l-4 4 1 5.6L12 16.6 7 18.9l1-5.6-4-4 5.6-1.2L12 3z"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Manufacturers",
    icon: <path d="M4 20V10l5 3V10l5 3V6l6 4v10H4z" strokeLinejoin="round" />,
  },
  {
    label: "Retailers",
    icon: (
      <path
        d="M4 8l1.5-4h13L20 8M4 8h16M4 8v11h16V8M9 12v4M15 12v4"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Distributors",
    icon: (
      <path
        d="M3 7h6l2 3h10M3 7v10h4M11 10v10h10V10M3 17h4M7 7v3"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Importers",
    icon: (
      <path
        d="M12 3v12m0 0l-4-4m4 4l4-4M4 15v4a2 2 0 002 2h12a2 2 0 002-2v-4"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Corporate Procurement Teams",
    icon: (
      <path
        d="M4 21V9l8-5 8 5v12M4 21h16M9 21v-6h6v6M9 12h.01M15 12h.01M12 12h.01M9 9h.01M15 9h.01"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Trading Companies",
    icon: <path d="M3 17l6-6 4 4 8-8M21 7v6M21 7h-6" strokeLinejoin="round" />,
  },
  {
    label: "Private Label Brands",
    icon: (
      <path
        d="M12 2l1.8 3.6L18 6l-3 3.3.7 4.2L12 11.8 8.3 13.5 9 9.3 6 6l4.2-.4L12 2zM6 21h12"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "E-commerce Businesses",
    icon: (
      <path
        d="M3 4h2l2.4 12.4a2 2 0 002 1.6h8.2a2 2 0 002-1.6L21 8H6M9 21a1 1 0 100-2 1 1 0 000 2zM18 21a1 1 0 100-2 1 1 0 000 2z"
        strokeLinejoin="round"
      />
    ),
  },
];

const ICON_STROKE = 1.6;

export default function WhoWeWorkWith() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".wwww-eyebrow", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });

      gsap.from(".wwww-heading .split-line > span", {
        yPercent: 110,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".wwww-heading", start: "top 85%" },
      });

      gsap.from(".wwww-sub", {
        opacity: 0,
        y: 16,
        duration: 0.8,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".wwww-sub", start: "top 88%" },
      });

      // entrance sweeps across the whole 3-col grid (row-major stagger),
      // each card popping its badge in with a spin that settles fully back
      // to 0deg, then the connector draws out, then the pill slides in
      const cards = gsap.utils.toArray<HTMLElement>(".wwww-card");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ".wwww-grid", start: "top 88%" },
        onComplete: () => {
          // belt-and-braces: force every badge back to a clean, untransformed
          // rest state before the idle float takes over, so back.out()'s
          // overshoot can never leave a badge stuck mid-rotation
          gsap.set(".wwww-badge", { clearProps: "transform" });
          startIdleFloat();
        },
      });

      cards.forEach((card, i) => {
        const badge = card.querySelector(".wwww-badge");
        const connector = card.querySelector(".wwww-connector");
        const pill = card.querySelector(".wwww-pill");
        const at = i * 0.12;

        tl.from(
          badge,
          {
            opacity: 0,
            scale: 0.3,
            rotation: -140,
            duration: 0.65,
            ease: "back.out(1.6)",
          },
          at
        )
          .from(
            connector,
            { scaleX: 0, duration: 0.3, ease: "power1.out" },
            at + 0.35
          )
          .from(
            pill,
            { opacity: 0, x: -18, duration: 0.45, ease: "power3.out" },
            at + 0.4
          );
      });

      // gentle continuous float on the icon badges once settled, so the
      // grid doesn't feel static after the entrance finishes — vertical
      // bob only (no rotation), started fresh after the entrance timeline
      // fully completes so it never overlaps/fights the entrance tween
      function startIdleFloat() {
        gsap.utils.toArray<HTMLElement>(".wwww-badge").forEach((badge, i) => {
          gsap.to(badge, {
            y: "+=7",
            duration: 2.4 + (i % 4) * 0.3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: i * 0.1,
          });
        });
      }

      // per-card hover: badge scales/glows, pill border brightens and the
      // whole unit nudges toward the icon — reusing the same elements, no
      // extra DOM needed
      cards.forEach((card) => {
        const badge = card.querySelector<HTMLElement>(".wwww-badge");
        const pill = card.querySelector<HTMLElement>(".wwww-pill");
        if (!badge || !pill) return;

        const onEnter = () => {
          gsap.to(badge, {
            scale: 1.12,
            boxShadow:
              "0 8px 0 0 rgba(0,0,0,0.18), 0 16px 32px -6px rgba(79,179,166,0.65)",
            duration: 0.4,
            ease: "power3.out",
            overwrite: "auto",
          });
          gsap.to(pill, {
            x: 4,
            borderColor: "rgba(79,179,166,0.95)",
            backgroundColor: "rgba(79,179,166,0.1)",
            duration: 0.35,
            ease: "power3.out",
            overwrite: "auto",
          });
        };
        const onLeave = () => {
          gsap.to(badge, {
            scale: 1,
            boxShadow:
              "0 8px 0 0 rgba(0,0,0,0.18), 0 10px 24px -4px rgba(32,57,74,0.55)",
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto",
          });
          gsap.to(pill, {
            x: 0,
            borderColor: "rgba(79,179,166,0.7)",
            backgroundColor: "rgba(242,246,245,0.06)",
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto",
          });
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        (card as HTMLElement & { _wwwwCleanup?: () => void })._wwwwCleanup =
          () => {
            card.removeEventListener("mouseenter", onEnter);
            card.removeEventListener("mouseleave", onLeave);
          };
      });
    }, root);

    return () => {
      gsap.utils
        .toArray<HTMLElement & { _wwwwCleanup?: () => void }>(".wwww-card")
        .forEach((card) => card._wwwwCleanup?.());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-ink py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10"
    >
      {/* container-ship photo backdrop, dimmed just enough that the
          existing white text / teal badges stay fully legible while the
          photo itself is still clearly visible */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('/056d78fbebb11592a47452b8c65250b3.jpg')" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/95 via-ink/60 to-ink/95"
      />

      {/* ambient teal glows, echoing the logo's gradient and the rest of the site */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[46rem] h-[46rem] rounded-full bg-[radial-gradient(circle,rgba(79,179,166,0.16),transparent_70%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 w-[26rem] h-[26rem] rounded-full bg-[radial-gradient(circle,rgba(32,57,74,0.18),transparent_70%)] blur-2xl"
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center mb-10 sm:mb-14 md:mb-16">
        <div className="wwww-eyebrow flex items-center gap-2 sm:gap-4 mb-5 sm:mb-6 justify-center">
          <span className="hidden sm:block h-px w-16 bg-canvas/15" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-canvas/50 whitespace-nowrap">
            Who We Work With
          </span>
          <span className="hidden sm:block h-px w-16 bg-canvas/15" />
        </div>

        <h2 className="wwww-heading font-display font-black leading-[1.15] sm:leading-[1.1] text-[1.75rem] sm:text-4xl md:text-5xl mb-4 sm:mb-6 px-2">
          <span className="split-line block overflow-hidden">
            <span className="block text-canvas">Sourcing Solutions</span>
          </span>
          <span className="split-line block overflow-hidden">
            <span className="block bg-gradient-to-r from-accent-soft to-accent bg-clip-text text-transparent">
              for Every Business
            </span>
          </span>
        </h2>

        <p className="wwww-sub text-[13px] sm:text-sm md:text-base text-canvas/60 leading-relaxed px-2">
          At Navkar Global Sourcing, we provide reliable sourcing solutions
          for businesses of all sizes across a wide range of industries.
          Whether you&apos;re launching a new product, expanding your supply
          chain, or sourcing from China, we help you connect with verified
          manufacturers and simplify the procurement process.
        </p>
      </div>

      <p className="relative z-10 text-center text-xs sm:text-sm uppercase tracking-[0.2em] text-canvas/50 mb-6 sm:mb-8">
        We Work With:
      </p>

      <div className="wwww-grid relative z-10 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-5 sm:gap-y-8 gap-x-6 md:gap-x-8">
        {AUDIENCES.map((a) => (
          <div
            key={a.label}
            className="wwww-card flex items-center gap-1.5 sm:gap-2 md:gap-3 cursor-default"
          >
            <span className="wwww-badge relative shrink-0 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] rounded-full bg-gradient-to-br from-accent-soft to-accent text-canvas shadow-[0_6px_0_0_rgba(0,0,0,0.18),0_8px_18px_-4px_rgba(32,57,74,0.55)] sm:shadow-[0_8px_0_0_rgba(0,0,0,0.18),0_10px_24px_-4px_rgba(32,57,74,0.55)] ring-[3px] sm:ring-4 ring-ink z-10">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={ICON_STROKE}
                strokeLinecap="round"
                className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8"
              >
                {a.icon}
              </svg>
            </span>

            <span
              aria-hidden
              className="wwww-connector h-px w-3 sm:w-5 md:w-7 border-t-2 border-dashed border-accent-soft/70 shrink-0"
            />

            <span className="wwww-pill relative flex-1 min-w-0 border border-accent-soft/70 border-l-0 rounded-full rounded-l-none bg-canvas/[0.06] px-3.5 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3.5 text-xs sm:text-[13px] md:text-sm font-semibold text-canvas leading-snug">
              {a.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
