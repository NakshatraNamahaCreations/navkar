import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/sections/ContactForm";

export const metadata = {
  title: "Contact Us | Navkar Global Sourcing",
  description:
    "Get in touch with Navkar Global Sourcing — share your product requirement and our team will help you find the right supplier.",
};

export default function ContactUsPage() {
  return (
    <div className="flex flex-col flex-1">
      <Nav />
      <main className="flex flex-col flex-1">
        <PageHero
          variant="centered"
          eyebrow="Contact Us"
          title="Looking for the right"
          accentWord="product or supplier?"
          copy="Share your product requirement with our team. We will help you identify suitable suppliers, compare quotations and manage the complete sourcing process."
        />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
