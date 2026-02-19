import sourcingImg from "@/assets/service-sourcing.jpg";
import sampleImg from "@/assets/service-sample.jpg";
import bulkImg from "@/assets/service-bulk.jpg";
import qualityImg from "@/assets/service-quality.jpg";
import packagingImg from "@/assets/service-packaging.jpg";
import shippingImg from "@/assets/service-shipping.jpg";

const services = [
  {
    image: sourcingImg,
    title: "Sourcing Fabrics",
    description: "We source high-quality fabrics from trusted suppliers to meet your design and production needs.",
    tag: "Raw Materials",
  },
  {
    image: sampleImg,
    title: "Sample Development",
    description: "Our team creates precise and detailed samples to ensure your vision comes to life perfectly.",
    tag: "Pre-Production",
  },
  {
    image: bulkImg,
    title: "Bulk Production",
    description: "We manage large-scale garment production efficiently, maintaining consistency and quality at scale.",
    tag: "Manufacturing",
  },
  {
    image: qualityImg,
    title: "Quality Control",
    description: "Every piece undergoes strict quality checks at multiple stages to meet international standards.",
    tag: "Inspection",
  },
  {
    image: packagingImg,
    title: "Premium Packaging",
    description: "We provide elegant and secure packaging that reflects your brand's identity and values.",
    tag: "Finishing",
  },
  {
    image: shippingImg,
    title: "Shipping & Logistics",
    description: "Our reliable shipping and logistics solutions ensure your orders arrive on time, perfectly.",
    tag: "Delivery",
  },
];

import { useScrollReveal } from "@/hooks/useScrollReveal";

const Services = () => {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="services" className="py-24 px-6 bg-secondary/30">
      <div ref={ref} className={`max-w-6xl mx-auto scroll-reveal transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="text-center mb-16">
          <p className="section-label">What We Offer</p>
          <h2 className="section-title">Our Core Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            End-to-end garment solutions — from fabric sourcing to global delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="service-card group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-navy transition-all duration-400 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-card-img w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                {/* Tag */}
                <span className="absolute top-4 left-4 px-3 py-1 bg-gold text-navy text-xs font-bold rounded-full uppercase tracking-wide">
                  {service.tag}
                </span>
                {/* Overlay text */}
                <div className="portfolio-overlay absolute inset-0 flex items-end p-5">
                  <p className="text-white text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-navy text-lg mb-2 group-hover:text-gold transition-colors duration-200" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
