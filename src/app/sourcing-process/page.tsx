import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Process from "@/components/sections/Process";

export const metadata = {
  title: "Sourcing Process | Navkar Global Sourcing",
  description:
    "From client enquiry to final delivery — the 12-step sourcing process behind every order at Navkar Global Sourcing.",
};

export default function SourcingProcessPage() {
  return (
    <div className="flex flex-col flex-1">
      <Nav />
      <main className="flex flex-col flex-1">
        <PageHero
          variant="editorial"
          eyebrow="Sourcing Process"
          title="How we"
          accentWord="work together."
          copy="For the accountable handling of every order — twelve steps, one desk, from your first enquiry to final delivery."
          meta={[
            { value: "12", label: "Steps" },
            { value: "01", label: "Single point of contact" },
          ]}
        />
        <Process hideHeading />
      </main>
      <Footer />
    </div>
  );
}
