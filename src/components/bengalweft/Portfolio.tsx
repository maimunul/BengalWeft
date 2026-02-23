import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

import productHoodie from "@/assets/product-hoodie.jpg";
import productLinenSet from "@/assets/product-linen-set.jpg";
import productStripedCoords from "@/assets/product-striped-coords.jpg";
import productDenimSet from "@/assets/product-denim-set.jpg";
import productTailored from "@/assets/product-tailored.jpg";
import productTshirtPack from "@/assets/product-tshirt-pack.jpg";
import productSatinPj from "@/assets/product-satin-pj.jpg";
import productKnitLounge from "@/assets/product-knit-lounge.jpg";
import productWomenTshirts from "@/assets/product-women-tshirts.jpg";
import productPurplePj from "@/assets/product-purple-pj.jpg";
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

type Category = "all" | "men" | "women" | "kids" | "innerwear" | "activewear";

const filters: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "men", label: "Men" },
  { key: "women", label: "Women" },
  { key: "kids", label: "Kids" },
  { key: "innerwear", label: "Innerwear" },
  { key: "activewear", label: "Activewear" },
];

const projects = [
  { category: "men" as Category, title: "H&M Navy Hoodie", desc: "A navy blue oversized zip-through hoodie made of heavy cotton sweatshirt fabric.", img: productHoodie },
  { category: "men" as Category, title: "Linen Lounge Set", desc: "Men's cotton linen casual lounge set with long-sleeve Henley shirt and drawstring trousers.", img: productLinenSet },
  { category: "men" as Category, title: "Striped Co-Ords", desc: "Striped stand collar short sleeve shirt and matching trousers co-ordinate set.", img: productStripedCoords },
  { category: "men" as Category, title: "Denim Shirt Set", desc: "Striped button-down shirt paired with classic blue denim jeans, a versatile everyday set.", img: productDenimSet },
  { category: "men" as Category, title: "Tailored Trousers Set", desc: "Striped button-down shirt with tailored trousers, a smart-casual combination.", img: productTailored },
  { category: "men" as Category, title: "Unisex T-Shirt Pack", desc: "Set of 3 unisex solid round-neck t-shirts in maroon, white, and black colorways.", img: productTshirtPack },
  { category: "activewear" as Category, title: "FILA Mesh T-Shirt", desc: "Sporty mesh panel t-shirt with embroidery details. Available in off-white and black.", img: productFilaTshirt },
  { category: "women" as Category, title: "Satin Pajama Set", desc: "H&M satin pajamas featuring a shirt and bottoms with contrasting piping trim.", img: productSatinPj },
  { category: "women" as Category, title: "Knit Loungewear", desc: "Women's summer 2-piece knit loungewear set with short-sleeve top and wide-leg pants.", img: productKnitLounge },
  { category: "women" as Category, title: "Crew Neck T-Shirt Set", desc: "Women's basic crew neck slim fit t-shirt set, essentials in three versatile colors.", img: productWomenTshirts },
  { category: "women" as Category, title: "Purple Pajama Set", desc: "Purple women's pajama set with short-sleeved button-down top and full-length pants.", img: productPurplePj },
  { category: "women" as Category, title: "High-Neck Knit Tops", desc: "Teen girls' solid color high-neck tight-fitting knit tops in assorted colors.", img: productKnitTops },
  { category: "women" as Category, title: "Cat Sweatshirt Pajama Set", desc: "Cozy cat-print long-sleeve sweatshirt paired with comfortable pajama bottoms.", img: productCatPajamaSet },
  { category: "men" as Category, title: "Regular Pajama", desc: "Classic white regular-fit pajama crafted from micro cotton spandex fabric.", img: productRegularPajama },
  { category: "men" as Category, title: "Special Pleat Pajama", desc: "Special pajama with front pleat detailing in premium micro cotton spandex.", img: productSpecialPajama },
  { category: "men" as Category, title: "Premium Twill Pajama", desc: "Premium pajama in twill cotton spandex fabric for superior comfort and style.", img: productPremiumPajama },
  { category: "kids" as Category, title: "Kids Playwear Set", desc: "Comfortable and durable kids' playwear set suitable for everyday activities.", img: productKidsPlaywear },
  { category: "kids" as Category, title: "Boys' Casual Set", desc: "Stylish casual set for boys featuring breathable fabric and playful design.", img: productBoysCasual },
  { category: "kids" as Category, title: "Girls' Summer Dress", desc: "Light and flowy summer dress for girls with vibrant floral print.", img: productGirlsDress },
  { category: "innerwear" as Category, title: "Cotton Innerwear Set", desc: "Premium cotton innerwear set offering all-day comfort and softness.", img: productCottonInnerwear },
  { category: "innerwear" as Category, title: "Sports Innerwear", desc: "Moisture-wicking sports innerwear designed for active performance.", img: productSportsInnerwear },
  { category: "innerwear" as Category, title: "Thermal Base Layer", desc: "Warm and cozy thermal base layer set for cold weather comfort.", img: productThermal },
  { category: "innerwear" as Category, title: "Jockstrap Collection", desc: "Premium jockstrap underwear in vibrant coral, mint, and pink colorways.", img: productJockstrap },
  { category: "innerwear" as Category, title: "Jockstrap Detail", desc: "Athletic jockstrap with branded waistband, available in multiple colors.", img: productJockstrapDetail },
  { category: "innerwear" as Category, title: "Thong Collection", desc: "Fashionable thong underwear set in tie-dye and printed designs.", img: productThong },
];

const Portfolio = () => {
  const [active, setActive] = useState<Category>("all");
  const [lightboxImg, setLightboxImg] = useState<{ src: string; title: string } | null>(null);
  const { ref, visible } = useScrollReveal();

  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <section id="projects" className="py-16 md:py-24 px-4 sm:px-6 bg-background">
        <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="text-center mb-8 md:mb-12">
            <p className="section-label">Our Work</p>
            <h2 className="section-title text-2xl md:text-4xl">Latest Projects</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mt-3 md:mt-4 text-sm md:text-base px-2">
              Explore our garment collections across categories — crafted with precision for global brands.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12 px-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActive(f.key)}
                className={`px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wide transition-all duration-200 ${
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
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {filtered.map((project) => (
              <div
                key={`${project.category}-${project.title}`}
                className="portfolio-item group relative rounded-xl md:rounded-2xl overflow-hidden shadow-card bg-white cursor-pointer"
                onClick={() => setLightboxImg({ src: project.img, title: project.title })}
              >
                <div className="relative h-36 sm:h-48 md:h-64 overflow-hidden">
                  <img
                    src={project.img}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                  <span className="absolute top-2 right-2 md:top-4 md:right-4 px-2 md:px-3 py-0.5 md:py-1 bg-gold text-navy text-[10px] md:text-xs font-bold rounded-full capitalize">
                    {project.category}
                  </span>
                  <div className="portfolio-overlay absolute inset-0 flex items-center justify-center p-3 md:p-6">
                    <p className="text-white text-xs md:text-sm text-center leading-relaxed">{project.desc}</p>
                  </div>
                </div>
                <div className="p-3 md:p-5">
                  <h3 className="font-bold text-navy text-xs sm:text-sm md:text-base group-hover:text-gold transition-colors duration-200" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {project.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* View Full Catalogue CTA */}
          <div className="text-center mt-8 md:mt-12">
            <Link
              to="/catalogue"
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-3.5 bg-gradient-gold text-navy font-semibold rounded shadow-gold hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 text-sm md:text-base"
            >
              View Full Catalogue →
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={!!lightboxImg} onOpenChange={() => setLightboxImg(null)}>
        <DialogContent className="max-w-[95vw] md:max-w-4xl p-0 bg-transparent border-none shadow-none [&>button]:hidden">
          <div className="relative flex items-center justify-center">
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-2 right-2 md:top-4 md:right-4 z-10 w-8 h-8 md:w-10 md:h-10 bg-navy/80 hover:bg-navy text-white rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            {lightboxImg && (
              <img
                src={lightboxImg.src}
                alt={lightboxImg.title}
                className="max-h-[85vh] max-w-full object-contain rounded-lg"
              />
            )}
            {lightboxImg && (
              <div className="absolute bottom-0 left-0 right-0 bg-navy/80 text-white text-center py-2 md:py-3 rounded-b-lg">
                <p className="text-sm md:text-base font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {lightboxImg.title}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Portfolio;
