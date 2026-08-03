"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 20;
const FRAME_PATH = (i: number) =>
  `/navkar-video-frames/frame_${String(i).padStart(2, "0")}.jpg`;

export default function FrameParallaxSection() {
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
    let progressRaf = 0;

    const scheduleProgressUpdate = () => {
      if (progressRaf) return;
      progressRaf = requestAnimationFrame(() => {
        progressRaf = 0;
        if (!cancelled) setLoadProgress(loadedCount / FRAME_COUNT);
      });
    };

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loadedCount++;
        scheduleProgressUpdate();
        if (loadedCount === FRAME_COUNT && !cancelled) setLoaded(true);
      };
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      cancelled = true;
      if (progressRaf) cancelAnimationFrame(progressRaf);
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
      draw(Math.round(frameRef.current.index));
    };

    resize();
    window.addEventListener("resize", resize);

    if (!loaded) return () => window.removeEventListener("resize", resize);

    let lastDrawn = -1;

    const ctxGsap = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (FRAME_COUNT - 1));
            if (idx !== lastDrawn) {
              lastDrawn = idx;
              draw(idx);
            }
          },
        },
        defaults: { ease: "none" },
      });

      tl.fromTo(".fp-heading", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0 }, 0.08)
        .to(".fp-heading", { autoAlpha: 0, y: -30 }, 0.2);
    }, root);

    return () => {
      window.removeEventListener("resize", resize);
      ctxGsap.revert();
    };
  }, [loaded]);

  return (
    <section
      ref={root}
      className="relative w-full bg-ink text-canvas"
      style={{ height: "500vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,31,28,0.45)_0%,rgba(14,31,28,0.05)_20%,rgba(14,31,28,0.05)_75%,rgba(14,31,28,0.55)_100%)]" />

        {!loaded && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-ink">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-canvas/60 mb-4">
                Loading sequence {Math.round(loadProgress * 100)}%
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

        <div className="fp-heading absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <span className="text-xs uppercase tracking-[0.3em] text-canvas/70 mb-5">
            From Above the Clouds to the Open Sea
          </span>
          <h2 className="font-display font-light leading-[1.05] text-4xl md:text-6xl max-w-3xl">
            Every shipment travels a{" "}
            <span className="font-semibold text-accent-soft">long way</span>{" "}
            before it reaches you.
          </h2>
        </div>
      </div>
    </section>
  );
}
