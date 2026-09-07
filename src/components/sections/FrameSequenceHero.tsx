"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 240;
const FRAME_PATH = (i: number) =>
  `/frames-jpg/frame_${String(i).padStart(3, "0")}.jpg`;

export default function FrameSequenceHero() {
  const root = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef({ index: 0 });
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loadedCount++;
        if (!cancelled) setLoadProgress(loadedCount / FRAME_COUNT);
        if (loadedCount === FRAME_COUNT && !cancelled) setLoaded(true);
      };
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = (index: number) => {
      const img = imagesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      let drawWidth: number;
      let drawHeight: number;

      if (imgRatio > canvasRatio) {
        drawHeight = canvas.height;
        drawWidth = drawHeight * imgRatio;
      } else {
        drawWidth = canvas.width;
        drawHeight = drawWidth / imgRatio;
      }

      const x = (canvas.width - drawWidth) / 2;
      const y = (canvas.height - drawHeight) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, drawWidth, drawHeight);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      draw(frameRef.current.index);
    };

    resize();
    window.addEventListener("resize", resize);

    if (!loaded) return () => window.removeEventListener("resize", resize);

    const ctxGsap = gsap.context(() => {
      gsap.to(frameRef.current, {
        index: FRAME_COUNT - 1,
        ease: "none",
        snap: "index",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: () => draw(Math.round(frameRef.current.index)),
        },
      });
    }, root);

    return () => {
      window.removeEventListener("resize", resize);
      ctxGsap.revert();
    };
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;

    const ctx = gsap.context(() => {
      // intro-in animation for the very first beat
      const intro = gsap.timeline({ delay: 0.3, defaults: { ease: "power3.out" } });
      intro
        .set(".beat-intro .fsh-line > span", { yPercent: 110 })
        .set(".beat-intro .fsh-fade", { opacity: 0, y: 16 })
        .to(".beat-intro .fsh-line > span", { yPercent: 0, duration: 1.1, stagger: 0.08 })
        .to(".beat-intro .fsh-fade", { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, "-=0.6");

      // set initial hidden state for later beats
      gsap.set(
        [".beat-problem", ".beat-expertise", ".beat-reveal"],
        { autoAlpha: 0 }
      );
      gsap.set(".beat-problem .beat-inner, .beat-expertise .beat-inner", {
        y: 30,
      });
      gsap.set(".beat-reveal .beat-inner", {
        scale: 2.4,
        letterSpacing: "-0.02em",
      });
      gsap.set(".beat-reveal .reveal-tag", { opacity: 0, y: 12 });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      const FADE = 0.03;

      // 0 -> 0.3 : intro beat holds
      scrollTl
        .set(".beat-intro", { autoAlpha: 1 }, 0)
        .to(".beat-intro", { autoAlpha: 0, duration: FADE }, 0.3)
        .set(".beat-intro", { autoAlpha: 0 }, 0.3 + FADE)

        // 0.34 -> 0.48 : problem statement
        .set(".beat-problem .beat-inner", { y: 0 }, 0.34)
        .to(".beat-problem", { autoAlpha: 1, duration: FADE }, 0.34)
        .to(".beat-problem", { autoAlpha: 0, duration: FADE }, 0.48)
        .set(".beat-problem", { autoAlpha: 0 }, 0.48 + FADE)

        // 0.54 -> 0.68 : expertise / solution statement
        .set(".beat-expertise .beat-inner", { y: 0 }, 0.54)
        .to(".beat-expertise", { autoAlpha: 1, duration: FADE }, 0.54)
        .to(".beat-expertise", { autoAlpha: 0, duration: FADE }, 0.68)
        .set(".beat-expertise", { autoAlpha: 0 }, 0.68 + FADE)

        // 0.68 -> 0.86 : footage breathes alone (no overlay copy)

        // 0.86 -> 1.0 : final reveal, scales down from oversized into place
        .set(".beat-reveal", { autoAlpha: 1 }, 0.86)
        .fromTo(
          ".beat-reveal .beat-inner",
          { scale: 2.4, letterSpacing: "-0.02em" },
          { scale: 1, letterSpacing: "0em", duration: 0.14, ease: "power2.out" },
          0.86
        )
        .to(".beat-reveal .reveal-tag", { opacity: 1, y: 0, duration: 0.06 }, 0.96);
    }, root);

    return () => ctx.revert();
  }, [loaded]);

  return (
    <section
      id="hero"
      ref={root}
      className="relative w-full bg-ink text-canvas"
      style={{ height: "500vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(79,179,166,0.22),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,31,28,0.35)_0%,rgba(14,31,28,0.65)_100%)]" />

        {!loaded && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-ink">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-canvas/60 mb-4">
                Composing the descent {Math.round(loadProgress * 100)}%
              </p>
              <div className="w-48 h-px bg-canvas/20 mx-auto overflow-hidden">
                <div
                  className="h-full bg-accent-soft transition-[width] duration-200"
                  style={{ width: `${loadProgress * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Beat 1: intro */}
        <div className="beat-intro absolute inset-0 z-10 flex flex-col justify-between h-full">
          <div className="flex justify-between items-start px-6 md:px-10 pt-28 fsh-fade">
            <p className="text-xs uppercase tracking-[0.3em] text-canvas/60 max-w-[220px]">
              Global Product Sourcing Studio
            </p>
            <p className="hidden sm:block text-xs uppercase tracking-[0.3em] text-canvas/60 text-right max-w-[220px]">
              From factory floor to your shelf
            </p>
          </div>

          <div className="px-6 md:px-10 pb-16">
            <h1 className="font-display font-light leading-[1.05] md:leading-[0.95] text-[10vw] md:text-[8vw]">
              <span className="fsh-line block overflow-hidden">
                <span>From inquiry to</span>
              </span>
              <span className="fsh-line block overflow-hidden font-medium text-accent-soft">
                <span>delivery, on time,</span>
              </span>
              <span className="fsh-line block overflow-hidden">
                <span>every time.</span>
              </span>
            </h1>

            <div className="fsh-fade mt-10 flex flex-col sm:flex-row sm:items-end justify-between gap-8">
              <p className="max-w-md text-canvas/70 text-sm md:text-base leading-relaxed">
                Navkar Global runs global product sourcing end-to-end,
                covering factory identification, negotiation, quality control,
                and logistics, so your orders ship on schedule, without surprises.
              </p>
              <span className="shrink-0 flex items-center gap-3 text-xs uppercase tracking-[0.25em]">
                <span className="w-10 h-10 rounded-full border border-canvas/40 flex items-center justify-center">
                  ↓
                </span>
                Start Sourcing
              </span>
            </div>
          </div>

          <div className="fsh-fade absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-canvas/50">
            Scroll to explore
          </div>
        </div>

        {/* Beat 2: problem statement */}
        <div className="beat-problem absolute inset-0 z-10 flex items-end px-6 md:px-10 pb-24 md:pb-32">
          <div className="beat-inner max-w-2xl">
            <span className="text-xs uppercase tracking-[0.3em] text-accent-soft">
              01. Where sourcing breaks down
            </span>
            <p className="font-display font-light leading-[1.2] text-2xl md:text-5xl mt-6">
              Unverified factories. Pricing you can&apos;t audit. Shipments
              that slip their dates without warning.
            </p>
          </div>
        </div>

        {/* Beat 3: expertise / solution statement */}
        <div className="beat-expertise absolute inset-0 z-10 flex items-end px-6 md:px-10 pb-24 md:pb-32">
          <div className="beat-inner max-w-2xl">
            <span className="text-xs uppercase tracking-[0.3em] text-accent-soft">
              02. What we bring instead
            </span>
            <p className="font-display font-light leading-[1.2] text-2xl md:text-5xl mt-6">
              18 years of sourcing relationships, 600+ audited manufacturers,
              and a single accountable partner from quote to delivery.
            </p>
          </div>
        </div>

        {/* Final reveal */}
        <div className="beat-reveal absolute inset-0 z-10 flex flex-col items-center justify-center overflow-hidden px-6 md:px-10">
          <div className="beat-inner text-center" style={{ transformOrigin: "50% 50%" }}>
            <p className="font-display font-semibold leading-[1.05] md:leading-[0.95] text-[11vw] md:text-[8vw] text-canvas">
              Navkar Global
            </p>
            <p className="font-display font-semibold leading-[1.05] md:leading-[0.95] text-[11vw] md:text-[8vw] text-accent-soft">
              Sourcing
            </p>
          </div>
          <p className="reveal-tag absolute bottom-16 md:bottom-20 text-xs uppercase tracking-[0.3em] text-canvas/60">
            Global Product Sourcing, Delivered
          </p>
        </div>
      </div>
    </section>
  );
}
