import { useState } from "react";
import Navbar from "../../Hero/Navbar";
import Footer from "../../Hero/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  HelpCircle,
  Search,
  ChevronDown,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

type FAQ = {
  question: string;
  answer: string;
};

type FAQGroup = {
  category: string;
  items: FAQ[];
};

const faqGroups: FAQGroup[] = [
  {
    category: "For Students",
    items: [
      {
        question: "How do I find the right teacher?",
        answer:
          "Use the Find Teachers page to search by subject, class level, experience, rating, availability, and fees. You can filter and sort results to match your learning goals, then view a teacher's full profile before sending a connection request.",
      },
      {
        question: "How do connection requests work?",
        answer:
          "When you find a teacher you like, send a connection request. The teacher receives a notification and can accept or decline. Once accepted, you can message them directly and book sessions.",
      },
      {
        question: "Can I message a teacher before booking?",
        answer:
          "Yes. After your connection request is accepted, you can use the messaging feature to discuss your learning goals, schedule, and any questions before booking a paid session.",
      },
      {
        question: "How are teachers vetted?",
        answer:
          "Teachers complete a detailed registration including qualifications, subjects, class levels, experience, and demo videos. Only the top applicants are approved to teach on EduConnect.",
      },
    ],
  },
  {
    category: "For Teachers",
    items: [
      {
        question: "How do I create a teacher profile?",
        answer:
          "Click 'Become a Teacher' and complete the registration form. After signing up, build out your profile with your photo, subjects, class levels, education, teaching style, and demo videos to attract students.",
      },
      {
        question: "How do I receive session requests?",
        answer:
          "Session requests appear in your Notifications page and dashboard. You'll see the student's name, subject, requested time, and can accept or decline from there.",
      },
      {
        question: "Can I edit my profile after publishing?",
        answer:
          "Absolutely. You can edit your personal info, subjects, class levels, education, and availability at any time directly from your teacher dashboard or profile page using inline editing.",
      },
      {
        question: "How do ratings and reviews work?",
        answer:
          "After a completed session, students can leave a rating and written review. These appear publicly on your profile and help future students decide to connect with you.",
      },
    ],
  },
  {
    category: "Booking & Payments",
    items: [
      {
        question: "How do I book a session?",
        answer:
          "Once connected with a teacher, open their profile or the messaging thread and choose a time slot. Confirm the booking and you'll receive a notification with the session details.",
      },
      {
        question: "What payment methods are supported?",
        answer:
          "EduConnect supports major credit/debit cards and popular digital wallets. All payments are processed securely and your card details are never stored on our servers.",
      },
      {
        question: "Can I get a refund if I cancel?",
        answer:
          "Yes. Sessions cancelled at least 24 hours in advance are fully refundable. Late cancellations may be subject to a partial fee depending on the teacher's policy.",
      },
      {
        question: "When do teachers get paid?",
        answer:
          "Teachers receive payment after a completed session. Earnings are tracked in your dashboard and can be withdrawn to your linked bank or wallet account.",
      },
    ],
  },
  {
    category: "Account & Safety",
    items: [
      {
        question: "How do I reset my password?",
        answer:
          "On the login page, click 'Forgot password?' and enter your email. We'll send a secure link to reset your password. The link expires after 30 minutes for your security.",
      },
      {
        question: "Is my data safe on EduConnect?",
        answer:
          "Yes. We use encryption for all data in transit and at rest. We never share your personal information with third parties, and you control what appears on your public profile.",
      },
      {
        question: "How do I report a problem or user?",
        answer:
          "Use the Contact Support option in the Help Center, or flag a message directly from the conversation. Our team reviews all reports and takes action to keep the community safe.",
      },
      {
        question: "Can I delete my account?",
        answer:
          "Yes. Go to your profile settings and select 'Delete account'. This permanently removes your data. This action cannot be undone.",
      },
    ],
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<string | null>("0-0");
  const [query, setQuery] = useState("");

  const toggle = (key: string) => setOpen(open === key ? null : key);

  const filtered = faqGroups
    .map((group, gi) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          item.question.toLowerCase().includes(query.toLowerCase()) ||
          item.answer.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4">
        <div className="absolute inset-0 bg-red-500 opacity-10" />
        <div className="container mx-auto max-w-3xl text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-200 text-red-500 text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Frequently Asked <span className="text-red-500">Questions</span>
          </h1>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Everything you need to know about EduConnect. Can't find an answer?
            Reach out to our team.
          </p>

          <div className="relative max-w-xl mx-auto bg-white rounded-2xl shadow-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground " />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions..."
              className="pl-12 h-14 text-base rounded-2xl shadow-md border border-gray-300"
            />
          </div>
        </div>
      </section>

      {/* Accordion */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-3xl space-y-12">
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-10">
              No questions match your search. Try a different term or{" "}
              <Link to="/help" className="text-primary font-medium">
                browse the Help Center
              </Link>
              .
            </p>
          ) : (
            filtered.map((group, gi) => (
              <div key={group.category}>
                <h2 className="text-xl font-bold text-foreground mb-4 pb-2 border-b border-border border-gray-300">
                  {group.category}
                </h2>
                <div className="space-y-3">
                  {group.items.map((item, ii) => {
                    const key = `${gi}-${ii}`;
                    const isOpen = open === key;
                    return (
                      <div
                        key={key}
                        className={`rounded-xl border bg-card transition-all ${
                          isOpen
                            ? "border-red-500/40 shadow-md"
                            : "border-border border-gray-300 hover:border-red-500/30 hover:shadow-sm"
                        }`}
                      >
                        <button
                          onClick={() => toggle(key)}
                          className="w-full flex items-center justify-between gap-4 p-5 text-left "
                        >
                          <span className="font-semibold text-foreground text-sm md:text-base ">
                            {item.question}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                              isOpen ? "rotate-180 text-red-500" : ""
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-5 text-sm text-gray-700 leading-relaxed">
                            {item.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gray-100 border-y border-border border-gray-300">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-500/60 flex items-center justify-center mx-auto mb-5">
            <MessageSquare className="w-7 h-7 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Didn't find what you're looking for?
          </h2>
          <p className="text-muted-foreground mb-7">
            Our support team is happy to help with any question.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/help">
              <Button size="lg" className="gap-2 bg-red-500 hover:bg-red-600 text-white">
                Visit Help Center <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/messages">
              <Button variant="outline" size="lg" className="border-gray-300">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
