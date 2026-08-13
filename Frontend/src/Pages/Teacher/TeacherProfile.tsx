import { Link, useParams } from "react-router-dom";
import Navbar from "../../Hero/Navbar";
import Footer from "../../Hero/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Star,
  MapPin,
  Clock,
  Calendar,
  MessageSquare,
  Heart,
  Share2,
  CheckCircle,
  GraduationCap,
  Users,
} from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useEffect, useState } from "react";
import TeacherEducation from "./TeacherEducation";
import {jwtDecode} from "jwt-decode";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

const teacherData = {
  id: "1",
  name: "Dr. Sarah Chen",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
  subject: "Mathematics",
  tagline: "Making complex math simple and enjoyable",
  specializations: ["Calculus", "Linear Algebra", "Statistics", "SAT Prep", "AP Mathematics"],
  rating: 4.9,
  reviewCount: 0,
  experience: 12,
  hourlyRate: 65,
  location: "San Francisco, CA",
  responseTime: "Usually responds within 2 hours",
  availability: "Mon-Fri: 9am-8pm, Sat-Sun: 10am-6pm",
  totalStudents: 450,
  totalSessions: 2340,
  verified: true,
  bio: `I'm a passionate mathematician with a PhD from Stanford University and over 12 years of teaching experience. My approach focuses on building deep conceptual understanding rather than rote memorization.

I believe every student can excel at mathematics when given the right support and guidance. My teaching style adapts to each student's learning needs, combining visual explanations, practical examples, and hands-on problem solving.

Whether you're struggling with algebra basics or preparing for advanced calculus exams, I'm here to help you achieve your academic goals.`,
  education: [
    { degree: "PhD in Applied Mathematics", school: "Stanford University", year: "2012" },
    { degree: "MS in Mathematics", school: "MIT", year: "2008" },
    { degree: "BS in Mathematics", school: "UC Berkeley", year: "2006" },
  ],
  certifications: [
    "California Teaching Credential",
    "SAT Certified Instructor",
    "AP Calculus Certified",
  ],
  reviews: [
    // {
    //   id: 1,
    //   name: "Alex Thompson",
    //   avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    //   rating: 5,
    //   date: "2 weeks ago",
    //   content: "Dr. Chen is an amazing teacher! She helped me improve my calculus grade from a C to an A. Her explanations are clear and she's very patient. Highly recommend!",
    // },
    // {
    //   id: 2,
    //   name: "Priya Patel",
    //   avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    //   rating: 5,
    //   date: "1 month ago",
    //   content: "Excellent tutor! She made statistics so much easier to understand. Her real-world examples really helped me grasp the concepts. I wish I had found her sooner!",
    // },
    // {
    //   id: 3,
    //   name: "Jordan Lee",
    //   avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    //   rating: 5,
    //   date: "1 month ago",
    //   content: "Best math tutor I've ever had. Very organized and explains things in multiple ways until you truly understand. Got into my dream college thanks to her SAT prep!",
    // },
  ],
};

interface TeacherDataType {
     teacherId: string,
     FName: string,
     LName: string,
     location: string,
     experience: number,
     subjects: string[],
     bio: string,
     hourlyRate: number,
     email: string,
     ClassLevels: string[],
}

interface response {
  findteacherInfo: TeacherDataType
  isOwner: boolean;
  profileComplete: boolean;
}

const TeacherProfile = () => {
  const {id}  = useParams<{id: string}>();
  const navigate = useNavigate();
  const [isLoding, setIsLoading] = useState(true);
  const [store , setStore] = useState<TeacherDataType | null>(null);
  const [isOwner, setIsOwner] = useState(false);

useEffect(() => {
    if(!id) return;
    
    const fetchTeacher = async ()=> {
      try {
        const savedtoken = localStorage.getItem("token");
        if(!savedtoken) {
          setTimeout(() => navigate("/"), 2000);
          return;
        }
        const res = await fetch(`http://localhost:5000/api/teachers/Info/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${savedtoken}`,
          }
        });
        
        const data: response = await res.json();
       
        
        setStore(data.findteacherInfo);
        setIsOwner(data.isOwner);
        
        setIsLoading(false);
      } catch (error: any) {
        console.error("Error: ", error);
        if (error.response && error.response.status === 401) {
     
      
      // 1. Wipe the dead token so the app doesn't loop endless bad requests
      localStorage.removeItem("token");
      
      // 2. Safely kick them back to login
      navigate("/login");
    }
      }
    };
    fetchTeacher();
}, [id]);

if(isLoding) return <div>Loading..</div>

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20 ">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8 ">
              {/* Header Card */}
              <Card className="overflow-hidden ">
                <div className="h-42 -mt-6 bg-red-500" />
                <CardContent className="pt-0 relative">
                  <div className="flex flex-col md:flex-row gap-6 -mt-16 ">
                    {/* Avatar */}
                    <div className="relative">
                      <img
                        src={teacherData.avatar}
                        alt={teacherData.name}
                        className="w-32 h-32 rounded-2xl object-cover border-4 border-card shadow-xl"
                      />
                      {teacherData.verified && (
                        <div className="absolute top-25 -right-2 w-8 h-8 bg-green-400 border-white border-1 rounded-full flex items-center justify-center shadow-md">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 pt-4 md:pt-16">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h1 className="text-2xl md:text-3xl font-bold text-card-foreground">
                            {store?.FName} {store?.LName}
                          </h1>
                          <p className="text-primary font-medium text-lg mt-1">
                            {teacherData.subject} Expert
                          </p>
                          <p className="text-muted-foreground mt-1">
                            {teacherData.tagline}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon">
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Stats Row */}
                      <div className="flex flex-wrap gap-6 mt-4 text-sm">
                        <div className="flex items-center gap-1.5">
                          <Star className="w-5 h-5 text-warning fill-warning" />
                          <span className="font-semibold text-card-foreground">{teacherData.rating}</span>
                          <span className="text-muted-foreground">({teacherData.reviewCount} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {teacherData.location}
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {store?.experience} years experience
                        </div>
                      </div>

                      {/* Specializations */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {store?.subjects.map((spec) => (
                          <Badge key={spec} variant="secondary">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* About */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-card-foreground mb-4">About</h2>
                  <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {store?.bio}
                  </div>
                </CardContent>
              </Card>

              {/* Education & Certifications */}
              <div className="grid md:grid-cols-2 gap-6">
                <TeacherEducation/>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      <h2 className="text-xl font-semibold text-card-foreground">Class Level</h2>
                    </div>
                    <div className="space-y-3">
                      {store?.ClassLevels.map((cert, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span className="text-card-foreground">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Reviews */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-warning fill-warning" />
                      <h2 className="text-xl font-semibold text-card-foreground">
                        Reviews
                      </h2>
                    </div>
                 
                    {/* CHANGE: Render "Open Dialog" for reviews only if user is NOT the owner */}
                    {!isOwner && (
                      <Dialog>
                        <form>
                          <DialogTrigger asChild>
                            <Button variant="outline">Open Dialog</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-sm bg-white">
                            <DialogHeader>
                              <DialogTitle>Review</DialogTitle>
                            </DialogHeader>
                            <FieldGroup>
                              <Field>
                                <Textarea placeholder="Write your review here..." className="resize-none h-24" />
                              </Field>
                            </FieldGroup>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <Button type="submit">Save changes</Button>
                            </DialogFooter>
                          </DialogContent>
                        </form>
                      </Dialog>
                    )}
                  </div>
                  
                  <div className="space-y-6">
                    {teacherData.reviews && teacherData.reviews.length > 0 ? (
                      teacherData.reviews.map((review) => (
                      <div key={review.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
                        <div className="flex items-start gap-4">
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-card-foreground">{review.name}</h4>
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                            <div className="flex gap-0.5 my-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-warning fill-warning" />
                              ))}
                            </div>
                            <p className="text-muted-foreground mt-2">{review.content}</p>
                          </div>
                        </div>
                      </div>
                    ))
                    ):(
                      <div className="p-4 text-center">
                           <p className="text-xs text-muted-foreground">No recent reviews yet.</p>
                        </div>
                    )}
                    
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Booking Card */}
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="text-center mb-6 ">
                      <div className="text-4xl font-bold text-card-foreground">
                        ${store?.hourlyRate}
                      </div>
                      <div className="text-muted-foreground">per hour</div>
                    </div>

                    <div className="space-y-4">
                      {/*  CHANGE: Dynamic Button Layouts depending on Owner permission status */}
                      {isOwner ? (
                        // Rendered if the viewing user is the Owner
                        <Link to="/teacherRegister" className="w-full">
                          <Button variant="default" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            Edit Profile Settings
                          </Button>
                        </Link>
                      ) : (
                        // Rendered if the viewing user is a Visitor (!isOwner)
                        <>
                          <Button variant="default" size="lg" className="w-full bg-red-500 text-white">
                            <Calendar className="w-4 h-4 mr-2" />
                            Book a Session
                          </Button>
                          <Button variant="outline" size="lg" className="w-full">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Send Message
                          </Button>
                        </>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground text-center mt-4">
                      {teacherData.responseTime}
                    </p>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-card-foreground mb-4">Quick Stats</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>Total Students</span>
                        </div>
                        <span className="font-semibold text-card-foreground">{teacherData.totalStudents}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Star className="w-4 h-4" />
                          <span>Average Rating</span>
                        </div>
                        <span className="font-semibold text-card-foreground">{teacherData.rating}/5</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Availability */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-card-foreground mb-4">For more Information mail on : </h3>
                    <p className="text-sm text-muted-foreground">{store?.email}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TeacherProfile;