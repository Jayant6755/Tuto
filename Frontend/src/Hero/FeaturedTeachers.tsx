import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Teacher } from "./TeacherCard";
import TeacherCard from "./TeacherCard";
import TeacherCard2 from "./TeacherCard2";
import { Link } from "react-router-dom";

const featuredTeachers: Teacher[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    subject: "Mathematics",
    specializations: ["Calculus", "Linear Algebra", "Statistics", "SAT Prep"],
    rating: 4.9,
    reviewCount: 284,
    experience: 12,
    hourlyRate: 65,
    location: "San Francisco, CA",
    availability: "Weekdays & Weekends",
    bio: "PhD in Mathematics from Stanford. I make complex concepts simple and help students build strong foundations for advanced studies.",
    verified: true,
  },
  {
    id: "2",
    name: "Michael Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    subject: "Physics",
    specializations: ["Mechanics", "Thermodynamics", "AP Physics"],
    rating: 4.8,
    reviewCount: 156,
    experience: 8,
    hourlyRate: 55,
    location: "Boston, MA",
    availability: "Evenings",
    bio: "Former NASA engineer turned educator. I use real-world examples to make physics exciting and accessible for all students.",
    verified: true,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    subject: "English Literature",
    specializations: ["Creative Writing", "Essay Writing", "SAT Writing"],
    rating: 5.0,
    reviewCount: 203,
    experience: 10,
    hourlyRate: 50,
    location: "New York, NY",
    availability: "Flexible",
    bio: "Published author and passionate educator. I help students find their voice and excel in written communication.",
    verified: true,
  },
];

const FeaturedTeachers = () => {
  return (
    <section className="py-20 bg-background md:lg:h-200">
      <div className="container mx-auto px-4 mt-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-accent font-medium text-lg uppercase tracking-wider">
              Top Rated
            </span>
            <h2 className="text-3xl md:text-6xl font-bold text-foreground mt-2">
              Featured Teachers
            </h2>
            <p className="md:text-lg  text-gray-500 mt-3 max-w-xl">
              Discover our most highly-rated educators, handpicked for their expertise and teaching excellence.
            </p>
          </div>
          <Link to="/teachers" className="mt-6 md:mt-0">
            <Button className="group cursor-pointer bg-red-600 text-white md:text-lg ">
              View All Teachers
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTeachers.map((teacher, index) => (
            <div
              key={teacher.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <TeacherCard2 teacher={teacher} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTeachers;
