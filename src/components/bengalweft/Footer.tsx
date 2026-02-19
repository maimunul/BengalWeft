import { MapPin, Phone, Mail, Facebook, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-navy text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-gradient-gold rounded flex items-center justify-center">
                <span className="text-navy font-bold text-sm">BW</span>
              </div>
              <span className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Bengal<span className="text-gold">Weft</span>
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-sm">
              A trusted buying and production house delivering high-quality clothing solutions for global brands.
              Quality. Trust. Excellence — from Chittagong to the world.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Linkedin, href: "#" },
                { Icon: Instagram, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 bg-white/10 hover:bg-gold rounded-lg flex items-center justify-center text-white hover:text-navy transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", id: "home" },
                { label: "About Us", id: "about" },
                { label: "Services", id: "services" },
                { label: "Projects", id: "projects" },
                { label: "Contact", id: "contact" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-white/70 hover:text-gold text-sm transition-colors duration-200"
                  >
                    → {link.label}
                  </button>
                </li>
              ))}
              <li>
                <Link to="/catalogue" className="text-white/70 hover:text-gold text-sm transition-colors duration-200">
                  → Product Catalogue
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <a
                  href="https://maps.app.goo.gl/8R6trvqeWWNV5sui9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-gold text-sm transition-colors"
                >
                  1284 Askarabad, Mistripada, Chittagong, Bangladesh
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="tel:+8801302185808" className="text-white/70 hover:text-gold text-sm transition-colors">
                  +880 1302 185808
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="mailto:info@bengalweft.com" className="text-white/70 hover:text-gold text-sm transition-colors">
                  info@bengalweft.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-xs">
            © {new Date().getFullYear()} BengalWeft. All rights reserved.
          </p>
          <p className="text-white/50 text-xs">
            Chittagong, Bangladesh · Trusted by global garment brands.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
