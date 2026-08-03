"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// all 17 challenges fan out from the box like spokes, each at its own
// angle and radius, hand-placed to mirror the reference: two arcs
// sweeping up and out to left/right, a couple sitting close above the
// lid, positions given as {x,y} offsets from the box's centre
let delayCounter = 0;
const nextDelay = () => {
  delayCounter += 0.06;
  return delayCounter;
};

// three concentric arcs (3 / 6 / 8 tags) converging on the box opening.
// Positions are pre-computed on true circles with a spacing "safety"
// factor so every pill's actual rotated bounding box (150x34 + 12px pad)
// clears every other pill's — verified with zero overlaps, not just
// centre-to-centre distance, before hard-coding these values
const RAW_TAGS = [
  { label: "Fraudulent Suppliers", x: -174, y: -43, rot: -21 },
  { label: "Hidden Costs", x: 0, y: -154, rot: 0 },
  { label: "MOQ — Minimum Order Quantity", x: 174, y: -43, rot: 21 },
  { label: "Ever-Changing Regulations", x: -333, y: 22, rot: -28 },
  { label: "Quality Control Processes", x: -280, y: -156, rot: -17 },
  { label: "Negotiating Payment Terms", x: -108, y: -269, rot: -6 },
  { label: "Complex Logistics", x: 109, y: -269, rot: 6 },
  { label: "Legitimacy Of Potential Suppliers", x: 281, y: -156, rot: 17 },
  { label: "Customs & Compliance", x: 334, y: 22, rot: 28 },
  { label: "Inconsistent Product Quality", x: -506, y: -26, rot: -28 },
  { label: "Cultural & Language Barriers", x: -446, y: -204, rot: -20 },
  { label: "Communication Breakdowns", x: -305, y: -343, rot: -12 },
  { label: "Managing Lead Times", x: -108, y: -421, rot: -4 },
  { label: "Your Intellectual Property Rights", x: 109, y: -421, rot: 4 },
  { label: "Optimising Cost-Efficiency", x: 305, y: -343, rot: 12 },
  { label: "Product Sampling & Development", x: 446, y: -204, rot: 20 },
  { label: "Finding Reliable Suppliers", x: 506, y: -26, rot: 28 },
];

const BOX_TAGS = RAW_TAGS.map((t) => ({ ...t, delay: nextDelay() }));

export default function Challenges() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".challenges-heading .split-line > span", {
        yPercent: 110,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".challenges-heading", start: "top 85%" },
      });

      gsap.from(".challenges-sub", {
        opacity: 0,
        y: 16,
        duration: 0.8,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".challenges-sub", start: "top 88%" },
      });

      // mobile (<768px): the radial "explosion" layout below relies on
      // pills flying out up to ±500px from centre, which cannot fit a
      // phone-width viewport — swap in a simple wrapped-grid fade/slide-in
      // instead of the burst animation entirely. Own markup, own classes,
      // so this never touches (or is touched by) the desktop burst below.
      const isMobile =
        typeof window !== "undefined" && window.innerWidth < 768;

      if (isMobile) {
        gsap.from(".box-cube-mobile", {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: ".box-scene-mobile", start: "top 85%" },
        });

        gsap.from(".box-tag-mobile", {
          opacity: 0,
          y: 24,
          duration: 0.5,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: ".box-tags-mobile", start: "top 90%" },
        });

        return;
      }

      // phase 1: a closed box drops/settles in (squashed flat so it reads
      // shut). phase 2: it "pops" open (flaps unsquash + glow blooms).
      // phase 3: each tag erupts out one-by-one from the opening, along
      // its own path to its scattered resting spot.
      const boxTl = gsap.timeline({
        scrollTrigger: { trigger: ".box-scene", start: "top 65%" },
      });

      boxTl
        .fromTo(
          ".box-cube",
          { y: 40, scaleY: 0.55, scaleX: 0.92, opacity: 0, transformOrigin: "50% 100%" },
          { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" }
        )
        .to(".box-cube", {
          scaleY: 1,
          scaleX: 1,
          duration: 0.5,
          ease: "back.out(2.2)",
        })
        .fromTo(
          ".box-glow",
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
          "<"
        );

      gsap.utils.toArray<HTMLElement>(".box-tag").forEach((tag, i) => {
        const data = BOX_TAGS[i];
        if (!data) return;
        boxTl.fromTo(
          tag,
          { opacity: 0, x: 0, y: 30, rotate: 0, scale: 0.2 },
          {
            opacity: 1,
            x: data.x,
            y: data.y,
            rotate: data.rot,
            scale: 1,
            duration: 0.45,
            ease: "back.out(1.7)",
          },
          i === 0 ? "+=0.1" : "-=0.32"
        );
      });

      // tags bob gently once settled
      gsap.utils.toArray<HTMLElement>(".box-tag-bob").forEach((tag, i) => {
        gsap.to(tag, {
          y: "+=8",
          duration: 2.4 + (i % 4) * 0.3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 2 + i * 0.1,
        });
      });

      // large background wordmark drifts slowly for a parallax feel
      gsap.to(".challenges-watermark", {
        xPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // mesh blobs drift continuously
      gsap.to(".mesh-a", {
        x: 80,
        y: 40,
        duration: 16,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(".mesh-b", {
        x: -70,
        y: -50,
        duration: 19,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(".mesh-c", {
        x: 50,
        y: -30,
        duration: 14,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, root);

    // magnetic drag-and-tilt on hover — the pill leans and slides a few
    // pixels toward the cursor as it moves across it, and springs back
    // with an elastic snap on mouse-leave. Runs on raw DOM listeners
    // (outside gsap.context) since it's driven by pointer position, not
    // scroll/timeline state.
    const pills = Array.from(root.current?.querySelectorAll<HTMLElement>(".box-tag-drag") ?? []);
    const cleanups: Array<() => void> = [];

    pills.forEach((drag) => {
      const pill = drag.querySelector<HTMLElement>(".box-tag-pill");
      const text = drag.querySelector<HTMLElement>(".box-tag-text");
      if (!pill || !text) return;

      const onMove = (e: MouseEvent) => {
        const rect = drag.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(drag, {
          x: px * 22,
          y: py * 16,
          rotateZ: px * 6,
          duration: 0.5,
          ease: "power3.out",
        });
        gsap.to(pill, {
          rotateX: -py * 14,
          rotateY: px * 14,
          scale: 1.14,
          boxShadow:
            "0 10px 20px -6px rgba(32,57,74,0.4), 0 28px 52px -14px rgba(32,57,74,0.42)",
          duration: 0.4,
          ease: "power3.out",
          transformPerspective: 500,
        });
        gsap.to(pill, { "--tw-ring-color": "rgba(32,57,74,0.45)", duration: 0.3 });
        gsap.to(text, { color: "#20394a", duration: 0.3 });
      };

      const onLeave = () => {
        gsap.to(drag, {
          x: 0,
          y: 0,
          rotateZ: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.45)",
        });
        gsap.to(pill, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          boxShadow:
            "0 4px 10px -2px rgba(14,31,28,0.15), 0 16px 32px -10px rgba(14,31,28,0.28)",
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        });
        gsap.to(pill, { "--tw-ring-color": "rgba(0,0,0,0.04)", duration: 0.4 });
        gsap.to(text, { color: "#0e1f1c", duration: 0.4 });
      };

      drag.addEventListener("mousemove", onMove);
      drag.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        drag.removeEventListener("mousemove", onMove);
        drag.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => {
      ctx.revert();
      cleanups.forEach((off) => off());
    };
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-white py-28 md:py-36 px-6 md:px-10"
    >
      {/* animated gradient mesh */}
      <div className="mesh-a absolute -top-20 left-[8%] w-[34rem] h-[34rem] rounded-full bg-[radial-gradient(circle,rgba(32,57,74,0.14),transparent_70%)] pointer-events-none blur-2xl" />
      <div className="mesh-b absolute top-1/3 right-[5%] w-[28rem] h-[28rem] rounded-full bg-[radial-gradient(circle,rgba(79,179,166,0.16),transparent_70%)] pointer-events-none blur-2xl" />
      <div className="mesh-c absolute bottom-0 left-1/3 w-[26rem] h-[26rem] rounded-full bg-[radial-gradient(circle,rgba(32,57,74,0.1),transparent_70%)] pointer-events-none blur-2xl" />

      {/* giant faint watermark word, parallax-drifting */}
      <div className="challenges-watermark absolute top-8 md:top-16 left-0 right-0 overflow-hidden pointer-events-none select-none">
        <p
          className="font-display font-black uppercase text-ink/[0.035] whitespace-nowrap leading-none"
          style={{ fontSize: "clamp(6rem, 18vw, 16rem)" }}
        >
          Challenges Challenges Challenges
        </p>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* header */}
        <div className="max-w-2xl mx-auto text-center mb-16 md:mb-20">
          <h2 className="challenges-heading font-display font-bold leading-[1.05] text-4xl md:text-6xl text-ink mb-6">
            <span className="split-line">
              <span>
                Common Challenges{" "}
                <span className="italic font-semibold text-accent">we Solve.</span>
              </span>
            </span>
          </h2>

          <p className="challenges-sub text-sm md:text-base text-ink-soft leading-relaxed">
            Every shipment carries the same recurring anxieties. That&apos;s
            exactly the weight we take off your desk.
          </p>
        </div>

        {/* box scene — tags erupt out of the closed box in a tight,
            dramatic cone, directly on the section's white canvas.
            Desktop/tablet only: the burst radius (up to ±500px) can't fit
            a phone viewport, so mobile gets its own wrapped-grid layout
            below instead of a scaled-down version of this. */}
        <div
          className="box-scene relative mx-auto mb-2 md:mb-4 hidden md:block w-full"
          style={{
            height: "clamp(420px, 32vw, 520px)",
            maxWidth: "1280px",
            perspective: "1400px",
          }}
        >
          {/* soft glow beneath the box */}
          <div
            className="box-glow absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full pointer-events-none opacity-0"
            style={{
              background:
                "radial-gradient(circle, rgba(32,57,74,0.14) 0%, rgba(79,179,166,0.06) 45%, transparent 72%)",
            }}
          />

          {/* whole cluster (tags + box), positioned relative to this
              wrapper's own centre so it aligns with the section's centre —
              keeps the already-verified zero-overlap relative layout */}
          <div className="absolute inset-0">
            {/* erupting tags, absolutely centered then translated to their
                burst position. The outer .box-tag div owns the eruption
                transform (x/y/rotate/scale); the inner .box-tag-bob div
                owns the idle bob so the two animations never fight over
                the same transform */}
            {BOX_TAGS.map((tag, i) => (
              <div
                key={tag.label}
                className="box-tag absolute left-1/2 opacity-0 hover:!z-[999]"
                style={{ top: "88%", marginLeft: "-5rem", marginTop: "-0.95rem", width: "10rem", zIndex: 20 + i }}
              >
                <div className="box-tag-bob">
                  {/* .box-tag-drag is the element the mousemove handler
                      pushes around (magnetic drag) and .box-tag-pill inside
                      it owns the hover scale/shadow/ring — kept on separate
                      elements so the two transforms never fight, same fix
                      pattern as the eruption vs idle-bob split above */}
                  <div
                    className="box-tag-drag"
                    style={{ willChange: "transform", transformStyle: "preserve-3d" }}
                  >
                    <div
                      className="box-tag-pill rounded-full bg-white px-3 py-1.5 text-center ring-1 ring-black/[0.04] cursor-default"
                      style={{
                        fontSize: "14px",
                        boxShadow:
                          "0 4px 10px -2px rgba(14,31,28,0.15), 0 16px 32px -10px rgba(14,31,28,0.28)",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <span className="box-tag-text font-semibold text-ink leading-snug">
                        {tag.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* the box itself — real rendered open-box graphic, centered in the stage */}
            <div
              className="absolute left-1/2 z-10"
              style={{
                top: "88%",
                width: "min(28rem, 32vw)",
                height: "min(18.5rem, 21vw)",
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/challenges/open-box.png"
                alt=""
                aria-hidden
                className="box-cube absolute inset-0 w-full h-full object-contain"
                style={{ filter: "drop-shadow(0 30px 40px rgba(14,31,28,0.28))" }}
              />
            </div>
          </div>
        </div>

        {/* mobile-only: small static box visual + a simple wrapped pill
            grid that fades/slides in, replacing the radial burst which
            can't scale down to phone width without overlapping pills */}
        <div className="md:hidden">
          <div className="box-scene-mobile relative mx-auto mb-8 w-40 h-28">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/challenges/open-box.png"
              alt=""
              aria-hidden
              className="box-cube-mobile absolute inset-0 w-full h-full object-contain"
              style={{ filter: "drop-shadow(0 16px 22px rgba(14,31,28,0.24))" }}
            />
          </div>

          <div className="box-tags-mobile grid grid-cols-2 gap-2.5">
            {RAW_TAGS.map((tag) => (
              <div
                key={tag.label}
                className="box-tag-mobile rounded-2xl bg-white px-3 py-2.5 text-center ring-1 ring-black/[0.04]"
                style={{
                  boxShadow:
                    "0 4px 10px -2px rgba(14,31,28,0.12), 0 10px 20px -8px rgba(14,31,28,0.18)",
                }}
              >
                <span className="text-[12px] font-semibold text-ink leading-snug">
                  {tag.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
