import { useState } from "react";
import Navbar from "../../Hero/Navbar";
import Footer from "../../Hero/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  LifeBuoy,
  Search,
  BookOpen,
  CreditCard,
  UserCog,
  ShieldCheck,
  MessageSquare,
  CalendarClock,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const categories = [
  {
    icon: UserCog,
    title: "Account & Profile",
    description: "Manage your account settings, profile info, and preferences.",
    articles: 12,
  },
  {
    icon: CalendarClock,
    title: "Booking & Sessions",
    description: "Schedule, reschedule, and manage your learning sessions.",
    articles: 8,
  },
  {
    icon: CreditCard,
    title: "Payments & Billing",
    description: "Understand fees, refunds, and payment methods.",
    articles: 6,
  },
  {
    icon: BookOpen,
    title: "Finding Teachers",
    description: "Search, filter, and connect with the right teachers.",
    articles: 10,
  },
  {
    icon: MessageSquare,
    title: "Messaging",
    description: "Chat with teachers, send requests, and manage conversations.",
    articles: 5,
  },
  {
    icon: ShieldCheck,
    title: "Safety & Privacy",
    description: "How we keep your data and learning experience secure.",
    articles: 7,
  },
];

const popularGuides = [
  {
    title: "How to create a standout teacher profile",
    readTime: "4 min read",
    tag: "For Teachers",
  },
  {
    title: "Booking your first session as a student",
    readTime: "3 min read",
    tag: "For Students",
  },
  {
    title: "Understanding the connection request flow",
    readTime: "2 min read",
    tag: "Connections",
  },
  {
    title: "Refund and cancellation policies explained",
    readTime: "5 min read",
    tag: "Billing",
  },
];

const HelpCenter = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-red-500 opacity-10 " />
        <div className="container mx-auto max-w-3xl text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-200 text-red-600 text-sm font-medium mb-6">
            <LifeBuoy className="w-4 h-4 " />
            Help Center
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            How can we <span className="text-red-500">help you</span>?
          </h1>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Search our knowledge base or browse by category to find answers fast.
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for guides, articles, topics..."
              className="pl-12 h-14 text-base rounded-2xl shadow-md"
            />
            <Button
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-red-500 hover:bg-red-600 text-white px-6 py-2 shadow-md"
            >
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Browse by category</h2>
          <p className="text-gray-500 mb-10">
            Find articles organized by topic.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                to="/faq"
                className="group p-6 rounded-2xl border-1 border-gray-200 bg-card hover:shadow-lg hover:border-red-500/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                    <cat.icon className="w-6 h-6 text-red-500" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {cat.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  {cat.description}
                </p>
                <span className="text-xs font-medium text-red-500">
                  {cat.articles} articles
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Guides */}
      <section className="py-16 px-4 bg-card border-y border-gray-200">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Popular guides</h2>
          <p className="text-gray-500 mb-10">
            The most-read articles this week.
          </p>
          <div className="grid md:grid-cols-2 gap-4 ">
            {popularGuides.map((guide) => (
              <Link
                key={guide.title}
                to="/faq"
                className="flex items-center justify-between p-5 rounded-xl border border-gray-200 bg-gray-50 hover:border-red-300 hover:shadow-md transition-all"
              >
                <div>
                  <span className="inline-block text-xs font-medium text-red-500 bg-red-100 px-2 py-1 rounded-md mb-2">
                    {guide.tag}
                  </span>
                  <h3 className="font-semibold text-foreground text-sm mb-1">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-gray-500">{guide.readTime}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 bg-gray-100">
        <div className="container mx-auto max-w-2xl text-center ">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-500/60 flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Still need help?
          </h2>
          <p className="text-muted-foreground mb-8">
            Our support team is here for you. Reach out and we'll get back within
            24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center ">
            <Link to="/contact">
              <Button size="lg" className="gap-2 bg-red-500 hover:bg-red-600 text-white">
                Contact Support <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/faq">
              <Button variant="outline" size="lg" className="border-gray-300">
                View FAQs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelpCenter;
