import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CategoriesCarousel from "@/components/sections/CategoriesCarousel";
import CategoriesDetail from "@/components/sections/CategoriesDetail";
import Challenges from "@/components/sections/Challenges";

export const metadata = {
  title: "Product Categories | Navkar Global Sourcing",
  description:
    "From everyday essentials to specialized products, Navkar Global Sourcing connects you with verified manufacturers across every product category, backed by competitive pricing, dependable Supplier Verification Services, and dedicated Product Quality Inspection at every stage.",
};

export default function ProductCategoriesPage() {
  return (
    <div className="flex flex-col flex-1">
      <Nav />
      <main className="flex flex-col flex-1">
        <PageHero
          variant="centered"
          eyebrow="Product Categories"
          title="Categories"
          accentWord="we cater to."
          copy="From everyday essentials to specialized products, Navkar Global Sourcing connects you with verified manufacturers, competitive pricing, and dedicated quality inspection at every stage."
        />
        <CategoriesCarousel />
        <CategoriesDetail />
        <Challenges />
      </main>
      <Footer />
    </div>
  );
}
