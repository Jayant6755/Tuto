import { useEffect, useState } from "react";
import Navbar from "../../Hero/Navbar";
import Footer from "../../Hero/Footer";
import TeacherCard from "../../Hero/TeacherCard";
import {jwtDecode} from "jwt-decode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Link, Search, SlidersHorizontal, X } from "lucide-react";
import axios from "axios";
import { LucideMessagesSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const subjects = ["All Subjects", "Mathematics", "Physics", "Chemistry", "English Literature", "Programming", "Spanish", "Music", "History"];
const levels = ["All Levels", "Elementary", "Middle School", "High School", "College", "Professional"];

interface TeacherInfo {
  id: string;
  teacherId: string;
  FName: string;
  LName: string;
  name: string;
  email: string;
  location: string;
  bio: string;
  hourlyRate: number;
  experience: string;
  subject: string[];
  ClassLevels: string[];
}

const Teachers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [minRating, setMinRating] = useState("Any");
  const [showFilters, setShowFilters] = useState(false);
  const [teacher, setTeacher] = useState<TeacherInfo[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTeacherInfo = async () => {
      try {

        const savedtoken = localStorage.getItem("token");
        if(!savedtoken) {
          navigate("/user-login");
          return;
        }
        const response = await axios.get<TeacherInfo[]>("http://localhost:5000/api/teachers/findall",{
          headers: {
            Authorization: `Bearer ${savedtoken}`,
          },
        });
       
        const teachersWithName = response.data.map((teacher) => ({
          ...teacher,
          name: `${teacher.FName} ${teacher.LName}`,
        }));
        setTeacher(teachersWithName);
      } catch (error) {
          if(error === 401)  
        {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        console.error("Error fetching teacher info:", error);
      }
    };
    fetchTeacherInfo();
 }, []);
 
  const filteredTeachers = teacher.filter((teacher) => {
    const matchesSearch = teacher.FName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.LName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subject.some(sub => sub.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesSubject = selectedSubject === "All Subjects" || teacher.subject.includes(selectedSubject);
    const matchesPrice = teacher.hourlyRate >= priceRange[0] && teacher.hourlyRate <= priceRange[1];
    

    return matchesSearch && matchesSubject && matchesPrice 
  });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSubject("All Subjects");
    setSelectedLevel("All Levels");
    setPriceRange([0, 100]);
    setMinRating("Any");
  };

  const hasActiveFilters = searchQuery || selectedSubject !== "All Subjects" || selectedLevel !== "All Levels" || priceRange[0] > 0 || priceRange[1] < 100 || minRating !== "Any";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 ">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Find Your Teacher
            </h1>
            <p className="text-muted-foreground">
              Browse our network of qualified educators and find the perfect match.
            </p>
            
          
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-card rounded-2xl border border-border p-4 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name, subject, or skill..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12"
                />
              </div>
              
              {/* Quick Filters */}
              <div className="flex gap-3">
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-40 h-12">
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button
                  variant={showFilters ? "default" : "outline"}
                  className="h-12"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="grid md:grid-cols-4 gap-6 pt-6 mt-4 border-t border-border animate-fade-up">
                {/* Level */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Level
                  </label>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}/hr
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={100}
                    step={5}
                    className="mt-4"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Minimum Rating
                  </label>
                  <Select value={minRating} onValueChange={setMinRating}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Any">Any Rating</SelectItem>
                      <SelectItem value="4.5">4.5+ Stars</SelectItem>
                      <SelectItem value="4.0">4.0+ Stars</SelectItem>
                      <SelectItem value="3.5">3.5+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  {hasActiveFilters && (
                    <Button variant="ghost" onClick={clearFilters} className="w-full">
                      <X className="w-4 h-4 mr-2" />
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-6">
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: {searchQuery}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                </Badge>
              )}
              {selectedSubject !== "All Subjects" && (
                <Badge variant="secondary" className="gap-1">
                  {selectedSubject}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedSubject("All Subjects")} />
                </Badge>
              )}
              {minRating !== "Any" && (
                <Badge variant="secondary" className="gap-1">
                  {minRating}+ Stars
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setMinRating("Any")} />
                </Badge>
              )}
            </div>
          )}

          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            Showing {filteredTeachers.length} teacher{filteredTeachers.length !== 1 ? 's' : ''}
          </p>

          {/* Teachers Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {teacher.map((teacher, index) => (
              <div
              key={teacher.teacherId || teacher.id || index}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TeacherCard teacher={teacher} />
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredTeachers.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No teachers found
              </h3>
              <p className="text-muted-foreground mb-6">
               Login to Find Teachers
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Teachers;
