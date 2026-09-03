"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import EnquiryModal from "@/components/EnquiryModal";
import QuickEnquiryModal from "@/components/QuickEnquiryModal";

const NAV_LINKS = [
  { href: "/", label: "Home", num: "01" },
  { href: "/about-us", label: "About Us", num: "02" },
  { href: "/services", label: "Services", num: "03" },
  { href: "/sourcing-process", label: "Sourcing Process", num: "04" },
  { href: "/product-categories", label: "Product Categories", num: "05" },
  { href: "/gallery", label: "Gallery", num: "06" },
  { href: "/blogs", label: "Blogs", num: "07" },
  { href: "/contact-us", label: "Contact Us", num: "08" },
];

const AUTO_ENQUIRY_SESSION_KEY = "navkar-auto-enquiry-shown";
const AUTO_ENQUIRY_DELAY_MS = 1000;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [quickEnquiryOpen, setQuickEnquiryOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // greet first-time-this-session visitors with a small enquiry form, once
  // the brand preloader has finished so it doesn't stack on top of it
  useEffect(() => {
    if (sessionStorage.getItem(AUTO_ENQUIRY_SESSION_KEY)) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const trigger = () => {
      sessionStorage.setItem(AUTO_ENQUIRY_SESSION_KEY, "1");
      timer = setTimeout(() => setQuickEnquiryOpen(true), AUTO_ENQUIRY_DELAY_MS);
    };

    window.addEventListener("site-preloader-done", trigger, { once: true });
    return () => {
      window.removeEventListener("site-preloader-done", trigger);
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const doc = document.documentElement;
    let maxScroll = doc.scrollHeight - doc.clientHeight;
    // header stays transparent for the full height of the hero banner and
    // only turns white once that's been scrolled past, into section 2 —
    // falls back to a small fixed threshold if #hero isn't found
    let heroHeight = 40;

    const remeasureMax = () => {
      maxScroll = doc.scrollHeight - doc.clientHeight;
      heroHeight =
        document.getElementById("hero")?.offsetHeight ??
        document.querySelector<HTMLElement>("[data-page-hero]")?.offsetHeight ??
        40;
    };
    remeasureMax();

    let ticking = false;
    const update = () => {
      ticking = false;
      const top = doc.scrollTop;
      setProgress(maxScroll > 0 ? top / maxScroll : 0);
      setScrolled(top > heroHeight - 80);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", remeasureMax, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", remeasureMax);
    };
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-500 ${
          scrolled
            ? "bg-canvas shadow-[0_4px_20px_rgba(14,31,28,0.12)]"
            : "bg-transparent"
        }`}
      >
        <div
          className={`absolute bottom-0 left-0 right-0 h-px bg-ink/10 transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* transparent over the hero banner, turns solid white once scrolled
            past it into the next section — the row is sized to fully
            contain the larger logo either way */}
        <div className="relative flex items-center justify-between px-6 md:px-10 py-2 md:py-3">
          <Link href="/" className="relative flex items-center">
            {/* solid white backdrop behind the logo so it always pops with
                full contrast, even over the busiest part of the video —
                a soft-edged pill with real depth (shadow + faint ring)
                rather than a flat rectangle, so it reads as a considered
                piece of chrome instead of a slapped-on box */}
            <span
              aria-hidden
              className={`absolute -inset-x-5 -inset-y-3 rounded-[2rem] bg-white shadow-[0_8px_24px_-6px_rgba(14,31,28,0.35)] ring-1 ring-black/[0.04] transition-opacity duration-500 -z-10 ${
                scrolled ? "opacity-0" : "opacity-100"
              }`}
            />
            <img
              src="/navkar-logo-trimmed.png"
              alt="Navkar Global Sourcing"
              className="relative h-20 md:h-24 w-auto object-contain"
            />
          </Link>

          <button
            onClick={() => setOpen(true)}
            className={`flex items-center gap-3 text-xs uppercase tracking-[0.2em] transition-colors duration-500 ${
              scrolled ? "text-ink/70 hover:text-ink" : "text-canvas/70 hover:text-canvas"
            }`}
          >
            <span className="hidden sm:inline">Menu</span>
            <span className="relative w-6 h-4 flex flex-col justify-between">
              <span
                className={`h-px w-full transition-colors duration-500 ${
                  scrolled ? "bg-ink" : "bg-canvas"
                }`}
              />
              <span
                className={`h-px w-full transition-colors duration-500 ${
                  scrolled ? "bg-ink" : "bg-canvas"
                }`}
              />
            </span>
          </button>
        </div>

        <div className="absolute bottom-0 left-0 h-[2px] bg-accent transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />
      </header>

      {/* backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[65] bg-ink/50 transition-opacity duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* slide-in panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[70] w-[85vw] max-w-[380px] bg-canvas text-ink shadow-[-10px_0_40px_rgba(0,0,0,0.25)] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 shrink-0">
          <Link href="/" onClick={closeMenu} className="flex items-center">
            <img
              src="/navkar-logo-trimmed.png"
              alt="Navkar Global Sourcing"
              className="h-16 w-auto object-contain"
            />
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex items-center justify-center w-9 h-9 rounded-full border border-line text-ink-soft hover:bg-ink hover:text-canvas hover:border-ink transition-colors duration-300"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 min-h-0 flex flex-col px-6 pt-4 gap-1 overflow-y-auto">
          {NAV_LINKS.map((s) => (
            <Link
              key={s.num}
              href={s.href}
              onClick={closeMenu}
              className="text-left py-2.5 text-base font-medium text-ink hover:text-accent transition-colors duration-200"
            >
              {s.label}
            </Link>
          ))}
        </nav>

        <div className="px-6 pb-8 pt-4 shrink-0 flex flex-col gap-5">
          <button
            onClick={() => {
              setOpen(false);
              setEnquiryOpen(true);
            }}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-canvas hover:bg-accent-soft hover:text-ink transition-colors duration-300"
          >
            Send an Enquiry
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-canvas text-ink text-xs">
              →
            </span>
          </button>

          <div className="h-px bg-line" />

          <div className="flex flex-col gap-2 text-xs text-ink-soft">
            <span>info@navkarglobal.com</span>
            <span>Global Sourcing Studio</span>
          </div>
        </div>
      </div>

      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
      <QuickEnquiryModal
        open={quickEnquiryOpen}
        onClose={() => setQuickEnquiryOpen(false)}
      />
    </>
  );
}
