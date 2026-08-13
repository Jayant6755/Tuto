import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Jessica Martinez",
    role: "High School Student",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    content: "Tuto helped me find an amazing calculus tutor. My grades went from C to A in just two months! The booking process was super easy.",
    rating: 5,
  },
  {
    name: "David Thompson",
    role: "College Student",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    content: "The filtering options made it easy to find a tutor within my budget who matched my schedule. Highly recommend for anyone struggling with physics!",
    rating: 5,
  },
  {
    name: "Amanda Lee",
    role: "Parent",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    content: "Found a wonderful piano teacher for my daughter. The reviews and demo videos helped us make the right choice. Great platform!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-red-700 lg:h-200 md:h-250 relative overflow-hidden flex flex-col justify-center items-center">
     
      
      <div className="container flex flex-col  relative z-10 ">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 font-serif">
            What Students Say
          </h2>
          <p className="text-gray-300 md:text-lg text-sm mt-4">
            Join thousands of students who have transformed their learning experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 lg:ml-15 ">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/20 lg:w-100 backdrop-blur-lg rounded-2xl p-6 border-white/30 border animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote className="w-8 h-8 text-black/50 mb-4" />
              
              <p className="text-xl mb-6 leading-relaxed text-white">
                "{testimonial.content}"
              </p>
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white"
                />
                <div>
                  <div className="font-semibold text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-white/60">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
