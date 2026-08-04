import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import BlogGrid from "@/components/sections/BlogGrid";

export const metadata = {
  title: "Sourcing & Procurement Blog | Navkar Global Sourcing",
  description:
    "Practical guides on supplier verification, quality inspection, MOQ negotiation, freight, and landed cost — written by the Navkar Global Sourcing team for importers sourcing from China.",
};

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
          copy="Practical notes on supplier verification, quality inspection, procurement strategy, and logistics — written by the team handling global sourcing every day."
        />
        <BlogGrid />
      </main>
      <Footer />
    </div>
  );
}
