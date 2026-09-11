"use client";

import Link from "next/link";

export default function PlanEnquireButtons({ planName }: { planName: string }) {
  return (
    <div className="flex flex-wrap items-center gap-4 mt-10">
      <button
        type="button"
        onClick={() =>
          window.dispatchEvent(
            new CustomEvent("open-quick-enquiry", { detail: { planName } })
          )
        }
        className="inline-flex items-center gap-2 rounded-full bg-canvas text-ink px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-medium hover:bg-accent-soft transition-colors duration-300"
      >
        Enquire About This Plan
        <span>↗</span>
      </button>
      <Link
        href="/contact-us"
        className="inline-flex items-center gap-2 rounded-full border border-white/15 text-canvas px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-medium hover:border-white/40 transition-colors duration-300"
      >
        Talk to Our Team
      </Link>
    </div>
  );
}
