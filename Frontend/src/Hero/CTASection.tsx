import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-30 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="bg-red-700 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden ">
          {/* Decorative elements */}
          <div className="absolute top-4 left-4 w-20 h-20 bg-accent/20 rounded-full blur-2xl" />
          <div className="absolute bottom-4 right-4 w-32 h-32 bg-primary-foreground/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="md:text-lg font-medium text-white/90">
                Start Learning Today
              </span>
            </div>
            
            <h2 className="text-3xl font-serif md:text-6xl font-bold text-white/90 mb-4 max-w-3xl mx-auto">
              Ready to Find Your Perfect Teacher?
            </h2>
            
            <p className="md:text-xl text-white/80 mb-8 max-w-xl mx-auto">
              Join thousands of students already learning with top educators. Your academic success is just a click away.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/teachers">
                <Button className="w-full md:hover:scale-105 cursor-pointer text-white bg-black md:text-xl md:p-6 rounded-xl ">
                  Browse Teachers
                  <ArrowRight className="w-8 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/teacher-login">
                <Button className="w-full sm:w-auto cursor-pointer bg-white/20 text-white border border-white/30 hover:bg-white/30 md:text-xl md:p-6 rounded-xl ">
                  Become a Teacher
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
