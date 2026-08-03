import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/sections/GalleryGrid";

export const metadata = {
  title: "Gallery | Navkar Global Sourcing",
  description:
    "A look at the products, factories, and categories Navkar Global Sourcing works with.",
};

export default function GalleryPage() {
  return (
    <div className="flex flex-col flex-1">
      <Nav />
      <main className="flex flex-col flex-1">
        <PageHero
          variant="editorial"
          eyebrow="Gallery"
          title="A look inside"
          accentWord="our sourcing world."
          copy="Product categories, factory partners, and the work behind every shipment."
          meta={[
            { value: "11", label: "Categories on file" },
            { value: "40+", label: "Countries served" },
          ]}
        />
        <GalleryGrid />
      </main>
      <Footer />
    </div>
  );
}
