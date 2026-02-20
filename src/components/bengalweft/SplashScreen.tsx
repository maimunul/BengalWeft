import { useState, useEffect } from "react";
import logo from "@/assets/bengalweft-logo.jpeg";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 100);
    const t2 = setTimeout(() => setPhase("exit"), 1800);
    const t3 = setTimeout(onComplete, 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-navy flex items-center justify-center transition-opacity duration-700 ${
        phase === "exit" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div
        className={`flex flex-col items-center transition-all duration-700 ${
          phase === "enter" ? "opacity-0 scale-90" : phase === "hold" ? "opacity-100 scale-100" : "opacity-0 scale-110"
        }`}
      >
        {/* Logo mark */}
        <img src={logo} alt="BengalWeft Logo" className="w-20 h-20 rounded-xl mb-6 shadow-gold object-cover" />
        {/* Brand name */}
        <h1
          className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Bengal<span className="text-gold">Weft</span>
        </h1>
        <p className="text-white/50 text-sm uppercase tracking-[0.3em] mt-3">
          Quality · Trust · Excellence
        </p>
        {/* Loading bar */}
        <div className="w-48 h-0.5 bg-white/10 rounded-full mt-8 overflow-hidden">
          <div
            className="h-full bg-gradient-gold rounded-full transition-all ease-linear"
            style={{ width: phase === "enter" ? "0%" : phase === "hold" ? "90%" : "100%", transitionDuration: phase === "hold" ? "1700ms" : "600ms" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
