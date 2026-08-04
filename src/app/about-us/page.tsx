import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import WhyChooseUsTiles from "@/components/sections/WhyChooseUsTiles";
import FoundersSection from "@/components/sections/FoundersSection";

export const metadata = {
  title: "About Us | Navkar Global Sourcing",
  description:
    "Meet the founders behind Navkar Global Sourcing and the values of trust, transparency, and long-term partnership that shape our work.",
};

export default function AboutUsPage() {
  return (
    <div className="flex flex-col flex-1">
      <Nav />
      <main className="flex flex-col flex-1">
        <PageHero
          variant="centered"
          eyebrow="About Us"
          title="The people behind"
          accentWord="Navkar Global Sourcing."
          copy="Successful sourcing is built on trust, transparency, and long-term partnerships. These values form the foundation of our company and the leadership behind it."
        />
        <FoundersSection />
        <WhyChooseUsTiles />
      </main>
      <Footer />
    </div>
  );
}
