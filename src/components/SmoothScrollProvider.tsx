"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // the site preloader covers the page for ~2s after mount, during
    // which every section's ScrollTrigger positions get computed against
    // still-settling layout — recompute once it's out of the way so
    // entry animations trigger at the correct scroll position
    const onPreloaderDone = () => ScrollTrigger.refresh();
    window.addEventListener("site-preloader-done", onPreloaderDone);

    // second safety net: images/videos further down the page (esp. the
    // footer, the very last element) can keep changing total document
    // height well after the preloader clears, which leaves late-mounting
    // ScrollTriggers (like the footer's) computed against a too-short
    // page and their trigger point never gets crossed. Recompute again
    // once every resource has actually finished loading.
    const onWindowLoad = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      onWindowLoad();
    } else {
      window.addEventListener("load", onWindowLoad);
    }

    return () => {
      window.removeEventListener("site-preloader-done", onPreloaderDone);
      window.removeEventListener("load", onWindowLoad);
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
