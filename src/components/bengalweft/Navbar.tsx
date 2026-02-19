import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ["home", "about", "services", "projects", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Catalogue", href: "/catalogue", isPage: true },
    { label: "Contact", href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-navy text-white py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-gold" />
              <span className="text-white/80">Sun – Thu, 08:00 – 21:00</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span className="text-white/80">+880 1302 185808</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-gold" />
              <span className="text-white/80">info@bengalweft.com</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a href="mailto:info@bengalweft.com" className="text-gold hover:text-gold-light transition-colors font-medium">
              Get a Quote →
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-navy"
            : "bg-navy"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => scrollTo("#home")} className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-gold rounded flex items-center justify-center">
              <span className="text-navy font-bold text-sm font-serif">BW</span>
            </div>
            <div>
              <span
                className={`text-xl font-bold tracking-tight transition-colors ${
                  scrolled ? "text-navy" : "text-white"
                }`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Bengal<span className="text-gold">Weft</span>
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              (link as any).isPage ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-sm font-medium transition-colors duration-200 relative group ${
                    scrolled ? "text-navy hover:text-gold" : "text-white/90 hover:text-gold"
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className={`text-sm font-medium transition-colors duration-200 relative group ${
                    scrolled ? "text-navy hover:text-gold" : "text-white/90 hover:text-gold"
                  } ${activeSection === link.href.replace("#", "") ? "text-gold" : ""}`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
                </button>
              )
            )}
            <button
              onClick={() => scrollTo("#contact")}
              className="ml-4 px-5 py-2 bg-gradient-gold text-navy font-semibold text-sm rounded shadow-gold hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              Contact Us
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`lg:hidden p-2 rounded ${scrolled ? "text-navy" : "text-white"}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-navy border-t border-white/10">
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) =>
                (link as any).isPage ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-white/90 hover:text-gold text-left text-sm font-medium py-1 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(link.href)}
                    className="text-white/90 hover:text-gold text-left text-sm font-medium py-1 transition-colors"
                  >
                    {link.label}
                  </button>
                )
              )}
              <button
                onClick={() => scrollTo("#contact")}
                className="mt-2 px-5 py-2.5 bg-gradient-gold text-navy font-semibold text-sm rounded text-center"
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
