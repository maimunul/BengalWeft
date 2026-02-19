import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
  {
    image: hero1,
    label: "Your Reliable Partner for Global Garment Brands",
    title: ["Quality", "Trust", "Excellence"],
    subtitle: "From sourcing to delivery — we make global garment production seamless.",
  },
  {
    image: hero2,
    label: "Bringing Your Fashion Vision to Life",
    title: ["Designed", "Made", "Delivered"],
    subtitle: "Premium fabrics, expert craftsmanship, and international quality standards.",
  },
  {
    image: hero3,
    label: "Crafting Style with Precision and Care",
    title: ["Cut", "Sewn", "Perfected"],
    subtitle: "Small batches or large scale — we handle it all with care.",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = (index: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 300);
  };

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const slide = slides[current];

  return (
    <section id="home" className="relative h-[92vh] min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${animating ? "opacity-0" : "opacity-100"}`}
      >
        <img
          src={slide.image}
          alt="Hero"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 h-full flex flex-col items-center justify-center text-center px-6 transition-all duration-500 ${
          animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        <div className="max-w-4xl">
          <p className="text-gold text-sm md:text-base font-semibold uppercase tracking-[0.3em] mb-5">
            {slide.label}
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1]">
            {slide.title.map((word, i) => (
              <span key={word}>
                {word}
                <span className="text-gold">.</span>
                {i < slide.title.length - 1 && " "}
              </span>
            ))}
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
            {slide.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-3.5 bg-gradient-gold text-navy font-semibold rounded shadow-gold hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              Learn More
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-3.5 border-2 border-white/60 text-white font-semibold rounded hover:border-gold hover:text-gold transition-all duration-200"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/15 hover:bg-gold border border-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/15 hover:bg-gold border border-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current ? "w-8 h-2 bg-gold" : "w-2 h-2 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-2 text-white/60">
        <span className="text-xs uppercase tracking-widest rotate-90 origin-center mb-6">Scroll</span>
        <div className="w-px h-12 bg-white/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full bg-gold animate-bounce" style={{ height: "40%" }} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
