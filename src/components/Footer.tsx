"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Sourcing Process", href: "/sourcing-process" },
  { label: "Product Categories", href: "/product-categories" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact-us" },
];

const SERVICES = [
  "Product Sourcing",
  "Supplier Identification",
  "Supplier Verification",
  "Factory Audit",
  "Quotation Comparison",
  "Price Negotiation",
  "Quality Inspection",
  "Shipping and Logistics",
];

const SOCIALS = [
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path
          d="M6.94 5a1.94 1.94 0 11-3.88 0 1.94 1.94 0 013.88 0zM3.5 8.75h3.4V20h-3.4V8.75zM9.9 8.75h3.26v1.54h.05c.45-.86 1.56-1.77 3.22-1.77 3.45 0 4.08 2.27 4.08 5.22V20h-3.4v-5.63c0-1.34-.02-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97V20H9.9V8.75z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path
          d="M4 4l16 16M20 4L4 20"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path
          d="M14 9h2.5V5.5H14c-2 0-3.5 1.5-3.5 3.5v2H8v3.5h2.5V21H14v-6.5h2.3l.4-3.5H14V9z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export default function Footer() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-headline .split-line > span", {
        yPercent: 110,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".footer-headline", start: "top 88%" },
      });

      gsap.from(".footer-copy", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".footer-headline", start: "top 88%" },
      });

      gsap.from(".footer-cta", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.25,
        ease: "power3.out",
        scrollTrigger: { trigger: ".footer-headline", start: "top 88%" },
      });

      gsap.from(".footer-col", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".footer-cols", start: "top 85%" },
      });

      // ambient glows drift continuously, echoing the teal/navy logo gradient
      gsap.to(".footer-glow-a", {
        x: 60,
        y: 30,
        duration: 18,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(".footer-glow-b", {
        x: -50,
        y: -40,
        duration: 22,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={root}
      className="relative text-canvas overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #12222d 0%, #1a2f3d 45%, #0e1f1c 100%)",
      }}
    >
      {/* ambient glows in the logo's navy/teal gradient */}
      <div
        aria-hidden
        className="footer-glow-a pointer-events-none absolute -top-32 -left-20 w-[36rem] h-[36rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(79,179,166,0.22), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="footer-glow-b pointer-events-none absolute top-1/3 -right-24 w-[30rem] h-[30rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(32,57,74,0.35), transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-20 md:pt-24">
        {/* headline + CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-16 md:pb-20">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-accent-soft mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-soft" />
              Navkar Global Sourcing
            </span>
            <h2 className="footer-headline font-display text-4xl md:text-5xl font-semibold leading-[1.1]">
              <span className="split-line block overflow-hidden">
                <span className="block">Trade that feels like</span>
              </span>
              <span className="split-line block overflow-hidden">
                <span className="block text-accent-soft">business.</span>
              </span>
            </h2>
            <p className="footer-copy mt-5 text-sm md:text-base text-canvas/60 leading-relaxed max-w-md">
              Reliable global product sourcing, supplier verification, quality
              inspection, shipping and logistics support for businesses.
            </p>
          </div>

          <Link
            href="/contact-us"
            className="footer-cta group shrink-0 inline-flex items-center gap-3 rounded-full bg-canvas text-ink pl-6 pr-2 py-2 text-xs uppercase tracking-[0.15em] font-medium shadow-[0_20px_50px_-15px_rgba(79,179,166,0.45)] hover:shadow-[0_24px_60px_-12px_rgba(79,179,166,0.6)] hover:bg-accent-soft transition-all duration-300"
          >
            Begin Enquiry
            <span className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-soft to-accent text-canvas flex items-center justify-center text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-45">
              ↗
            </span>
          </Link>
        </div>

        {/* link columns */}
        <div className="footer-cols grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 pb-16 md:pb-20 pt-12 md:pt-14 border-t border-canvas/10">
          <div className="footer-col">
            <span className="inline-flex items-center rounded-[1.5rem] bg-white px-4 py-2 mb-4 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.4)]">
              <img
                src="/navkar-logo-trimmed.png"
                alt="Navkar Global Sourcing"
                className="h-14 w-auto object-contain"
              />
            </span>

            <p className="text-xs uppercase tracking-[0.2em] text-canvas/50 mb-3">
              Get in touch
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="w-8 h-8 rounded-full border border-canvas/20 flex items-center justify-center text-canvas/70 hover:border-accent-soft hover:text-accent-soft hover:bg-accent-soft/10 transition-colors duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <p className="text-xs uppercase tracking-[0.2em] text-canvas/50 mb-5">
              Quick Links
            </p>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-canvas/80 hover:text-accent-soft transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <p className="text-xs uppercase tracking-[0.2em] text-canvas/50 mb-5">
              Services
            </p>
            <ul className="flex flex-col gap-3">
              {SERVICES.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="text-sm text-canvas/80 hover:text-accent-soft transition-colors duration-300"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <p className="text-xs uppercase tracking-[0.2em] text-canvas/50 mb-5">
              Contact
            </p>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-canvas/40 mb-1">
                  Address
                </p>
                <p className="text-sm text-canvas/80 leading-relaxed">
                  Innov8 Solitaire Corporate Park, 7th Floor, S-11,
                  <br />
                  Unit No. 1171 &amp; 1172, Andheri (E), Mumbai – 400093
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-canvas/40 mb-1">
                  Email
                </p>
                <a
                  href="mailto:sales@navkarglobalsourcing.com"
                  className="text-sm text-canvas/80 hover:text-accent-soft transition-colors duration-300"
                >
                  sales@navkarglobalsourcing.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <div className="py-8 pb-24 md:pb-8 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] uppercase tracking-[0.1em] text-canvas/40 text-center md:text-left border-t border-canvas/10">
          <span>&#169; {new Date().getFullYear()} Navkar Global Sourcing. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <a href="#" className="text-canvas/40 hover:text-accent-soft transition-colors">
              Terms
            </a>
            <a href="#" className="text-canvas/40 hover:text-accent-soft transition-colors">
              Privacy
            </a>
            <span>
              Crafted by{" "}
              <span className="text-canvas/60">Nakshatra Namaha Creations</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
