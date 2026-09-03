"use client";

import { useEffect, useState } from "react";

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  requirement: string;
};

const INITIAL_STATE: FormState = {
  fullName: "",
  phone: "",
  email: "",
  requirement: "",
};

const inputClass =
  "w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors duration-200";

const labelClass = "block text-xs font-medium uppercase tracking-[0.12em] text-ink-soft mb-2";

export default function QuickEnquiryModal({
  open,
  onClose,
  planName,
}: {
  open: boolean;
  onClose: () => void;
  /** when opened from a specific plan card, pre-fills the requirement
   *  field and shows which plan the enquiry is about */
  planName?: string;
}) {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (open && planName) {
      setForm((f) => ({
        ...f,
        requirement: f.requirement || `Interested in the ${planName} plan.`,
      }));
    }
  }, [open, planName]);

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setForm(INITIAL_STATE);
        setSubmitted(false);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [open]);

  const update = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[90] bg-ink/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`fixed inset-0 z-[95] flex items-center justify-center p-4 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-enquiry-modal-title"
      >
        <div
          className={`relative w-full max-w-sm overflow-hidden rounded-3xl bg-canvas shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "translate-y-0 scale-100" : "translate-y-6 scale-95"
          }`}
        >
          <div className="flex items-start justify-between gap-4 bg-ink text-canvas px-6 py-6">
            <div>
              <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-accent-soft mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-soft" />
                {planName ? `${planName} Plan Enquiry` : "Quick Enquiry"}
              </span>
              <h2
                id="quick-enquiry-modal-title"
                className="font-display text-xl font-semibold leading-tight"
              >
                Let&apos;s Get You Sourcing
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close enquiry form"
              className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-canvas/25 text-canvas hover:bg-canvas hover:text-ink transition-colors duration-300"
            >
              ✕
            </button>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center text-center px-6 py-12">
              <span className="flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 text-accent mb-5">
                <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
                  <path
                    d="M5 12.5l4.5 4.5L19 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h3 className="font-display text-xl font-semibold text-ink mb-2">
                Enquiry Received
              </h3>
              <p className="text-sm text-ink-soft leading-relaxed max-w-xs mb-7">
                Thank you, {form.fullName.split(" ")[0] || "there"}. Our team
                will get back to you within one business day.
              </p>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-full bg-ink text-canvas px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-medium hover:bg-accent transition-colors duration-300"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="px-6 py-6 flex flex-col gap-4">
              <div>
                <label className={labelClass}>Full Name</label>
                <input
                  required
                  type="text"
                  value={form.fullName}
                  onChange={update("fullName")}
                  placeholder="Jane Doe"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Phone Number</label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="+1 555 000 0000"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Email Address</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="jane@company.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>What Are You Sourcing?</label>
                <textarea
                  required
                  value={form.requirement}
                  onChange={update("requirement")}
                  placeholder="Product, quantity, timeline..."
                  rows={3}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="mt-1 w-full inline-flex items-center justify-center gap-3 rounded-full bg-accent px-6 py-3 text-sm font-medium text-canvas hover:bg-accent-soft hover:text-ink transition-colors duration-300"
              >
                Send Enquiry
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-canvas text-ink text-xs">
                  →
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
