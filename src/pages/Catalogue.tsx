import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, Filter } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import FloatingButtons from "@/components/bengalweft/FloatingButtons";

type Category = "all" | "men" | "women" | "kids" | "innerwear" | "activewear";

const categories: { key: Category; label: string }[] = [
  { key: "all", label: "All Products" },
  { key: "men", label: "Men" },
  { key: "women", label: "Women" },
  { key: "kids", label: "Kids" },
  { key: "innerwear", label: "Innerwear" },
  { key: "activewear", label: "Activewear" },
];

const products = [
  {
    category: "men" as Category,
    title: "Navy Oversized Hoodie",
    desc: "Heavy cotton sweatshirt fabric, zip-through, oversized fit. Available in S–3XL.",
    moq: "500 pcs",
    fabric: "100% Cotton Fleece, 320 GSM",
    imgUrl: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=500&h=600&fit=crop",
  },
  {
    category: "men" as Category,
    title: "Linen Lounge Set",
    desc: "Cotton linen casual set with Henley shirt and drawstring trousers. Relaxed fit.",
    moq: "300 pcs",
    fabric: "55% Linen, 45% Cotton",
    imgUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4b4af7?w=500&h=600&fit=crop",
  },
  {
    category: "men" as Category,
    title: "Striped Co-Ord Set",
    desc: "Stand collar short sleeve shirt and matching trousers. Smart casual styling.",
    moq: "300 pcs",
    fabric: "100% Cotton Poplin",
    imgUrl: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=600&fit=crop",
  },
  {
    category: "men" as Category,
    title: "Classic Denim Shirt",
    desc: "Button-down denim shirt in medium wash. Timeless design for everyday wear.",
    moq: "500 pcs",
    fabric: "100% Cotton Denim, 6oz",
    imgUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=600&fit=crop",
  },
  {
    category: "men" as Category,
    title: "Tailored Chino Trousers",
    desc: "Slim-fit chinos with stretch comfort. Available in 8 colors.",
    moq: "500 pcs",
    fabric: "98% Cotton, 2% Elastane Twill",
    imgUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&h=600&fit=crop",
  },
  {
    category: "men" as Category,
    title: "Essential T-Shirt 3-Pack",
    desc: "Set of 3 solid round-neck t-shirts. Pre-shrunk, bio-washed finish.",
    moq: "1000 pcs",
    fabric: "100% Combed Cotton, 180 GSM",
    imgUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop",
  },
  {
    category: "women" as Category,
    title: "Satin Pajama Set",
    desc: "Luxe satin shirt and bottoms with contrasting piping trim. Gift-box ready.",
    moq: "300 pcs",
    fabric: "100% Polyester Satin",
    imgUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop",
  },
  {
    category: "women" as Category,
    title: "Knit Loungewear Set",
    desc: "Summer 2-piece set with short-sleeve top and wide-leg pants. Ultra soft.",
    moq: "300 pcs",
    fabric: "95% Viscose, 5% Elastane",
    imgUrl: "https://images.unsplash.com/photo-1594938298605-c8148c4b4af7?w=500&h=600&fit=crop",
  },
  {
    category: "women" as Category,
    title: "Crew Neck T-Shirt Pack",
    desc: "Women's slim fit basics in 3 versatile colors. Soft hand-feel fabric.",
    moq: "1000 pcs",
    fabric: "100% Supima Cotton, 160 GSM",
    imgUrl: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=500&h=600&fit=crop",
  },
  {
    category: "women" as Category,
    title: "Floral Midi Dress",
    desc: "Printed midi dress with puff sleeves and smocked bodice. Available in 4 prints.",
    moq: "300 pcs",
    fabric: "100% Rayon Challis",
    imgUrl: "https://images.unsplash.com/photo-1512236258305-32d7f48ee8f6?w=500&h=600&fit=crop",
  },
  {
    category: "women" as Category,
    title: "Modal Pajama Set",
    desc: "Long-sleeve shirt and full-length bottom pajama set. Ultra-breathable.",
    moq: "500 pcs",
    fabric: "60% Modal, 40% Cotton",
    imgUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500&h=600&fit=crop",
  },
  {
    category: "women" as Category,
    title: "High-Neck Knit Top",
    desc: "Solid color tight-fitting knit top. Ribbed texture, assorted colors.",
    moq: "500 pcs",
    fabric: "95% Cotton, 5% Spandex Rib",
    imgUrl: "https://images.unsplash.com/photo-1561861422-a549073e547a?w=500&h=600&fit=crop",
  },
  {
    category: "kids" as Category,
    title: "Kids Playwear Set",
    desc: "Durable and comfortable everyday set with fun prints. Ages 2–10.",
    moq: "500 pcs",
    fabric: "100% Cotton Jersey, 180 GSM",
    imgUrl: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500&h=600&fit=crop",
  },
  {
    category: "kids" as Category,
    title: "Boys' Casual Polo Set",
    desc: "Breathable polo shirt with cargo shorts. Playful design in 5 colorways.",
    moq: "500 pcs",
    fabric: "100% Cotton Pique",
    imgUrl: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=500&h=600&fit=crop",
  },
  {
    category: "kids" as Category,
    title: "Girls' Summer Dress",
    desc: "Lightweight floral dress with flutter sleeves. Perfect for warm weather.",
    moq: "300 pcs",
    fabric: "100% Cotton Voile",
    imgUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&h=600&fit=crop",
  },
  {
    category: "innerwear" as Category,
    title: "Premium Cotton Briefs Pack",
    desc: "All-day comfort innerwear set in classic neutrals. Tagless design.",
    moq: "1000 pcs",
    fabric: "100% Combed Cotton, 200 GSM",
    imgUrl: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&h=600&fit=crop",
  },
  {
    category: "innerwear" as Category,
    title: "Sports Performance Briefs",
    desc: "Moisture-wicking active innerwear with anti-chafe flatlock seams.",
    moq: "1000 pcs",
    fabric: "90% Nylon, 10% Spandex",
    imgUrl: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500&h=600&fit=crop",
  },
  {
    category: "innerwear" as Category,
    title: "Thermal Base Layer Set",
    desc: "Warm base layer top and bottom for cold weather. Lightweight insulation.",
    moq: "500 pcs",
    fabric: "60% Merino Wool, 40% Polyester",
    imgUrl: "https://images.unsplash.com/photo-1544441893-675973e31985?w=500&h=600&fit=crop",
  },
  {
    category: "activewear" as Category,
    title: "Performance Jogger Set",
    desc: "Zip-up track jacket with tapered joggers. Moisture-wicking tech fabric.",
    moq: "500 pcs",
    fabric: "88% Polyester, 12% Spandex",
    imgUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=600&fit=crop",
  },
  {
    category: "activewear" as Category,
    title: "Training Tank & Shorts",
    desc: "Lightweight gym set with mesh ventilation panels. Quick dry technology.",
    moq: "500 pcs",
    fabric: "100% Recycled Polyester",
    imgUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=600&fit=crop",
  },
  {
    category: "activewear" as Category,
    title: "Yoga Leggings & Bra Set",
    desc: "High-waist compression leggings with matching sports bra. Squat-proof.",
    moq: "300 pcs",
    fabric: "75% Nylon, 25% Spandex",
    imgUrl: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=500&h=600&fit=crop",
  },
];

const Catalogue = () => {
  const [active, setActive] = useState<Category>("all");
  const [quoteItem, setQuoteItem] = useState<string | null>(null);
  const { ref, visible } = useScrollReveal();

  const filtered = active === "all" ? products : products.filter((p) => p.category === active);

  const handleQuote = (title: string) => {
    setQuoteItem(title);
    const subject = encodeURIComponent(`Quote Request: ${title}`);
    const body = encodeURIComponent(`Hi BengalWeft,\n\nI'm interested in getting a quote for "${title}".\n\nPlease share pricing, lead time, and available customization options.\n\nThank you.`);
    window.open(`mailto:info@bengalweft.com?subject=${subject}&body=${body}`, "_self");
    setTimeout(() => setQuoteItem(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-navy text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-gold rounded flex items-center justify-center">
              <span className="text-navy font-bold text-sm font-serif">BW</span>
            </div>
            <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Bengal<span className="text-gold">Weft</span>
            </span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-white/80 hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-navy py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gold text-sm font-semibold uppercase tracking-[0.3em] mb-4">Product Catalogue</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Our Garment Collections
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Browse our full range of apparel categories. Each product can be customized to your brand specifications. Request a quote to get started.
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-16 px-6">
        <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Category Filters */}
          <div className="flex items-center gap-3 mb-10 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                className={`px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wide transition-all duration-200 ${
                  active === c.key
                    ? "bg-gradient-gold text-navy shadow-gold"
                    : "bg-secondary text-muted-foreground hover:bg-navy hover:text-white"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-muted-foreground text-sm mb-6">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> products
          </p>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product) => (
              <div
                key={`${product.category}-${product.title}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-navy transition-all duration-300 hover:-translate-y-1 border border-border"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.imgUrl}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute top-4 right-4 px-3 py-1 bg-gold text-navy text-xs font-bold rounded-full capitalize">
                    {product.category}
                  </span>
                </div>

                {/* Details */}
                <div className="p-6">
                  <h3
                    className="font-bold text-navy text-lg mb-2 group-hover:text-gold transition-colors duration-200"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {product.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {product.desc}
                  </p>

                  {/* Specs */}
                  <div className="flex flex-col gap-2 mb-5 text-xs">
                    <div className="flex items-center justify-between bg-secondary/50 rounded-lg px-3 py-2">
                      <span className="text-muted-foreground uppercase tracking-wider font-medium">Fabric</span>
                      <span className="text-foreground font-semibold">{product.fabric}</span>
                    </div>
                    <div className="flex items-center justify-between bg-secondary/50 rounded-lg px-3 py-2">
                      <span className="text-muted-foreground uppercase tracking-wider font-medium">MOQ</span>
                      <span className="text-foreground font-semibold">{product.moq}</span>
                    </div>
                  </div>

                  {/* Quote Button */}
                  <button
                    onClick={() => handleQuote(product.title)}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-navy text-white text-sm font-semibold rounded-lg shadow-navy hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                  >
                    {quoteItem === product.title ? (
                      "Opening Email..."
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Request a Quote
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-navy py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Can't Find What You Need?
          </h2>
          <p className="text-white/70 mb-8">
            We specialize in custom garment production. Share your design and we'll bring it to life.
          </p>
          <a
            href="mailto:info@bengalweft.com?subject=Custom%20Product%20Inquiry"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-gold text-navy font-semibold rounded shadow-gold hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
          >
            <Send className="w-4 h-4" />
            Contact Us for Custom Orders
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy py-6 px-6 text-center">
        <p className="text-white/50 text-xs">
          © {new Date().getFullYear()} BengalWeft. All rights reserved.
        </p>
      </footer>

      <FloatingButtons />
    </div>
  );
};

export default Catalogue;
