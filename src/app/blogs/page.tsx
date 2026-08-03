import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Blogs | Navkar Global Sourcing",
  description:
    "Insights on global sourcing, supplier verification, and procurement from the Navkar Global Sourcing team.",
};

const UPCOMING_TOPICS = [
  {
    tag: "Sourcing Strategy",
    title: "How to vet a manufacturer before the first PO",
    icon: (
      <path
        d="M10.5 17a6.5 6.5 0 100-13 6.5 6.5 0 000 13zM20 20l-5-5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    ),
  },
  {
    tag: "Quality Control",
    title: "What a pre-shipment inspection actually checks",
    icon: (
      <path
        d="M12 3l8 3v6c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V6l8-3zM9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    ),
  },
  {
    tag: "Procurement",
    title: "MOQ negotiation: what's actually flexible",
    icon: (
      <path
        d="M3 12l4-4 4 3 4-3 4 3v3l-4 4-3-2-3 2-4-3z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function BlogsPage() {
  return (
    <div className="flex flex-col flex-1">
      <Nav />
      <main className="flex flex-col flex-1">
        <PageHero
          variant="editorial"
          eyebrow="Blogs"
          title="Insights on"
          accentWord="global sourcing."
          copy="Notes on supplier verification, procurement strategy, and the realities of manufacturing abroad — written by the team handling it every day."
          meta={[{ value: "3", label: "Topics in the works" }]}
        />

        <section className="relative bg-canvas py-16 md:py-20 px-6 md:px-10">
          <div className="max-w-5xl mx-auto">
            <p className="text-[11px] uppercase tracking-[0.25em] text-ink-soft mb-8">
              Coming up next
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {UPCOMING_TOPICS.map((t) => (
                <article
                  key={t.title}
                  className="rounded-2xl border border-line bg-white/60 p-6 flex flex-col"
                >
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-accent/10 text-accent mb-5">
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                      {t.icon}
                    </svg>
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.15em] text-accent mb-2">
                    {t.tag}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-ink leading-snug">
                    {t.title}
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative bg-canvas pb-20 md:pb-28 px-6 md:px-10">
          <div className="max-w-2xl mx-auto text-center rounded-3xl border border-line bg-white/60 p-10 md:p-14">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-3">
              First posts are on the way.
            </h2>
            <p className="text-sm md:text-base text-ink-soft leading-relaxed mb-8">
              We&apos;re preparing our first set of articles on sourcing
              strategy, supplier audits, and procurement best practices. In
              the meantime, get in touch directly with any questions.
            </p>
            <a
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-full bg-ink text-canvas px-6 py-3 text-xs uppercase tracking-[0.15em] font-medium hover:bg-accent transition-colors duration-300"
            >
              Contact Our Team
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-canvas text-ink text-xs">
                →
              </span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
