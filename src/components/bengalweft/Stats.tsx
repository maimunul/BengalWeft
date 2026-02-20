import { useEffect, useRef, useState } from "react";
import { Users, Smile, FolderOpen, Layers } from "lucide-react";

const stats = [
  { icon: Users, value: 100, label: "Expert Workers", suffix: "+" },
  { icon: Smile, value: 25, label: "Happy Clients", suffix: "+" },
  { icon: FolderOpen, value: 78, label: "Completed Projects", suffix: "+" },
  { icon: Layers, value:10, label: "Running Projects", suffix: "" },
];

const useCountUp = (target: number, duration = 1800, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
};

const StatCard = ({ icon: Icon, value, label, suffix, started }: any) => {
  const count = useCountUp(value, 1600, started);
  return (
    <div className="flex flex-col items-center text-center p-8">
      <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4 border border-white/20">
        <Icon className="w-7 h-7 text-gold" />
      </div>
      <p className="text-5xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
        {count}{suffix}
      </p>
      <p className="text-white/70 text-sm font-medium uppercase tracking-wider">{label}</p>
    </div>
  );
};

const Stats = () => {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-gradient-navy py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 divide-y md:divide-y-0">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
