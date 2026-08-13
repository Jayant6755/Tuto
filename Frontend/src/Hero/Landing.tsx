import { Search, Star, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Landing = () => {
  const stats = [
    { icon: Users, value: "10,000+", label: "Active Teachers" },
    { icon: Star, value: "4.9", label: "Average Rating" },
    { icon: BookOpen, value: "500+", label: "Subjects" },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden font-serif  top-15" >
      <div className="absolute inset-0 bg-red-700 opacity-95" />
      <div className="container mx-auto px-4 relative z-10 ">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <span className="text-white">Find Your Perfect</span>
            <span className="block mt-2 text-accent">Teacher Today</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto animate-fade-up font-sans" style={{ animationDelay: '0.2s' }}>
            Connect with qualified educators who match your learning style. 
            Browse profiles, read reviews, and book sessions that fit your schedule.
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto mb-12 animate-fade-up font-sans" style={{ animationDelay: '0.3s' }}>
            <div className="flex flex-col sm:flex-row gap-3 p-3 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/30 shadow-lg">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/60" />
                <Input
                  placeholder="What do you want to learn?"
                  className="pl-12 h-12 bg-white text-foreground border-0 rounded-xl placeholder:text-muted-foreground"
                />
              </div>
              <Link to="/teachers">
                <Button  size="lg" className="w-full sm:w-auto bg-black text-white rounded-xl p-6 text-xl">
                  Search Teachers
                </Button>
              </Link>
            </div>
            <p className="text-sm text-white/60 mt-3">
              Popular: Mathematics, Physics, English, Programming, Music
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-lg mx-auto animate-fade-up" style={{ animationDelay: '0.4s' }}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 mb-3">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-white">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default Landing;
