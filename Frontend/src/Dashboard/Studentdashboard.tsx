import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideMessagesSquare } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import PrivateNavbar from "@/Pages/Navbar/Navbar";
import {
  Search,
  Bell,
  Settings,
  Briefcase,
  UserPlus,
  MessageSquare,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  ChevronRight,
  BookOpen,
  Users,
  TrendingUp,
  Heart,
  ExternalLink,
  ThumbsUp,
  Send,
  GraduationCap,
  Eye,
  Bookmark,
  Zap,
} from "lucide-react";

import axios from "axios";

/* ── mock data ── */

const studentProfile = {
  name: "Jamie Rivera",
  avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face",
  headline: "High School Senior | Math & Physics Enthusiast",
  location: "Austin, TX",
  connectionsCount: 12,
  openRoles: 2,
};

const stats = [
  { label: "Teachers Connected", value: "0", icon: Users, color: "text-red-500" },
  { label: "Active Sessions", value: "0", icon: BookOpen, color: "text-green-500" },
  { label: "Hours Learned", value: "0", icon: Clock, color: "text-yellow-500" },
  { label: "Avg. Rating Given", value: "0", icon: Star, color: "text-blue-500" },
];

const recommendedTeachers = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    subject: "Mathematics",
    tagline: "Stanford PhD · 12 yrs experience",
    rating: 4.9,
    reviewCount: 284,
    hourlyRate: 65,
    match: 96,
  },
  {
    id: "2",
    name: "Prof. James Okafor",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
    subject: "Physics",
    tagline: "MIT alumnus · AP Physics specialist",
    rating: 4.8,
    reviewCount: 192,
    hourlyRate: 55,
    match: 91,
  },
  {
    id: "3",
    name: "Maria Gonzalez",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
    subject: "Chemistry",
    tagline: "10 yrs teaching · IB & SAT prep",
    rating: 4.7,
    reviewCount: 147,
    hourlyRate: 50,
    match: 87,
  },
];

const connectionRequests = [
  {
    id: 1,
    name: "Lena Müller",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    subject: "Biology",
    tagline: "Harvard PhD · 8 yrs experience",
    mutualConnections: 3,
  },
  {
    id: 2,
    name: "David Park",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    subject: "Computer Science",
    tagline: "Full-stack dev turned educator",
    mutualConnections: 1,
  },
];

const activityFeed = [
  {
    id: 1,
    type: "session_complete",
    teacher: "Dr. Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    content: "Completed a Calculus II session with you",
    time: "2 hours ago",
    likes: 0,
  },
  {
    id: 2,
    type: "new_material",
    teacher: "Prof. James Okafor",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    content: "Shared new study material: \"AP Physics — Electromagnetism Cheat Sheet\"",
    time: "5 hours ago",
    likes: 12,
  },
  {
    id: 3,
    type: "review_reminder",
    teacher: "Maria Gonzalez",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
    content: "Your Chemistry session is coming up tomorrow at 3 PM",
    time: "Yesterday",
    likes: 0,
  },
];

const postedNeeds = [
  {
    id: 1,
    title: "SAT Math Prep — Target 780+",
    description: "Looking for a tutor experienced with SAT math, available evenings and weekends.",
    applicants: 8,
    posted: "3 days ago",
    status: "active",
  },
  {
    id: 2,
    title: "AP Physics C — Mechanics",
    description: "Need help understanding rotational dynamics and practice with FRQ problems.",
    applicants: 5,
    posted: "1 week ago",
    status: "active",
  },
];

type SavedTeacher = {
  teacherId: string;
  FName: string;
  LName: string;
  email: string;
  location: string;
  bio: string;
  subjects: string[];
  ClassLevels: string[];
  experience: string;
  hourlyRate: number;
};



/* ── component ── */

const StudentDashboardss = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [savedTeachers, setSavedTeachers] = useState<SavedTeacher[]>([]);

  
  useEffect(() => {
    const fetchid = async () => {
      const savedToken = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:5000/api/user/student-dashboard", {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          }
        });
        const data = response.data;
        
        if (!data) {
          console.error("No student dashboard data received");
          return;
        }
       
       
        setId(data.studentId);
        
      } catch (error) {
        console.error("Error fetching student dashboard data:", error);
      }
    };

    fetchid();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/user-info/${id}`);
        const data = response.data;
        
        setName(data.user.name);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchUser();
  }, [id]);

  useEffect(() => {
    const fetchSavedTeachers = async () => {
      const savedToken = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:5000/api/student/savedTeacher", {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          }
        });
        const data = response.data;
        
        setSavedTeachers(data.savedTeachers);
      } catch (error) {
        console.error("Error fetching saved teachers:", error);
      }
    };

    fetchSavedTeachers();
  }, []);

  
  return (
    <div className="min-h-screen bg-gray-100">
     
      <PrivateNavbar />
      <main className="pt-5 pb-16">
        <div className="container mx-auto px-4">
          {/* ── Header ── */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-2 border-primary/20">
                <AvatarImage src={studentProfile.avatar} alt={studentProfile.name} />
                <AvatarFallback>JR</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Welcome, {name}!
                </h1>
                <p className="text-muted-foreground text-sm">{studentProfile.headline}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button className="border-1 border-gray-300" size="sm" asChild>
                <Link to={`/student-profile/${id}`}>
                  <Eye className="w-4 h-4 mr-2" />
                  My Profile
                </Link>
              </Button>
              <Button className="border-1 border-gray-300" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              
              <Link to={`/smessages/${id}`} className="relative bg-red-100 text-red-500 rounded-full p-2 hover:bg-red-200 transition-colors">
                 <LucideMessagesSquare className="w-6 h-6 text-red-500" />
              </Link>
            </div>
          </div>

          {/* ── Search Bar (LinkedIn‑style) ── */}
          <div className="relative mb-8 bg-white  rounded-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground " />
            <Input
              placeholder="Search teachers by name, subject, or skill…"
              className="pl-12 h-12 rounded-xl text-base border-border border-gray-300 bg-card shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* ── Stats ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 ">
            {stats.map((stat) => (
              <Card key={stat.label} className="hover:shadow-md transition-shadow bg-white border-1 border-gray-300">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center bg-gray-200">
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ── Main Grid ── */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column — Feed + Posted Needs */}
            <div className="lg:col-span-2 space-y-6">

              {/* Posted Learning Needs (like "Jobs")
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    My Learning Needs
                  </CardTitle>
                  <Button variant="default" size="sm">
                    <Briefcase className="w-4 h-4 mr-1.5" />
                    Post Need
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {postedNeeds.map((need) => (
                    <div
                      key={need.id}
                      className="p-4 rounded-xl border border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{need.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{need.description}</p>
                        </div>
                        <Badge variant={need.status === "active" ? "default" : "secondary"} className="shrink-0">
                          {need.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <UserPlus className="w-3.5 h-3.5" />
                          {need.applicants} teacher applicants
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          Posted {need.posted}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card> */}

              {/* Activity Feed
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Activity Feed
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activityFeed.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 p-3 rounded-xl hover:bg-muted/30 transition-colors"
                    >
                      <Avatar className="w-10 h-10 shrink-0">
                        <AvatarImage src={item.avatar} alt={item.teacher} />
                        <AvatarFallback>{item.teacher[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">
                          <span className="font-semibold">{item.teacher}</span>{" "}
                          <span className="text-muted-foreground">{item.content}</span>
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-1">{item.time}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                            <ThumbsUp className="w-3.5 h-3.5" /> Like
                          </button>
                          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                            <MessageSquare className="w-3.5 h-3.5" /> Comment
                          </button>
                          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                            <Send className="w-3.5 h-3.5" /> Share
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card> */}

              {/* Recommended Teachers (like "Candidates") */}
              <Card className="border-1 border-gray-300 hover:shadow-md transition-shadow bg-white">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    Recommended Teachers
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="hover:bg-black hover:text-white transition-colors" asChild>
                    <Link to="/teachers">
                      See All <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendedTeachers.map((teacher) => (
                    <div
                      key={teacher.id}
                      className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-red-300 hover:shadow-sm transition-all"
                    >
                      <Avatar className="w-14 h-14 shrink-0">
                        <AvatarImage src={teacher.avatar} alt={teacher.name} />
                        <AvatarFallback>{teacher.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/teacher/${teacher.id}`}
                            className="font-semibold text-foreground hover:text-primary transition-colors"
                          >
                            {teacher.name}
                          </Link>
                         
                        </div>
                        <p className="text-sm text-gray-700">{teacher.subject} · {teacher.tagline}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-700">
                          <span className="flex items-center gap-0.5">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {teacher.rating} ({teacher.reviewCount})
                          </span>
                          <span>${teacher.hourlyRate}/hr</span>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0 ">
                        <Button variant="outline" size="sm" className="rounded-xl bg-gray-200 border-1 border-gray-300 cursor-pointer text-black hover:bg-black hover:text-white transition-colors">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Link to={'/teachers'}>
                        <Button variant="default" size="sm" className="rounded-xl bg-red-500 text-white hover:scale-105 transition-transform cursor-pointer">
                          <UserPlus className="w-4 h-4 mr-1" /> Connect
                        </Button>
                        </Link>
                        
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column — Sidebar */}
            <div className="space-y-6 ">

              {/* Connection Requests
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-primary" />
                    Requests
                  </CardTitle>
                  <Badge variant="destructive" className="h-5 px-2 text-[10px]">
                    {connectionRequests.length}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  {connectionRequests.map((req) => (
                    <div key={req.id} className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={req.avatar} alt={req.name} />
                        <AvatarFallback>{req.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{req.name}</p>
                        <p className="text-[11px] text-muted-foreground">{req.subject} · {req.mutualConnections} mutual</p>
                      </div>
                      <div className="flex gap-1.5 shrink-0">
                        <Button variant="default" size="icon" className="h-8 w-8 rounded-full">
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground">
                          ✕
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card> */}

              {/* Saved Teachers */}
              <Card className="border-1 border-gray-300 hover:shadow-md transition-shadow bg-white h-auto"> 
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bookmark className="w-5 h-5 text-red-500" />
                    Saved Teachers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {savedTeachers.length > 0 ? (
                    savedTeachers.map((t) => (
                      <Link
                        key={t.teacherId}
                        to={`/teacher/${t.teacherId}`}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <Avatar className="w-9 h-9">
                          <AvatarImage  alt={t.FName} />
                          <AvatarFallback>{t.FName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{t.FName} {t.LName}</p>
                          <p className="text-[11px] text-muted-foreground">{t.subjects.join(', ')}</p>
                        </div>
                        <div className="flex items-center gap-0.5 text-xs text-muted-foreground">
                          <Star className="w-3 h-3 text-warning fill-warning" />
                          
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="text-center py-10 text-muted-foreground">
                      <Heart className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">You haven't saved any teachers yet.</p>
                    </div>
                  )}
                  <Button variant="ghost" size="sm" className="w-full text-primary hover:bg-black hover:text-white transition-colors transition-smooth" asChild>
                    <Link to="/teachers">Browse Teachers</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions
              <Card className="border-1 border-gray-300 hover:shadow-md transition-shadow bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start gap-2" size="sm" asChild>
                    <Link to="/teachers">
                      <Search className="w-4 h-4 text-primary" />
                      Find a Teacher
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2" size="sm" asChild>
                    <Link to="/learning-needs">
                      <Briefcase className="w-4 h-4 text-primary" />
                      Post a Learning Need
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2" size="sm" asChild>
                    <Link to="/subjects">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      Update Subjects
                    </Link>
                  </Button>
                </CardContent>
              </Card> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboardss;
