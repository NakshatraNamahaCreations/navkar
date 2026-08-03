import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Categories from "@/components/sections/Categories";
import Challenges from "@/components/sections/Challenges";

export const metadata = {
  title: "Product Categories | Navkar Global Sourcing",
  description:
    "Eleven sourcing lines in continuous motion — bulk hardware to boutique jewellery, each with its own vetted factory bench.",
};

export default function ProductCategoriesPage() {
  return (
    <div className="flex flex-col flex-1">
      <Nav />
      <main className="flex flex-col flex-1">
        <PageHero
          variant="light"
          eyebrow="Product Categories"
          title="Categories"
          accentWord="we cater to."
          copy="Eleven sourcing lines in continuous motion — bulk hardware to boutique jewellery, each with its own vetted factory bench."
          meta={[
            { value: "11", label: "Category lines" },
            { value: "600+", label: "Audited manufacturers" },
          ]}
        />
        <Categories hideHeading />
        <Challenges />
      </main>
      <Footer />
    </div>
  );
}
