import { Search, UserCheck, Calendar, Star } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search & Filter",
    description: "Browse thousands of qualified teachers. Filter by subject, price, experience, and availability.",
  },
  {
    icon: UserCheck,
    title: "Review Profiles",
    description: "Explore detailed profiles with qualifications, reviews, demo videos, and teaching styles.",
  },
  {
    icon: Calendar,
    title: "Book Sessions",
    description: "Schedule lessons at times that work for you. Choose one-time or recurring sessions.",
  },
  {
    icon: Star,
    title: "Learn & Grow",
    description: "Attend engaging sessions and track your progress. Leave reviews to help others.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-medium text-sm uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            How It Works
          </h2>
          <p className="text-gray-600 mt-4">
            Getting started is easy. Find the right teacher and begin your learning journey in minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-center group animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-red-500 to-transparent" />
              )}
              
              {/* Step number */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center shadow-md">
                {index + 1}
              </div>
              
              {/* Icon */}
              <div className="w-20 h-20 rounded-2xl bg-card shadow-lg flex items-center justify-center mx-auto mb-6 group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                <step.icon className="w-8 h-8 text-red-600" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
