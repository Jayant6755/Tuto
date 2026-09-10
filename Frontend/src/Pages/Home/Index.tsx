import Navbar from "../../Hero/Navbar";
import Landing from "../../Hero/Landing";
import FeaturedTeachers from "../../Hero/FeaturedTeachers";

import Subjects from "../../Hero/Subjects";
import Testimonials from "../../Hero/Testimonials";
import CTASection from "../../Hero/CTASection";
import Footer from "../../Hero/Footer";
import HomeWorking from "@/Hero/HomeWorking";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Landing/>
      <FeaturedTeachers />
      <Subjects/>
      <HomeWorking />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
