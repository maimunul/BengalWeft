import { Users, CheckCircle, Headphones } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Expert Professionals",
    desc: "Skilled garment specialists at every stage of production.",
  },
  {
    icon: CheckCircle,
    title: "Quality Assured",
    desc: "Strict international standards from fabric to final delivery.",
  },
  {
    icon: Headphones,
    title: "24 / 7 Support",
    desc: "Dedicated account managers always ready to assist you.",
  },
];

const FeatureStrip = () => {
  return (
    <section className="relative z-10 -mt-12 mx-4 md:mx-auto max-w-5xl">
      <div className="bg-white rounded-2xl shadow-lg-custom border border-border grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-center gap-4 p-6 md:p-8">
            <div className="w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center flex-shrink-0 shadow-gold">
              <Icon className="w-5 h-5 text-navy" />
            </div>
            <div>
              <h3 className="font-bold text-navy text-base mb-0.5">{title}</h3>
              <p className="text-muted-foreground text-sm">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureStrip;
