import type { Plan } from "@/data/plans";

export default function PlanDetail({ plan }: { plan: Plan }) {
  return (
    <div>
      <span className="text-[11px] uppercase tracking-[0.25em] text-accent-soft mb-3 block">
        {plan.planTitle}
      </span>
      <h3 className="font-display text-2xl md:text-3xl font-bold leading-snug text-canvas mb-5">
        {plan.subtitle}
      </h3>

      <div className="space-y-4 text-sm text-canvas/65 leading-relaxed mb-9 max-w-3xl">
        {plan.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-x-10 gap-y-9 mb-9">
        <div>
          <h4 className="text-[11px] uppercase tracking-[0.2em] text-accent-soft mb-4">
            Ideal For
          </h4>
          <ul className="flex flex-col gap-2.5">
            {plan.idealFor.map((f) => (
              <li key={f} className="flex items-start gap-2 text-[13px] leading-snug text-canvas/75">
                <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 mt-0.5 shrink-0 text-accent-soft">
                  <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M6.5 10.2l2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-[0.2em] text-accent-soft mb-4">
            {plan.servicesHeading}
          </h4>
          <ul className="flex flex-col gap-2.5">
            {plan.servicesList.map((f) => (
              <li key={f} className="flex items-start gap-2 text-[13px] leading-snug text-canvas/75">
                <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 mt-0.5 shrink-0 text-accent">
                  <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M6.5 10.2l2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
        <span className="text-[11px] uppercase tracking-[0.2em] text-accent-soft mb-3 block">
          {plan.whyChooseHeading}
        </span>
        <p className="font-display text-lg md:text-xl font-medium text-canvas mb-3">
          {plan.whyChooseQuote}
        </p>
        <p className="text-sm text-canvas/60 leading-relaxed">
          {plan.whyChooseText}
        </p>
      </div>
    </div>
  );
}
