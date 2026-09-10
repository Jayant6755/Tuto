import { useState } from "react";
import Navbar from "../../Hero/Navbar";
import Footer from "../../Hero/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  MessageSquare,
  Clock,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "support@educonnect.com",
    href: "mailto:support@educonnect.com",
  },
//   {
//     icon: Phone,
//     label: "Phone",
//     value: "+1 (800) 123-4567",
//     href: "tel:+18001234567",
//   },
// //   {
// //     icon: MapPin,
// //     label: "Office",
// //     value: "123 Education St, Learning City",
// //     href: null,
// //   },
//   {
//     icon: Clock,
//     label: "Hours",
//     value: "Mon–Fri, 9am–6pm",
//     href: null,
//   },
];

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast.success("Message sent! We'll get back to you within 24 hours.");
    }, 900);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-red-500 opacity-10" />
        <div className="container mx-auto max-w-3xl text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-200 text-red-500 text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4" />
            Contact Us
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Let's <span className="text-red-500">talk</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have a question, feedback, or partnership idea? We'd love to hear
            from you. Fill out the form and our team will respond shortly.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-5xl grid md:grid-cols-5 gap-8">
          {/* Form */}
          <div className="md:col-span-3 ">
            <div className="p-8 rounded-3xl border border-gray-300 bg-card shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-1">
                Send us a message
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                We typically reply within 24 hours.
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Name <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="border-gray-300 bg-gray-100"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className="border-gray-300 bg-gray-100"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="border-gray-300 bg-gray-100"
                    placeholder="What's this about?"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">
                    Message <span className="text-primary">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us more..."
                    className="border-gray-300 bg-gray-100"
                    rows={5}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full gap-2 bg-red-500 hover:bg-red-600 text-white"
                >
                  {loading ? "Sending..." : "Send Message"}
                  {!loading && <Send className="w-4 h-4" />}
                </Button>
              </form>
            </div>
          </div>

          {/* Info */}
          <div className="md:col-span-2 space-y-4">
            {contactInfo.map((item) => {
              const Inner = (
                <div className="p-5 rounded-2xl border border-gray-300 bg-card hover:border-red-500/30 hover:shadow-md transition-all h-full">
                  <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5 text-red-500" />
                  </div>
                  <p className="text-xs uppercase tracking-wide text-gray-600 mb-1">
                    {item.label}
                  </p>
                  <p className="font-semibold text-foreground">{item.value}</p>
                </div>
              );
              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="block"
                >
                  {Inner}
                </a>
              ) : (
                <div key={item.label}>{Inner}</div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
