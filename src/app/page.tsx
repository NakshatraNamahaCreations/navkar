import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import VideoSlideHero from "@/components/sections/VideoSlideHero";
import TrustedBy from "@/components/sections/TrustedBy";
import ServicesShowcase from "@/components/sections/ServicesShowcase";
import Process from "@/components/sections/Process";
import Challenges from "@/components/sections/Challenges";
import Categories from "@/components/sections/Categories";
import WhoWeWorkWith from "@/components/sections/WhoWeWorkWith";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Consultation from "@/components/sections/Consultation";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Nav />
      <main className="flex flex-col flex-1">
        <VideoSlideHero />
        <TrustedBy />
        <Process />
        <WhyChooseUs />
        <Challenges />
        <Categories />
        <WhoWeWorkWith />
        <ServicesShowcase hideDetailRail hideCta />
        <Consultation />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
