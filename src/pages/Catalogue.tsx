import { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, Filter, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import FloatingButtons from "@/components/bengalweft/FloatingButtons";
import logo from "@/assets/bengalweft-logo.jpeg";

// Local product images
import productHoodie from "@/assets/product-hoodie.jpg";
import productLinenSet from "@/assets/product-linen-set.jpg";
import productStripedCoords from "@/assets/product-striped-coords.jpg";
import productDenimSet from "@/assets/product-denim-set.jpg";
import productTshirtPack from "@/assets/product-tshirt-pack.jpg";
import productSatinPj from "@/assets/product-satin-pj.jpg";
import productKnitLounge from "@/assets/product-knit-lounge.jpg";
import productWomenTshirts from "@/assets/product-women-tshirts.jpg";
import productKnitTops from "@/assets/product-knit-tops.jpg";
import productKidsPlaywear from "@/assets/product-kids-playwear.jpg";
import productBoysCasual from "@/assets/product-boys-casual.jpg";
import productGirlsDress from "@/assets/product-girls-dress.jpg";
import productCottonInnerwear from "@/assets/product-cotton-innerwear.jpg";
import productSportsInnerwear from "@/assets/product-sports-innerwear.jpg";
import productThermal from "@/assets/product-thermal.jpg";
import productFilaTshirt from "@/assets/product-fila-tshirt.jpg";
import productRegularPajama from "@/assets/product-regular-pajama.jpg";
import productCatPajamaSet from "@/assets/product-cat-pajama-set.jpg";
import productJockstrap from "@/assets/product-jockstrap.png";
import productThong from "@/assets/product-thong.jpg";
import productSpecialPajama from "@/assets/product-special-pajama.jpg";
import productPremiumPajama from "@/assets/product-premium-pajama.jpg";
import productJockstrapDetail from "@/assets/product-jockstrap-detail.jpg";
import productPurplePj from "@/assets/product-purple-pj.jpg";

type Category = "all" | "men" | "women" | "kids" | "innerwear" | "activewear";

const categories: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "men", label: "Men" },
  { key: "women", label: "Women" },
  { key: "kids", label: "Kids" },
  { key: "innerwear", label: "Innerwear" },
  { key: "activewear", label: "Activewear" },
];

interface Product {
  category: Category;
  title: string;
  desc: string;
  moq: string;
  fabric: string;
  img: string;
}

const products: Product[] = [
  { category: "men", title: "Navy Oversized Hoodie", desc: "Heavy cotton sweatshirt fabric, zip-through, oversized fit. Available in S–3XL.", moq: "500 pcs", fabric: "100% Cotton Fleece, 320 GSM", img: productHoodie },
  { category: "men", title: "Linen Lounge Set", desc: "Cotton linen casual set with Henley shirt and drawstring trousers. Relaxed fit.", moq: "500 pcs", fabric: "55% Linen, 45% Cotton", img: productLinenSet },
  { category: "men", title: "Striped Co-Ord Set", desc: "Stand collar short sleeve shirt and matching trousers. Smart casual styling.", moq: "500 pcs", fabric: "100% Cotton Poplin", img: productStripedCoords },
  { category: "men", title: "Classic Denim Shirt", desc: "Button-down denim shirt in medium wash. Timeless design for everyday wear.", moq: "500 pcs", fabric: "100% Cotton Denim, 6oz", img: productDenimSet },
  { category: "men", title: "Essential T-Shirt 3-Pack", desc: "Set of 3 solid round-neck t-shirts. Pre-shrunk, bio-washed finish.", moq: "500 pcs", fabric: "100% Combed Cotton, 180 GSM", img: productTshirtPack },
  { category: "men", title: "Regular Pajama", desc: "Classic white regular-fit pajama in micro cotton spandex. Elastic waist with back pocket.", moq: "500 pcs", fabric: "95% Cotton, 5% Spandex Micro", img: productRegularPajama },
  { category: "men", title: "Special Pleat Pajama", desc: "Special pajama with front pleat detailing. Premium micro cotton spandex fabric.", moq: "500 pcs", fabric: "95% Cotton, 5% Spandex Micro", img: productSpecialPajama },
  { category: "men", title: "Premium Twill Pajama", desc: "Premium pajama in twill cotton spandex fabric for superior comfort and durability.", moq: "500 pcs", fabric: "97% Cotton, 3% Spandex Twill", img: productPremiumPajama },
  { category: "women", title: "Satin Pajama Set", desc: "Luxe satin shirt and bottoms with contrasting piping trim. Gift-box ready.", moq: "500 pcs", fabric: "100% Polyester Satin", img: productSatinPj },
  { category: "women", title: "Knit Loungewear Set", desc: "Summer 2-piece set with short-sleeve top and wide-leg pants. Ultra soft.", moq: "500 pcs", fabric: "95% Viscose, 5% Elastane", img: productKnitLounge },
  { category: "women", title: "Crew Neck T-Shirt Pack", desc: "Women's slim fit basics in 3 versatile colors. Soft hand-feel fabric.", moq: "500 pcs", fabric: "100% Supima Cotton, 160 GSM", img: productWomenTshirts },
  { category: "women", title: "Purple Pajama Set", desc: "Purple women's pajama set with short-sleeved button-down top and full-length pants.", moq: "500 pcs", fabric: "100% Cotton Poplin", img: productPurplePj },
  { category: "women", title: "High-Neck Knit Top", desc: "Solid color tight-fitting knit top. Ribbed texture, assorted colors.", moq: "500 pcs", fabric: "95% Cotton, 5% Spandex Rib", img: productKnitTops },
  { category: "women", title: "Cat Sweatshirt Pajama Set", desc: "Cozy cat-print long-sleeve sweatshirt paired with comfortable pajama bottoms.", moq: "500 pcs", fabric: "100% Cotton French Terry, 280 GSM", img: productCatPajamaSet },
  { category: "kids", title: "Kids Playwear Set", desc: "Durable and comfortable everyday set with fun prints. Ages 2–10.", moq: "500 pcs", fabric: "100% Cotton Jersey, 180 GSM", img: productKidsPlaywear },
  { category: "kids", title: "Boys' Casual Polo Set", desc: "Breathable polo shirt with cargo shorts. Playful design in 5 colorways.", moq: "500 pcs", fabric: "100% Cotton Pique", img: productBoysCasual },
  { category: "kids", title: "Girls' Summer Dress", desc: "Lightweight floral dress with flutter sleeves. Perfect for warm weather.", moq: "500 pcs", fabric: "100% Cotton Voile", img: productGirlsDress },
  { category: "innerwear", title: "Premium Cotton Briefs Pack", desc: "All-day comfort innerwear set in classic neutrals. Tagless design.", moq: "500 pcs", fabric: "100% Combed Cotton, 200 GSM", img: productCottonInnerwear },
  { category: "innerwear", title: "Sports Performance Briefs", desc: "Moisture-wicking active innerwear with anti-chafe flatlock seams.", moq: "500 pcs", fabric: "90% Nylon, 10% Spandex", img: productSportsInnerwear },
  { category: "innerwear", title: "Thermal Base Layer Set", desc: "Warm base layer top and bottom for cold weather. Lightweight insulation.", moq: "500 pcs", fabric: "60% Merino Wool, 40% Polyester", img: productThermal },
  { category: "innerwear", title: "Jockstrap Collection", desc: "Premium jockstrap underwear in vibrant coral, mint, and pink with branded waistband.", moq: "500 pcs", fabric: "85% Nylon, 15% Spandex", img: productJockstrap },
  { category: "innerwear", title: "Jockstrap Detail View", desc: "Athletic jockstrap with branded waistband, available in multiple colorways.", moq: "500 pcs", fabric: "85% Nylon, 15% Spandex", img: productJockstrapDetail },
  { category: "innerwear", title: "Thong Collection", desc: "Fashionable thong underwear set in tie-dye and printed designs.", moq: "500 pcs", fabric: "92% Cotton, 8% Spandex", img: productThong },
  { category: "activewear", title: "FILA Mesh T-Shirt", desc: "Sporty mesh panel t-shirt with embroidery details. Available in off-white and black.", moq: "500 pcs", fabric: "100% Polyester Mesh, 150 GSM", img: productFilaTshirt },
];

const Catalogue = () => {
  const [active, setActive] = useState<Category>("all");
  const [quoteItem, setQuoteItem] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStart = useRef<number | null>(null);

  const filtered = active === "all" ? products : products.filter((p) => p.category === active);

  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, goNext, goPrev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev();
    }
    touchStart.current = null;
  };

  const currentProduct = lightboxIndex !== null ? filtered[lightboxIndex] : null;

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <img src={logo} alt="BengalWeft" className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
            <span className="text-lg sm:text-xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Bengal<span className="text-gold">Weft</span>
            </span>
          </Link>
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/80 hover:text-gold transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-navy py-10 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gold text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">Product Catalogue</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-3 sm:mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Our Garment Collections
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-sm sm:text-base px-2">
            Browse our full range of apparel categories. Each product can be customized to your brand specifications.
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-10 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Category Filters */}
          <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-10 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground hidden sm:block" />
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => { setActive(c.key); setLightboxIndex(null); }}
                className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wide transition-all duration-200 ${
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
          <p className="text-muted-foreground text-xs sm:text-sm mb-4 sm:mb-6">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> products
          </p>

          {/* Product Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-8">
            {filtered.map((product, idx) => (
              <div
                key={`${product.category}-${product.title}`}
                className="group bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-card hover:shadow-navy transition-all duration-300 hover:-translate-y-1 border border-border"
              >
                {/* Image */}
                <div
                  className="relative h-36 sm:h-48 md:h-64 overflow-hidden cursor-pointer"
                  onClick={() => setLightboxIndex(idx)}
                >
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute top-2 right-2 md:top-4 md:right-4 px-2 md:px-3 py-0.5 md:py-1 bg-gold text-navy text-[10px] md:text-xs font-bold rounded-full capitalize">
                    {product.category}
                  </span>
                </div>

                {/* Details */}
                <div className="p-3 sm:p-4 md:p-6">
                  <h3
                    className="font-bold text-navy text-xs sm:text-sm md:text-lg mb-1 sm:mb-2 group-hover:text-gold transition-colors duration-200 line-clamp-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {product.title}
                  </h3>
                  <p className="text-muted-foreground text-[10px] sm:text-xs md:text-sm leading-relaxed mb-2 sm:mb-4 line-clamp-2 md:line-clamp-3">
                    {product.desc}
                  </p>

                  {/* Specs */}
                  <div className="flex flex-col gap-1 sm:gap-2 mb-3 sm:mb-5 text-[10px] sm:text-xs">
                    <div className="flex items-center justify-between bg-secondary/50 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2">
                      <span className="text-muted-foreground uppercase tracking-wider font-medium">Fabric</span>
                      <span className="text-foreground font-semibold text-right max-w-[55%] truncate">{product.fabric}</span>
                    </div>
                    <div className="flex items-center justify-between bg-secondary/50 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2">
                      <span className="text-muted-foreground uppercase tracking-wider font-medium">MOQ</span>
                      <span className="text-foreground font-semibold">{product.moq}</span>
                    </div>
                  </div>

                  {/* Quote Button */}
                  <button
                    onClick={() => handleQuote(product.title)}
                    className="w-full flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 bg-gradient-navy text-white text-[10px] sm:text-sm font-semibold rounded-lg shadow-navy hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                  >
                    {quoteItem === product.title ? (
                      "Opening Email..."
                    ) : (
                      <>
                        <Send className="w-3 h-3 sm:w-4 sm:h-4" />
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
      <section className="bg-gradient-navy py-10 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Can't Find What You Need?
          </h2>
          <p className="text-white/70 mb-6 sm:mb-8 text-sm sm:text-base">
            We specialize in custom garment production. Share your design and we'll bring it to life.
          </p>
          <a
            href="mailto:info@bengalweft.com?subject=Custom%20Product%20Inquiry"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-gold text-navy font-semibold rounded shadow-gold hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 text-sm sm:text-base"
          >
            <Send className="w-4 h-4" />
            Contact Us for Custom Orders
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy py-4 sm:py-6 px-4 sm:px-6 text-center">
        <p className="text-white/50 text-xs">
          © {new Date().getFullYear()} BengalWeft. All rights reserved.
        </p>
      </footer>

      <FloatingButtons />

      {/* Lightbox Modal with Navigation */}
      <Dialog open={lightboxIndex !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-[100vw] max-h-[100vh] w-screen h-screen p-0 bg-black/95 border-none shadow-none [&>button]:hidden rounded-none">
          <div
            className="relative flex items-center justify-center w-full h-full"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-3 right-3 md:top-6 md:right-6 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Prev */}
            <button
              onClick={goPrev}
              className="absolute left-2 md:left-6 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Next */}
            <button
              onClick={goNext}
              className="absolute right-2 md:right-6 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Image */}
            {currentProduct && (
              <img
                src={currentProduct.img}
                alt={currentProduct.title}
                className="max-h-[80vh] max-w-[90vw] md:max-w-[80vw] object-contain select-none"
              />
            )}

            {/* Caption + Counter */}
            {currentProduct && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white text-center py-4 md:py-6 px-4">
                <p className="text-sm md:text-lg font-semibold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {currentProduct.title}
                </p>
                <p className="text-xs md:text-sm text-white/60">
                  {(lightboxIndex ?? 0) + 1} / {filtered.length}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Catalogue;
