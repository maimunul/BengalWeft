import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const faqs = [
  {
    q: "What services does BengalWeft provide?",
    a: "We specialize in fabric sourcing, sample development, bulk clothing production, quality control, premium packaging, and reliable shipping & logistics.",
  },
  {
    q: "How can I place an order?",
    a: "You can contact us via email, phone, or our website inquiry form with your requirements, and our team will guide you through the order process.",
  },
  {
    q: "Do you handle small or large orders?",
    a: "Yes! We cater to both small-batch samples and large-scale production orders to meet the needs of brands and retailers of all sizes.",
  },
  {
    q: "How do you ensure product quality?",
    a: "Every garment undergoes strict quality checks at multiple stages, including fabric inspection, sample approval, and final production, to meet international standards.",
  },
  {
    q: "Can you help with custom designs?",
    a: "Absolutely! We work closely with clients to bring their designs to life, providing sample development and production support tailored to your specifications.",
  },
  {
    q: "What are your shipping options?",
    a: "We offer reliable shipping and logistics solutions, ensuring that your orders reach you safely and on time, both locally and internationally.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, visible } = useScrollReveal();

  return (
    <section className="py-24 px-6 bg-secondary/30">
      <div ref={ref} className={`max-w-4xl mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="text-center mb-16">
          <p className="section-label">FAQ</p>
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-card border border-border overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/30 transition-colors duration-200"
              >
                <span className="font-semibold text-navy text-sm md:text-base pr-4">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gold flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6">
                  <div className="border-t border-border pt-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
