import { useState } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle2, AlertCircle } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData();
    formData.append("access_key", "3deb169e-c576-4f63-8438-edddf316da0e");
    formData.append("subject", "New Enquiry - BengalWeft Website");
    formData.append("from_name", "BengalWeft Website");
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));

    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: "Location",
      value: "1284 Askarabad, Mistripada, Dewanhut, Chittagong, Bangladesh",
    },
    { icon: Phone, label: "Phone", value: "+880 1302 185808" },
    { icon: Mail, label: "Email", value: "info@bengalweft.com" },
  ];

  return (
    <section id="contact" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-4">
            Ready to start your next garment project? Reach out and our team will respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="space-y-6 mb-10">
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center flex-shrink-0 shadow-gold">
                    <Icon className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy uppercase tracking-wider mb-1">{label}</p>
                    <p className="text-muted-foreground text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map embed placeholder */}
            <div className="rounded-2xl overflow-hidden shadow-card h-48 bg-secondary flex items-center justify-center">
              <iframe
                title="BengalWeft Location"
                src="https://maps.google.com/maps?q=Chittagong,Bangladesh&t=&z=10&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-lg-custom border border-border p-8">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-accent mb-4" />
                <h3 className="text-xl font-bold text-navy mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Message Sent!
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Thank you! We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-6 py-2.5 bg-gradient-navy text-white text-sm font-semibold rounded-lg"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-2">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us about your project..."
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all resize-none"
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg">
                    <AlertCircle className="w-4 h-4" />
                    Something went wrong. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-navy text-white font-semibold rounded-lg shadow-navy hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
