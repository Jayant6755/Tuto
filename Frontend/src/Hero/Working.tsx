import Navbar from "./Navbar";
import Footer from "./Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Search,
  UserCheck,
  Calendar,
  Star,
  ArrowRight,
  MessageSquare,
  CreditCard,
  ShieldCheck,
  Video,
  BookOpen,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Search & Discover",
    description:
      "Browse our curated network of verified teachers. Filter by subject, price range, experience level, language, and availability to find your perfect match.",
    details: [
      "Advanced filters for precise results",
      "AI-powered teacher recommendations",
      "Compare multiple teachers side-by-side",
    ],
  },
  {
    icon: UserCheck,
    number: "02",
    title: "Review & Connect",
    description:
      "Dive into detailed teacher profiles — read verified reviews, watch intro videos, check qualifications, and understand their teaching philosophy before committing.",
    details: [
      "Verified credentials & background checks",
      "Student reviews with detailed ratings",
      "Free introductory messages",
    ],
  },
  {
    icon: Calendar,
    number: "03",
    title: "Book & Schedule",
    description:
      "Pick a time that works for you from the teacher's live calendar. Choose one-time sessions, recurring lessons, or flexible packages tailored to your goals.",
    details: [
      "Real-time calendar availability",
      "Recurring session scheduling",
      "Flexible rescheduling & cancellation",
    ],
  },
  {
    icon: Video,
    number: "04",
    title: "Learn & Collaborate",
    description:
      "Join interactive sessions with built-in video, screen sharing, and a collaborative whiteboard. Your teacher adapts the pace and content to your learning style.",
    details: [
      "HD video with screen sharing",
      "Interactive whiteboard tools",
      "Session recordings for review",
    ],
  },
  {
    icon: Star,
    number: "05",
    title: "Track & Grow",
    description:
      "Monitor your progress with detailed analytics. Set learning milestones, receive personalized feedback, and watch your skills evolve over time.",
    details: [
      "Progress dashboards & analytics",
      "Milestone tracking & certificates",
      "Personalized learning paths",
    ],
  },
];

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "All transactions are encrypted and protected. Pay only after your session is confirmed.",
  },
  {
    icon: MessageSquare,
    title: "In-App Messaging",
    description: "Communicate directly with teachers before, during, and after sessions — all in one place.",
  },
  {
    icon: CreditCard,
    title: "Flexible Pricing",
    description: "Choose from hourly rates, session bundles, or monthly plans. No hidden fees, ever.",
  },
  {
    icon: BookOpen,
    title: "Resource Library",
    description: "Access shared notes, materials, and recordings from all your past sessions anytime.",
  },
];

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 bg-gray-50">
        <div className="container mx-auto  max-w-4xl text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-gray-200 text-accent text-sm font-medium mb-6">
            Simple & Transparent
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Your Learning Journey,{" "}
            <span className="text-red-600">Step by Step</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From finding the perfect teacher to tracking your progress — here's
            exactly how EduConnect works, with no surprises.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 md:gap-12 items-center`}
              >
                {/* Visual */}
                <div className="flex-1 w-full">
                  <div className="relative p-8 rounded-3xl bg-card border border-border border-gray-300 shadow-sm">
                    <span className="absolute -top-3 right-4 text-7xl font-black text-red-100 select-none">
                      {step.number}
                    </span>
                    <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center mb-5">
                      <step.icon className="w-7 h-7 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 w-full">
                  <ul className="space-y-4">
                    {step.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-3 text-foreground"
                      >
                        <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <ArrowRight className="w-3 h-3 text-red-600" />
                        </div>
                        <span className="text-sm leading-relaxed text-semibold">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20 px-4 bg-card border-y border-border border-gray-300">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-foreground text-center mb-4">
            Built for Seamless Learning
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-xl mx-auto">
            Everything you need for a great learning experience, built right in.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl bg-gray-50 border border-gray-300 border-border  hover:shadow-lg transition-shadow text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{f.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {f.description}
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

export default HowItWorksPage;
