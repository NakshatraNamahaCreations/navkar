"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-11 h-11 md:w-12 md:h-12 rounded-full bg-canvas text-ink border border-line shadow-[0_10px_30px_-10px_rgba(14,31,28,0.4)] flex items-center justify-center transition-all duration-400 hover:bg-accent hover:text-canvas hover:border-accent ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <img
        src="/cargo-ship.png"
        alt=""
        aria-hidden
        className="w-5 h-5 md:w-6 md:h-6 object-contain"
      />
    </button>
  );
}
