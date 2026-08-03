"use client";

import { useEffect, useState } from "react";

const CATEGORIES = [
  "Toys",
  "Clothing",
  "Jewellery",
  "Furniture",
  "Accessories",
  "Electronics",
  "Machinery",
  "Home Decor",
  "Footwear & Bags",
  "Stationery",
  "Hardware",
  "Other",
];

type FormState = {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  productName: string;
  productCategory: string;
  productDescription: string;
  quantity: string;
  targetPrice: string;
  deliveryDate: string;
  additionalRequirements: string;
};

const INITIAL_STATE: FormState = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  productName: "",
  productCategory: "",
  productDescription: "",
  quantity: "",
  targetPrice: "",
  deliveryDate: "",
  additionalRequirements: "",
};

const inputClass =
  "w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors duration-200";

const labelClass = "block text-xs font-medium uppercase tracking-[0.12em] text-ink-soft mb-2";

export default function EnquiryModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setForm(INITIAL_STATE);
        setFile(null);
        setSubmitted(false);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [open]);

  const update = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
        className={`fixed inset-0 z-[95] flex items-center justify-center p-4 md:p-8 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-modal-title"
      >
        <div
          className={`relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl bg-canvas shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
            open ? "translate-y-0 scale-100" : "translate-y-6 scale-95"
          }`}
        >
          {/* header */}
          <div className="shrink-0 flex items-start justify-between gap-4 bg-ink text-canvas px-6 md:px-10 py-7 md:py-8">
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-accent-soft mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-soft" />
                Sourcing Enquiry
              </span>
              <h2
                id="enquiry-modal-title"
                className="font-display text-2xl md:text-3xl font-semibold leading-tight"
              >
                Tell Us What You Want to Source
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close enquiry form"
              className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full border border-canvas/25 text-canvas hover:bg-canvas hover:text-ink transition-colors duration-300"
            >
              ✕
            </button>
          </div>

          <div className="overflow-y-auto">
          {submitted ? (
            <div className="flex flex-col items-center text-center px-6 md:px-10 py-16 md:py-20">
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-6">
                <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                  <path
                    d="M5 12.5l4.5 4.5L19 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h3 className="font-display text-2xl font-semibold text-ink mb-3">
                Enquiry Received
              </h3>
              <p className="text-sm text-ink-soft leading-relaxed max-w-sm mb-8">
                Thank you, {form.fullName.split(" ")[0] || "there"}. Our sourcing
                team will review your requirements and get back to you within
                one business day.
              </p>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-full bg-ink text-canvas px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium hover:bg-accent transition-colors duration-300"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="px-6 md:px-10 py-8 md:py-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div className="min-w-0">
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
                <div className="min-w-0">
                  <label className={labelClass}>Company Name</label>
                  <input
                    type="text"
                    value={form.companyName}
                    onChange={update("companyName")}
                    placeholder="Your Company Ltd."
                    className={inputClass}
                  />
                </div>
                <div className="min-w-0">
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
                <div className="min-w-0">
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
                <div className="min-w-0">
                  <label className={labelClass}>Product Name</label>
                  <input
                    required
                    type="text"
                    value={form.productName}
                    onChange={update("productName")}
                    placeholder="e.g. Wireless earbuds"
                    className={inputClass}
                  />
                </div>
                <div className="min-w-0">
                  <label className={labelClass}>Product Category</label>
                  <select
                    required
                    value={form.productCategory}
                    onChange={update("productCategory")}
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2 min-w-0">
                  <label className={labelClass}>Product Description</label>
                  <textarea
                    value={form.productDescription}
                    onChange={update("productDescription")}
                    placeholder="Materials, specifications, intended use, packaging..."
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="min-w-0">
                  <label className={labelClass}>Required Quantity</label>
                  <input
                    type="text"
                    value={form.quantity}
                    onChange={update("quantity")}
                    placeholder="e.g. 5,000 units"
                    className={inputClass}
                  />
                </div>
                <div className="min-w-0">
                  <label className={labelClass}>Target Price</label>
                  <input
                    type="text"
                    value={form.targetPrice}
                    onChange={update("targetPrice")}
                    placeholder="e.g. $3.50 / unit"
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2 min-w-0">
                  <label className={labelClass}>Expected Delivery Date</label>
                  <input
                    type="date"
                    value={form.deliveryDate}
                    onChange={update("deliveryDate")}
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2 min-w-0">
                  <label className={labelClass}>
                    Upload Product Image or Specification
                  </label>
                  <label
                    className={`flex items-center justify-between gap-3 cursor-pointer rounded-xl border border-dashed border-line px-4 py-3 text-sm hover:border-accent transition-colors duration-200 ${
                      file ? "text-ink" : "text-ink-soft/70"
                    }`}
                  >
                    <span className="truncate">
                      {file ? file.name : "Click to upload a file (image, PDF, or doc)"}
                    </span>
                    <span className="shrink-0 text-xs uppercase tracking-[0.15em] text-accent">
                      Browse
                    </span>
                    <input
                      type="file"
                      accept="image/*,.pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    />
                  </label>
                </div>

                <div className="md:col-span-2 min-w-0">
                  <label className={labelClass}>Additional Requirements</label>
                  <textarea
                    value={form.additionalRequirements}
                    onChange={update("additionalRequirements")}
                    placeholder="Certifications, custom branding, logistics preferences..."
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-8 w-full md:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-accent px-8 py-3.5 text-sm font-medium text-canvas hover:bg-accent-soft hover:text-ink transition-colors duration-300"
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
      </div>
    </>
  );
}
