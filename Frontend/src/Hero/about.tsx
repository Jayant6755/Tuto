import Navbar from "./Navbar";
import Footer from "./Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Target,
  Heart,
  Globe,
  Users,
  BookOpen,
  Award,
  ArrowRight,
} from "lucide-react";

const stats = [
  { value: "10,000+", label: "Students Enrolled" },
  { value: "2,500+", label: "Expert Teachers" },
  { value: "50+", label: "Subjects Covered" },
  { value: "98%", label: "Satisfaction Rate" },
];

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description:
      "We believe every student deserves access to world-class education, regardless of location or background.",
  },
  {
    icon: Heart,
    title: "Student-First",
    description:
      "Every feature we build starts with one question — does this help students learn better and faster?",
  },
  {
    icon: Globe,
    title: "Globally Connected",
    description:
      "We connect learners with the best teachers worldwide, breaking down geographical barriers to knowledge.",
  },
  {
    icon: Award,
    title: "Quality Obsessed",
    description:
      "Our rigorous vetting process ensures only the top 5% of applicants become EduConnect teachers.",
  },
];

const team = [
  { name: "Sarah Chen", role: "CEO & Co-Founder", initials: "SC" },
  { name: "Marcus Johnson", role: "CTO & Co-Founder", initials: "MJ" },
  { name: "Aisha Patel", role: "Head of Education", initials: "AP" },
  { name: "David Kim", role: "Head of Product", initials: "DK" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-500 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            Our Story
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Reimagining Education,{" "}
            <span className="text-red-500">One Connection</span> at a Time
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            EduConnect was born from a simple idea: the right teacher can change
            everything. We're building the platform that makes finding that
            teacher effortless.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-border border-gray-300 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-foreground text-center mb-4">
            What We Stand For
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-xl mx-auto">
            These principles guide every decision we make as a company.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="p-6 rounded-2xl border-gray-300 border-1 bg-white/60 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {v.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-card border-y border-border border-gray-300">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-foreground text-center mb-4">
            Meet the Team
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-xl mx-auto">
            Passionate educators and technologists building the future of learning.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-300 flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary-foreground font-bold text-lg">
                    {member.initials}
                  </span>
                </div>
                <h4 className="font-semibold text-foreground text-sm">
                  {member.name}
                </h4>
                <p className="text-gray-600 text-xs mt-1">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
