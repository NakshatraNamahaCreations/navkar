import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PlanDetail from "@/components/sections/PlanDetail";
import { PLANS } from "@/data/plans";

export function generateStaticParams() {
  return PLANS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const plan = PLANS.find((p) => p.slug === slug);
  if (!plan) return {};
  return {
    title: `${plan.planTitle} | Navkar Global Sourcing`,
    description: plan.subtitle,
  };
}

export default async function PlanPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plan = PLANS.find((p) => p.slug === slug);
  if (!plan) notFound();

  const otherPlans = PLANS.filter((p) => p.slug !== plan.slug);

  return (
    <div className="flex flex-col flex-1">
      <Nav />
      <main className="flex flex-col flex-1">
        <PageHero
          variant="centered"
          eyebrow="Our Sourcing Plans as per Your Needs"
          title={plan.planTitle}
          copy={plan.tagline}
        />

        <section className="relative bg-ink py-20 md:py-24 px-6 md:px-10 overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-0 w-[34rem] h-[34rem] rounded-full bg-[radial-gradient(circle,rgba(32,57,74,0.5),transparent_70%)] blur-3xl"
          />
          <div className="relative z-10 max-w-4xl mx-auto">
            <PlanDetail plan={plan} />

            <div className="flex flex-wrap items-center gap-4 mt-10">
              <a
                href="#consultation"
                className="inline-flex items-center gap-2 rounded-full bg-canvas text-ink px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-medium hover:bg-accent-soft transition-colors duration-300"
              >
                Enquire About This Plan
                <span>↗</span>
              </a>
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 text-canvas px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-medium hover:border-white/40 transition-colors duration-300"
              >
                Talk to Our Team
              </Link>
            </div>
          </div>
        </section>

        <section className="relative bg-canvas py-16 md:py-20 px-6 md:px-10 border-t border-line">
          <div className="max-w-4xl mx-auto">
            <span className="text-[11px] uppercase tracking-[0.25em] text-accent mb-5 block">
              Compare Other Plans
            </span>
            <div className="grid sm:grid-cols-3 gap-4">
              {otherPlans.map((p) => (
                <Link
                  key={p.slug}
                  href={`/services/${p.slug}`}
                  className="group rounded-2xl border border-line p-5 hover:border-accent/40 hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="font-mono text-xs text-ink-soft/40">{p.num}</span>
                  <h3 className="font-display text-lg font-bold text-ink mt-1 mb-1 group-hover:text-accent transition-colors duration-300">
                    {p.name}
                  </h3>
                  <p className="text-[13px] text-ink-soft">{p.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
