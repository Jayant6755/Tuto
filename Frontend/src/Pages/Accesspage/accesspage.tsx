import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "../../Hero/Navbar";
import Footer from "../../Hero/Footer";
import { GraduationCap, Lock, ArrowLeft, LogIn, UserPlus } from "lucide-react";

const AccessGate = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md text-center">
          {/* Icon */}
          <div className="relative inline-flex mb-8">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
            <div className="relative w-15 h-15 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg">
              <Lock className="w-9 h-9 text-white" />
            </div>
          </div>

          {/* Heading */}
          <span className="text-accent font-medium text-sm uppercase tracking-wider">
            Account Required
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Login or Sign Up to Continue
          </h1>
          <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
            Create a free student account or log in to browse teacher profiles,
            view details, and book sessions with our educators.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link to="/user-login">
              <Button size="lg" className="w-full sm:w-auto h-12 px-15 text-base bg-red-600 text-white font-semibold cursor-pointer hover:bg-red-700 transition-colors">
                <LogIn className="w-5 h-5 mr-2 text-white" />
                Log In
              </Button>
            </Link>
            <Link to="/user-login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-15  text-base font-semibold border-1 border-gray-300 hover:bg-gray-100">
                <UserPlus className="w-5 h-5 mr-2 " />
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Benefits */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm mb-8">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="font-semibold text-card-foreground">
                Why join EduConnect?
              </h2>
            </div>
            <ul className="text-left text-sm text-muted-foreground space-y-2.5">
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">✓</span>
                Access detailed profiles of verified, top-rated teachers
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">✓</span>
                Message tutors directly and book sessions instantly
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">✓</span>
                Save your favorite educators and track your bookings
              </li>
            </ul>
          </div>

          {/* Back */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccessGate;
