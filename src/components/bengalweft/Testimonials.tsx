import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const testimonials = [
  {
    name: "Michael Anderson",
    role: "CEO, UrbanWear USA",
    initials: "MA",
    text: "Working with BengalWeft has completely transformed our sourcing process. Their commitment to premium quality, transparency, and on-time delivery is exceptional. Every shipment exceeds expectations.",
  },
  {
    name: "Sophia Martinez",
    role: "Product Director, StyleLine Europe",
    initials: "SM",
    text: "Their attention to detail and strict quality control system give us complete confidence in every production run. From fabric sourcing to final inspection, everything is handled with precision.",
  },
  {
    name: "David Lee",
    role: "Import Manager, TrendSet Apparel",
    initials: "DL",
    text: "Reliability is critical in our business, and this team consistently delivers. Strong factory partnerships, competitive pricing, and clear communication make them one of the best sourcing partners.",
  },
  {
    name: "Emma Johnson",
    role: "Founder, PureFashion Co.",
    initials: "EJ",
    text: "The sampling process was smooth, and bulk production maintained the same high standard. Their dedication to ethical manufacturing aligns perfectly with our brand values.",
  },
  {
    name: "James Wilson",
    role: "Brand Owner, NextGen Clothing",
    initials: "JW",
    text: "They are more than just a buying house — they are a strategic growth partner. Their market knowledge and commitment to excellence help us stay competitive in global markets.",
  },
  {
    name: "Olivia Brown",
    role: "Head of Procurement, Elite Garments",
    initials: "OB",
    text: "Professional, responsive, and quality-driven. Every order reflects careful inspection and international compliance standards. We confidently recommend them to any global apparel brand.",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  const { ref, visible } = useScrollReveal();

  return (
    <section className="py-24 px-6 bg-gradient-navy">
      <div ref={ref} className={`max-w-4xl mx-auto scroll-reveal transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="text-center mb-16">
          <p className="inline-block text-sm font-semibold uppercase tracking-widest text-gold mb-3">
            Testimonials
          </p>
          <h2 className="section-title-light">What Our Clients Say</h2>
        </div>

        {/* Avatar row */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setCurrent(i)}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                i === current
                  ? "bg-gradient-gold text-navy scale-110 shadow-gold"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              {t.initials}
            </button>
          ))}
        </div>

        {/* Quote card */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-10 md:p-14 text-center relative">
          <Quote className="w-10 h-10 text-gold mx-auto mb-6 opacity-80" />
          <p className="text-white text-lg md:text-xl leading-relaxed mb-8 italic font-light">
            "{t.text}"
          </p>
          <div>
            <p className="text-gold font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
              {t.name}
            </p>
            <p className="text-white/70 text-sm mt-1">{t.role}</p>
          </div>

          {/* Nav arrows */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/15 hover:bg-gold rounded-full flex items-center justify-center text-white hover:text-navy transition-all duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/15 hover:bg-gold rounded-full flex items-center justify-center text-white hover:text-navy transition-all duration-200"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current ? "w-6 h-2 bg-gold" : "w-2 h-2 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
