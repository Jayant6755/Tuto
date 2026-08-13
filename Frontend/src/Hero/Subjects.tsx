import { Link } from "react-router-dom";
import { 
  Calculator, 
  FlaskConical, 
  BookOpen, 
  Code, 
  Music, 
  Globe, 
  Palette, 
  Brain,
  ArrowRight
} from "lucide-react";

const categories = [
  { name: "Mathematics", icon: Calculator, count: 2340, color: "bg-blue-500/10 text-blue-600" },
  { name: "Science", icon: FlaskConical, count: 1856, color: "bg-green-500/10 text-green-600" },
  { name: "Languages", icon: BookOpen, count: 3120, color: "bg-purple-500/10 text-purple-600" },
  { name: "Programming", icon: Code, count: 1680, color: "bg-orange-500/10 text-orange-600" },
  { name: "Music", icon: Music, count: 945, color: "bg-pink-500/10 text-pink-600" },
  { name: "History", icon: Globe, count: 1230, color: "bg-amber-500/10 text-amber-600" },
  { name: "Art & Design", icon: Palette, count: 780, color: "bg-rose-500/10 text-rose-600" },
  { name: "Test Prep", icon: Brain, count: 2100, color: "bg-teal-500/10 text-teal-600" },
];

const Subjects = () => {
  return (
    <section className="py-20 bg-background lg:h-200">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-bold font-serif text-foreground mt-2">
            Popular Categories
          </h2>
          <p className="text-gray-500 mt-4 md:lg:text-lg">
            Explore teachers across all subjects and find the perfect match for your learning goals.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={`/teachers?subject=${category.name.toLowerCase()}`}
              className="group animate-fade-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="bg-white rounded-2xl p-6 border  shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg lg:text-xl mb-1">
                  {category.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="md:lg:text-lg text-sm text-gray-500">
                    {category.count.toLocaleString()} teachers
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Subjects;
