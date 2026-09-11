import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PlanDetail from "@/components/sections/PlanDetail";
import PlanEnquireButtons from "@/components/sections/PlanEnquireButtons";
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

            <PlanEnquireButtons planName={plan.name} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
