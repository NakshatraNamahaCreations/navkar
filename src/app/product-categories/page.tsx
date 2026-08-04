import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CategoriesCarousel from "@/components/sections/CategoriesCarousel";
import CategoriesDetail from "@/components/sections/CategoriesDetail";
import Challenges from "@/components/sections/Challenges";

export const metadata = {
  title: "Product Categories | Navkar Global Sourcing",
  description:
    "From bulk hardware to boutique jewellery, source confidently across every product category with verified factories, competitive pricing, and dedicated quality control.",
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
          copy="From bulk hardware to boutique jewellery, source confidently across every product category with verified factories, competitive pricing, and dedicated quality control."
        />
        <CategoriesCarousel />
        <CategoriesDetail />
        <Challenges />
      </main>
      <Footer />
    </div>
  );
}
