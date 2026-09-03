"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SUBJECTS = [
  "General Enquiry",
  "Product Sourcing",
  "Supplier Verification",
  "Quality Inspection",
  "Shipping & Logistics",
];

const COUNTRY_CODES = [
  { code: "+91", country: "India", iso2: "in" },
  { code: "+1", country: "USA/Canada", iso2: "us" },
  { code: "+44", country: "UK", iso2: "gb" },
  { code: "+971", country: "UAE", iso2: "ae" },
  { code: "+61", country: "Australia", iso2: "au" },
  { code: "+65", country: "Singapore", iso2: "sg" },
  { code: "+86", country: "China", iso2: "cn" },
  { code: "+49", country: "Germany", iso2: "de" },
  { code: "+33", country: "France", iso2: "fr" },
  { code: "+81", country: "Japan", iso2: "jp" },
  { code: "+966", country: "Saudi Arabia", iso2: "sa" },
  { code: "+27", country: "South Africa", iso2: "za" },
];

const DETAILS = [
  {
    label: "Address",
    value: "Innov8 Solitaire Corporate Park, 7th Floor, S-11, Unit No. 1171 & 1172, Andheri (E), Mumbai – 400093",
    icon: (
      <path
        d="M12 21s7-6.5 7-11.5a7 7 0 10-14 0C5 14.5 12 21 12 21z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Email",
    value: "sales@navkarglobalsourcing.com",
    href: "mailto:sales@navkarglobalsourcing.com",
    icon: (
      <path
        d="M4 5h16v14H4V5zm0 0l8 7 8-7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Parshwa Shah (Founder)",
    value: "+91 99872 67555",
    href: "tel:+919987267555",
    icon: (
      <path
        d="M6 3h4l2 5-2.5 1.5a11 11 0 005 5L16 12l5 2v4a2 2 0 01-2 2C9.5 20 4 14.5 4 5a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Monty Mehta (Co-Founder)",
    value: "+91 81089 24986",
    href: "tel:+918108924986",
    icon: (
      <path
        d="M6 3h4l2 5-2.5 1.5a11 11 0 005 5L16 12l5 2v4a2 2 0 01-2 2C9.5 20 4 14.5 4 5a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    ),
  },
];

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(name: string, value: string): string | undefined {
  const trimmed = value.trim();
  switch (name) {
    case "name":
      if (!trimmed) return "Please enter your name.";
      if (trimmed.length < 2) return "Name must be at least 2 characters.";
      return undefined;
    case "email":
      if (!trimmed) return "Please enter your email address.";
      if (!EMAIL_PATTERN.test(trimmed)) return "Enter a valid email address.";
      return undefined;
    case "phone": {
      if (!trimmed) return "Please enter your phone number.";
      const digits = trimmed.replace(/\D/g, "");
      if (digits.length < 7 || digits.length > 12) {
        return "Enter a valid phone number.";
      }
      return undefined;
    }
    case "message":
      if (!trimmed) return "Please tell us what you're sourcing.";
      if (trimmed.length < 10) return "Please add a few more details.";
      return undefined;
    default:
      return undefined;
  }
}

export default function ContactForm() {
  const root = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [countryCode, setCountryCode] = useState("+91");
  const [countryOpen, setCountryOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement>(null);
  const selectedCountry =
    COUNTRY_CODES.find((c) => c.code === countryCode) ?? COUNTRY_CODES[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cf-card", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".cf-card", start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nextErrors: FormErrors = {
      name: validateField("name", String(formData.get("name") ?? "")),
      email: validateField("email", String(formData.get("email") ?? "")),
      phone: validateField("phone", String(formData.get("phone") ?? "")),
      message: validateField("message", String(formData.get("message") ?? "")),
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;
    setSubmitted(true);
  };

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-canvas py-20 md:py-28 px-6 md:px-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 w-[34rem] h-[34rem] rounded-full bg-[radial-gradient(circle,rgba(15,118,110,0.08),transparent_70%)] blur-3xl"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="cf-card grid lg:grid-cols-[1fr_22rem] rounded-[28px] overflow-hidden shadow-[0_40px_90px_-32px_rgba(14,31,28,0.25)] ring-1 ring-line">
          {/* form */}
          <div className="bg-white p-8 md:p-12">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-accent mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Send a Message
            </span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-ink mb-2">
              Tell us what you&apos;re sourcing.
            </h2>
            <p className="text-sm text-ink-soft leading-relaxed mb-8 max-w-md">
              Share a few details and our team will get back to you within
              one business day.
            </p>

            {submitted ? (
              <div className="rounded-2xl border border-accent/30 bg-accent/5 p-8 text-center">
                <p className="font-display text-lg font-semibold text-ink mb-2">
                  Thank you. We&apos;ve received your message.
                </p>
                <p className="text-sm text-ink-soft">
                  Our team will reach out shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="cf-name"
                      className="text-[11px] uppercase tracking-[0.12em] text-ink-soft"
                    >
                      Full Name
                    </label>
                    <input
                      id="cf-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "cf-name-error" : undefined}
                      onBlur={handleBlur}
                      className={`rounded-xl border bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 outline-none transition-colors duration-300 ${
                        errors.name
                          ? "border-red-400 focus:border-red-400"
                          : "border-line focus:border-accent"
                      }`}
                    />
                    {errors.name && (
                      <p id="cf-name-error" className="text-xs text-red-500">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="cf-email"
                      className="text-[11px] uppercase tracking-[0.12em] text-ink-soft"
                    >
                      Email Address
                    </label>
                    <input
                      id="cf-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "cf-email-error" : undefined}
                      onBlur={handleBlur}
                      className={`rounded-xl border bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 outline-none transition-colors duration-300 ${
                        errors.email
                          ? "border-red-400 focus:border-red-400"
                          : "border-line focus:border-accent"
                      }`}
                    />
                    {errors.email && (
                      <p id="cf-email-error" className="text-xs text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="cf-phone"
                      className="text-[11px] uppercase tracking-[0.12em] text-ink-soft"
                    >
                      Phone Number
                    </label>
                    <div className="flex gap-2">
                      <div ref={countryRef} className="relative shrink-0">
                        <input type="hidden" name="countryCode" value={countryCode} />
                        <button
                          type="button"
                          id="cf-country-code"
                          aria-label="Country code"
                          aria-haspopup="listbox"
                          aria-expanded={countryOpen}
                          onClick={() => setCountryOpen((v) => !v)}
                          className="flex items-center gap-1.5 rounded-xl border border-line bg-canvas px-2.5 py-3 text-sm text-ink outline-none transition-colors duration-300 focus:border-accent w-[5.5rem]"
                        >
                          <img
                            src={`https://flagcdn.com/24x18/${selectedCountry.iso2}.png`}
                            alt=""
                            width={20}
                            height={15}
                            className="rounded-[2px] shrink-0"
                          />
                          <span className="truncate">{selectedCountry.code}</span>
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className={`ml-auto shrink-0 transition-transform duration-200 ${countryOpen ? "rotate-180" : ""}`}
                          >
                            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>

                        {countryOpen && (
                          <ul
                            role="listbox"
                            className="absolute z-20 mt-1.5 max-h-64 w-56 overflow-y-auto rounded-xl border border-line bg-canvas py-1.5 shadow-[0_20px_45px_-15px_rgba(20,40,50,0.35)]"
                          >
                            {COUNTRY_CODES.map((c) => (
                              <li key={c.code}>
                                <button
                                  type="button"
                                  role="option"
                                  aria-selected={c.code === countryCode}
                                  onClick={() => {
                                    setCountryCode(c.code);
                                    setCountryOpen(false);
                                  }}
                                  className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm hover:bg-accent/10 transition-colors duration-150 ${
                                    c.code === countryCode ? "bg-accent/10 text-accent" : "text-ink"
                                  }`}
                                >
                                  <img
                                    src={`https://flagcdn.com/24x18/${c.iso2}.png`}
                                    alt=""
                                    width={20}
                                    height={15}
                                    className="rounded-[2px] shrink-0"
                                  />
                                  <span className="font-medium">{c.code}</span>
                                  <span className="text-ink-soft truncate">{c.country}</span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <input
                        id="cf-phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="00000 00000"
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? "cf-phone-error" : undefined}
                        onBlur={handleBlur}
                        className={`flex-1 min-w-0 rounded-xl border bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 outline-none transition-colors duration-300 ${
                          errors.phone
                            ? "border-red-400 focus:border-red-400"
                            : "border-line focus:border-accent"
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p id="cf-phone-error" className="text-xs text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="cf-subject"
                      className="text-[11px] uppercase tracking-[0.12em] text-ink-soft"
                    >
                      Subject
                    </label>
                    <select
                      id="cf-subject"
                      name="subject"
                      defaultValue={SUBJECTS[0]}
                      className="rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none transition-colors duration-300 focus:border-accent"
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="cf-message"
                    className="text-[11px] uppercase tracking-[0.12em] text-ink-soft"
                  >
                    Your Requirement
                  </label>
                  <textarea
                    id="cf-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about the product, quantity, and timeline..."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "cf-message-error" : undefined}
                    onBlur={handleBlur}
                    className={`rounded-xl border bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 outline-none transition-colors duration-300 resize-none ${
                      errors.message
                        ? "border-red-400 focus:border-red-400"
                        : "border-line focus:border-accent"
                    }`}
                  />
                  {errors.message && (
                    <p id="cf-message-error" className="text-xs text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="mt-2 self-start inline-flex items-center gap-2 rounded-full bg-ink text-canvas px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-medium hover:bg-accent transition-colors duration-300"
                >
                  Submit Requirement
                  <span>↗</span>
                </button>
              </form>
            )}
          </div>

          {/* details rail */}
          <div className="relative bg-ink p-8 md:p-10 flex flex-col justify-between">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40"
            >
              <svg
                aria-hidden
                className="h-full w-full"
                preserveAspectRatio="none"
              >
                <pattern id="cf-dots" width="26" height="26" patternUnits="userSpaceOnUse">
                  <circle cx="1.4" cy="1.4" r="1.4" fill="rgba(79,179,166,0.22)" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#cf-dots)" />
              </svg>
            </div>

            <div className="relative z-10">
              <h3 className="font-display text-lg font-semibold text-canvas mb-1">
                Get in Touch
              </h3>
              <p className="text-xs text-canvas/60 leading-relaxed mb-8">
                Prefer to reach us directly? Use any of the details below.
              </p>

              <div className="flex flex-col gap-4">
                {DETAILS.map((d) => (
                  <div key={d.label} className="flex items-start gap-3.5">
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-accent/15 text-accent-soft shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                        {d.icon}
                      </svg>
                    </span>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-canvas/40 mb-1">
                        {d.label}
                      </p>
                      {d.href ? (
                        <a
                          href={d.href}
                          className="text-[13px] font-medium text-canvas hover:text-accent-soft transition-colors duration-300"
                        >
                          {d.value}
                        </a>
                      ) : (
                        <p className="text-[13px] font-medium text-canvas leading-relaxed">
                          {d.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-10 pt-6 border-t border-canvas/10">
              <p className="text-[11px] uppercase tracking-[0.15em] text-canvas/40 mb-1">
                Response Time
              </p>
              <p className="text-[13px] text-canvas/80">
                We typically reply within 1 business day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
