const QUICK_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#plans" },
  { label: "Sourcing Process", href: "#process" },
  { label: "Product Categories", href: "#categories" },
  { label: "Contact Us", href: "#consultation" },
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
  return (
    <footer className="relative bg-ink text-canvas overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 md:pt-24">
        {/* headline + CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-16 md:pb-20">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-accent-soft mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-soft" />
              Navkar Global Sourcing
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold leading-[1.1]">
              Trade that feels like{" "}
              <span className="text-accent-soft">business.</span>
            </h2>
            <p className="mt-5 text-sm md:text-base text-canvas/60 leading-relaxed max-w-md">
              Reliable global product sourcing, supplier verification, quality
              inspection, shipping and logistics support for businesses.
            </p>
          </div>

          <a
            href="#consultation"
            className="group shrink-0 inline-flex items-center gap-2 rounded-full bg-canvas text-ink px-6 py-3.5 text-xs uppercase tracking-[0.15em] font-medium hover:bg-accent-soft transition-colors duration-300"
          >
            Begin Enquiry
            <span className="w-6 h-6 rounded-full bg-ink text-canvas flex items-center justify-center text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
        </div>

        {/* link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 pb-14 pt-2 border-t border-canvas/10">
          <div>
            <span className="inline-flex items-center rounded-[1.5rem] bg-white px-4 py-2 mb-4">
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
                  className="w-8 h-8 rounded-full border border-canvas/20 flex items-center justify-center text-canvas/70 hover:border-canvas hover:text-canvas transition-colors duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-canvas/50 mb-5">
              Quick Links
            </p>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-canvas/80 hover:text-accent-soft transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-canvas/50 mb-5">
              Services
            </p>
            <ul className="flex flex-col gap-3">
              {SERVICES.map((s) => (
                <li key={s} className="text-sm text-canvas/80">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-canvas/50 mb-5">
              Contact
            </p>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-canvas/40 mb-1">
                  Address
                </p>
                <p className="text-sm text-canvas/80 leading-relaxed">
                  12-A, Mahendra Industrial Premises,
                  <br />
                  Sion East, Mumbai – 400022
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
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-canvas/40 mb-1">
                  Phone
                </p>
                <a
                  href="tel:+919892575304"
                  className="text-sm text-canvas/80 hover:text-accent-soft transition-colors duration-300"
                >
                  +91 98925 75304
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* giant watermark wordmark — sized in vw so it always spans the
          viewport width without ever clipping, at any breakpoint */}
      <div className="relative w-full overflow-hidden pointer-events-none select-none py-6 md:py-10 px-4">
        <p
          className="text-center font-display font-bold uppercase text-canvas/[0.06] whitespace-nowrap leading-none"
          style={{ fontSize: "9.2vw" }}
        >
          Navkar Global Sourcing
        </p>
      </div>

      {/* bottom bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="py-6 pb-24 md:pb-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] uppercase tracking-[0.1em] text-canvas/40 text-center md:text-left border-t border-canvas/10">
          <span>&#169; {new Date().getFullYear()} Navkar Global Sourcing. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <a href="#" className="text-canvas/40 hover:text-canvas transition-colors">
              Terms
            </a>
            <a href="#" className="text-canvas/40 hover:text-canvas transition-colors">
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
