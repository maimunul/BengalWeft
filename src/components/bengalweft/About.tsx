import aboutImg from "@/assets/about.jpg";
import { CheckCircle2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const highlights = [
  "Premium fabric sourcing from trusted global suppliers",
  "Transparent production management & reporting",
  "Compliance with international quality standards",
  "Small batch to large-scale production capability",
  "Long-term partnerships built on trust",
];

const About = () => {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="about" className="py-24 px-6 bg-background">
      <div ref={ref} className={`max-w-6xl mx-auto scroll-reveal transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg-custom">
              <img
                src={aboutImg}
                alt="BengalWeft Team"
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-gradient-gold rounded-xl p-5 shadow-gold">
              <p className="text-navy font-bold text-3xl">10+</p>
              <p className="text-navy/80 text-sm font-medium">Years Experience</p>
            </div>
            {/* Decorative element */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-gold rounded-2xl opacity-40" />
          </div>

          {/* Content */}
          <div>
            <p className="section-label">Welcome to BengalWeft</p>
            <h2 className="section-title mb-6">
              Where Vision<br />Becomes Reality
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              BengalWeft is a trusted buying and production house dedicated to delivering
              high-quality clothing solutions for global clients. We specialize in sourcing
              premium fabrics, developing samples, and managing full-scale garment production
              with precision and care.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              With a strong network of manufacturers and skilled professionals, we ensure
              every order meets international quality standards — from design to delivery.
              We value long-term partnerships built on trust, transparency, and timely service.
            </p>

            <ul className="space-y-3 mb-10">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm">{h}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center px-8 py-3.5 bg-gradient-navy text-white font-semibold rounded shadow-navy hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              Partner With Us →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
