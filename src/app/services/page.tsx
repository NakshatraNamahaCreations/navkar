import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ServicesShowcase from "@/components/sections/ServicesShowcase";
import WhoWeWorkWith from "@/components/sections/WhoWeWorkWith";

export const metadata = {
  title: "Services | Navkar Global Sourcing",
  description:
    "Four ways to source, one accountable desk. Explore Navkar Global Sourcing's plans for sourcing from China and other global markets, and who we work with.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col flex-1">
      <Nav />
      <main className="flex flex-col flex-1">
        <PageHero
          variant="centered"
          eyebrow="Our Sourcing Plans as per Your Needs"
          title="Four ways to source,"
          accentWord="one accountable desk."
          copy="Pick the plan that matches where you are in the sourcing journey, from a supplier-in-hand check to a full on-the-ground sourcing desk across China and other global markets."
        />
        <ServicesShowcase hideCta />
        <WhoWeWorkWith />
      </main>
      <Footer />
    </div>
  );
}
