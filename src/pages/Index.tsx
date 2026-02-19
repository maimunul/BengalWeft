import Navbar from "@/components/bengalweft/Navbar";
import Hero from "@/components/bengalweft/Hero";
import FeatureStrip from "@/components/bengalweft/FeatureStrip";
import About from "@/components/bengalweft/About";
import Stats from "@/components/bengalweft/Stats";
import Services from "@/components/bengalweft/Services";
import Portfolio from "@/components/bengalweft/Portfolio";
import Testimonials from "@/components/bengalweft/Testimonials";
import FAQ from "@/components/bengalweft/FAQ";
import Contact from "@/components/bengalweft/Contact";
import Footer from "@/components/bengalweft/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeatureStrip />
      <About />
      <Stats />
      <Services />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
