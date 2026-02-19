import { useState } from "react";
import { Link } from "react-router-dom";

type Category = "all" | "men" | "women" | "kids" | "innerwear";

const filters: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "men", label: "Men" },
  { key: "women", label: "Women" },
  { key: "kids", label: "Kids" },
  { key: "innerwear", label: "Innerwear" },
];

const projects = [
  {
    category: "men" as Category,
    title: "H&M Navy Hoodie",
    desc: "A navy blue oversized zip-through hoodie made of heavy cotton sweatshirt fabric.",
    imgUrl: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&h=400&fit=crop",
  },
  {
    category: "men" as Category,
    title: "Linen Lounge Set",
    desc: "Men's cotton linen casual lounge set with long-sleeve Henley shirt and drawstring trousers.",
    imgUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4b4af7?w=400&h=400&fit=crop",
  },
  {
    category: "men" as Category,
    title: "Striped Co-Ords",
    desc: "Striped stand collar short sleeve shirt and matching trousers co-ordinate set.",
    imgUrl: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop",
  },
  {
    category: "men" as Category,
    title: "Denim Shirt Set",
    desc: "Striped button-down shirt paired with classic blue denim jeans, a versatile everyday set.",
    imgUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop",
  },
  {
    category: "men" as Category,
    title: "Tailored Trousers Set",
    desc: "Striped button-down shirt with tailored trousers, a smart-casual combination.",
    imgUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=400&fit=crop",
  },
  {
    category: "men" as Category,
    title: "Unisex T-Shirt Pack",
    desc: "Set of 3 unisex solid round-neck t-shirts in maroon, white, and black colorways.",
    imgUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
  },
  {
    category: "women" as Category,
    title: "Satin Pajama Set",
    desc: "H&M satin pajamas featuring a shirt and bottoms with contrasting piping trim.",
    imgUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop",
  },
  {
    category: "women" as Category,
    title: "Knit Loungewear",
    desc: "Women's summer 2-piece knit loungewear set with short-sleeve top and wide-leg pants.",
    imgUrl: "https://images.unsplash.com/photo-1594938298605-c8148c4b4af7?w=400&h=400&fit=crop",
  },
  {
    category: "women" as Category,
    title: "Crew Neck T-Shirt Set",
    desc: "Women's basic crew neck slim fit t-shirt set, essentials in three versatile colors.",
    imgUrl: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=400&h=400&fit=crop",
  },
  {
    category: "women" as Category,
    title: "Purple Pajama Set",
    desc: "Purple women's pajama set with short-sleeved button-down top and full-length pants.",
    imgUrl: "https://images.unsplash.com/photo-1512236258305-32d7f48ee8f6?w=400&h=400&fit=crop",
  },
  {
    category: "women" as Category,
    title: "Modal PJ Set",
    desc: "Amazon Essentials cotton modal long-sleeve shirt and full-length bottom pajama set.",
    imgUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=400&fit=crop",
  },
  {
    category: "women" as Category,
    title: "High-Neck Knit Tops",
    desc: "Teen girls' solid color high-neck tight-fitting knit tops in assorted colors.",
    imgUrl: "https://images.unsplash.com/photo-1561861422-a549073e547a?w=400&h=400&fit=crop",
  },
  {
    category: "kids" as Category,
    title: "Kids Playwear Set",
    desc: "Comfortable and durable kids' playwear set suitable for everyday activities.",
    imgUrl: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop",
  },
  {
    category: "kids" as Category,
    title: "Boys' Casual Set",
    desc: "Stylish casual set for boys featuring breathable fabric and playful design.",
    imgUrl: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=400&fit=crop",
  },
  {
    category: "kids" as Category,
    title: "Girls' Summer Dress",
    desc: "Light and flowy summer dress for girls with vibrant floral print.",
    imgUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop",
  },
  {
    category: "innerwear" as Category,
    title: "Cotton Innerwear Set",
    desc: "Premium cotton innerwear set offering all-day comfort and softness.",
    imgUrl: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=400&fit=crop",
  },
  {
    category: "innerwear" as Category,
    title: "Sports Innerwear",
    desc: "Moisture-wicking sports innerwear designed for active performance.",
    imgUrl: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&h=400&fit=crop",
  },
  {
    category: "innerwear" as Category,
    title: "Thermal Base Layer",
    desc: "Warm and cozy thermal base layer set for cold weather comfort.",
    imgUrl: "https://images.unsplash.com/photo-1544441893-675973e31985?w=400&h=400&fit=crop",
  },
];

import { useScrollReveal } from "@/hooks/useScrollReveal";

const Portfolio = () => {
  const [active, setActive] = useState<Category>("all");
  const { ref, visible } = useScrollReveal();

  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-24 px-6 bg-background">
      <div ref={ref} className={`max-w-6xl mx-auto scroll-reveal transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="text-center mb-12">
          <p className="section-label">Our Work</p>
          <h2 className="section-title">Latest Projects</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-4">
            Explore our garment collections across categories — crafted with precision for global brands.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wide transition-all duration-200 ${
                active === f.key
                  ? "bg-gradient-gold text-navy shadow-gold"
                  : "bg-secondary text-muted-foreground hover:bg-navy hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div
              key={`${project.category}-${project.title}`}
              className="portfolio-item group relative rounded-2xl overflow-hidden shadow-card bg-white"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.imgUrl}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                {/* Category badge */}
                <span className="absolute top-4 right-4 px-3 py-1 bg-gold text-navy text-xs font-bold rounded-full capitalize">
                  {project.category}
                </span>
                {/* Overlay */}
                <div className="portfolio-overlay absolute inset-0 flex items-center justify-center p-6">
                  <p className="text-white text-sm text-center leading-relaxed">{project.desc}</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-navy text-base group-hover:text-gold transition-colors duration-200" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Catalogue CTA */}
        <div className="text-center mt-12">
          <Link
            to="/catalogue"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-gold text-navy font-semibold rounded shadow-gold hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
          >
            View Full Catalogue →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
