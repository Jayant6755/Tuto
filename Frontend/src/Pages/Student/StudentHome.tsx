import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {  CalendarCheck, LucideUser2, User2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import PrivateNavbar from "@/Pages/Home/Navbar/Navbar";
import {useQuery} from "@tanstack/react-query";
import {
  getStudentDashboard,
  getUserInfo,
  getSavedTeachers,
} from "@/API/studentapi"
import { getAllTeachers } from "@/API/teacherapi";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";

/* ── mock data ── */


const recommendedTeachers = [
  {
    id: "1",
    name: "Ravi Joshi",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    subject: "Mathematics workshop",
    tagline: "Stanford PhD · 12 yrs experience",
    rating: 4.9,
    time: "1:00 - 3:00",
    reviewCount: 284,
    hourlyRate: 65,
    match: 96,
  },
  {
    id: "2",
    name: "Vikas Bisht",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
    subject: "Physics lab",
    tagline: "MIT alumnus · AP Physics specialist",
    rating: 4.8,
     time: "12:00 - 1:00",
    reviewCount: 192,
    hourlyRate: 55,
    match: 91,
  },
  {
    id: "3",
    name: "Yash Sani",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
    subject: "Chemistry lab",
    tagline: "10 yrs teaching · IB & SAT prep",
    rating: 4.7,
     time: "11:00 - 1:00",
    reviewCount: 147,
    hourlyRate: 50,
    match: 87,
  },
];

const  details = [
  {
    title: "Verified Teachers",
    subtitle: "Expert educators",
    value: "120+",
    icons: <User2 className="w-7 h-7 text-red-500"/>
  },
   {
    title: "Subjects",
    subtitle: "Wide range of topics",
    value: "500+",
    icons: <GraduationCap className="w-7 h-7 text-blue-500"/>
  }, {
    title: "Upcoming Events",
    subtitle: "Join and Learn",
    value: 35,
     icons: <CalendarCheck className="w-7 h-7 text-green-500"/>
  }, {
    title: "Active Students",
    subtitle: "Learning together",
    value: "250+",
     icons: <MessageSquare className="w-7 h-7 text-purple-500"/>
  },
]
  






interface teacher {
  FName: string;
  LName: string;
  email: string;
  location: string;
  bio: string;
  subjects: string[];
  ClassLevels: string[];
  experience: string;
  hourlyRate: number;
}



/* ── component ── */

const StudentHome = () => {
  const [searchQuery, setSearchQuery] = useState("");
 
  const navigate = useNavigate();

  const token = localStorage.getItem("token")
  if(!token){
    navigate("/user-login");
  }
  
  const {
    data: dashboardData,
    isLoading: dashboardLoading,
  } = useQuery({
    queryKey: ["student-dashboard"],
    queryFn: getStudentDashboard,
  })
  
  const id = dashboardData?.studentId;

  const {
    data: userData,
    isLoading: userLoading,
  } = useQuery ({
    queryKey: ["user-info", id],
    queryFn: () => getUserInfo(id),
    enabled: !!id,
  });
  

 //fetch saved teachers
  const {
    data: savedTeacherData,
    isLoading: savedTeachersLoading,
  } = useQuery({
    queryKey: ["saved-teachers"],
    queryFn: getSavedTeachers,
  });
  
  const savedTeachers = savedTeacherData?.savedTeachers ?? [];
  

  
  //fetch all the teachers 
  const {
    data: allteachers = [],
    isLoading: teachersLoading,
    isError: teachersError,
  } = useQuery<teacher[]>({
    queryKey: ["teachers"],
    queryFn: getAllTeachers,
  });


  const logut = ()=>{
    localStorage.removeItem("token");
    navigate("/")
    
  }
  if (
    dashboardLoading ||
    userLoading ||
    savedTeachersLoading ||
    teachersLoading 
  ) {
    return(
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading.....</p>
      </div>
    );
  }

  if(teachersError){
    return <p>Failed to load teachers</p>
  }

  
  
  return (
    <div className="min-h-screen bg-gray-100">
     
      <PrivateNavbar />
      <main className="pt-5 pb-16">
        <div className="container mx-auto px-4">
          {/* ── Header ── */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border border-gray-200 bg-gradient-to-r from-red-100/50 to-red-100 p-4 rounded-xl">
            <div className="flex-col gap-4">
                  
                <h1 className="text-2xl lg:md:text-5xl lg:md:w-90 font-bold text-foreground">
                  Good Morning, <span className="text-red-500">{userData?.user.name}!</span> 
                </h1>
                <p className="text-lg lg:md:text-xl text-gray-500 mt-2">Every day is a new opportunity to learn something new.</p>
              <p className="text-lg lg:md:text-xl text-gray-500 mt-2">Let's continue your learning journey today.</p>
              <div className="flex py-5 gap-5">
                <button className="bg-red-500 text-lg text-white rounded-xl p-2">
                    Explore Teachers
                </button>

                <button className="text-lg rounded-xl border border-gray-300 p-2 bg-white">
                  View Events
                </button>
              </div>
             
            </div>

            <div className="text-lg font-serif">
               <img 
               src="\public\Pictures\28b821ad-4f84-49fd-bd26-6b685e32347a-removebg-preview.png"
               alt="Image"
               className="h-100 w-200 "
               />
            </div>
           
          </div>

         <div className="flex w-full gap-6 ">
            {details.map((d)=> (
              <div className="flex w-full border border-gray-300 rounded-xl p-4 bg-white">
                  <div className="w-1/3 flex justify-center items-center">
                    <div aria-label="Icon" className="rounded-full">
                      {d.icons}
                    </div>
                  </div>

                  <div className="flex-col">
                      <h2 className="text-lg lg:md:text-xl font-bold">{d.value}</h2>
                      <p className="text-sm text-gray-500">{d.title}</p>
                      <p className="text-sm text-gray-500">{d.subtitle}</p>
                  </div>
              </div>
            ))}
         </div>

          {/* ── Stats ── */}
          <div className="text-xl font-serif pt-4 ">
            <p className="flex gap-2">
              <Zap className="text-yellow-500 "/>  Recommended <span className="text-red-500">Teachers</span>
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 mt-3">
            {allteachers.map((teachers) => (
              <Card  className="hover:shadow-md transition-shadow bg-white border-1  border-gray-300">
                <CardContent className="flex flex-col gap-3 ">
                  <div className="flex flex items-center gap-3 justify-between mb-3">

                    <div className="w-1/3 ">
                          <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face" 
                    alt={teachers.FName[0]} 
                    className="rounded-full" />
                    </div>
                    <div className="flex-col flex justify-start items-start w-2/3 gap-2">
                    <span className="text-sm lg:md:text-lg text-lg font-semibold ">{teachers.FName} {teachers.LName}</span>
                    <span className="text-sm  text-red-500 bg-red-100 p-1 px-2 rounded-xl">{teachers.subjects[0]}</span>
                    <span className="text-sm text-gray-400 ">{teachers.experience} years experience</span>
                    </div>
                   
                  </div>
                  <div className="flex gap-4">
                     <p className="text-sm bg-gray-200 p-1 rounded-lg">{teachers.ClassLevels[0]}</p>
                    <p className="text-sm bg-gray-200 p-1 rounded-lg">{teachers.ClassLevels[1]}</p>
                  </div>
                  <div className="flex flex-col">
                    <button className="border-1 border-gray-300 bg-red-100 text-red-500 p-2 rounded-xl justify-center items-center cursor-pointer hover:bg-red-500 hover:text-white">
                        View Profile
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ── Main Grid ── */}
          <div className="flex flex-col gap-4">
            {/* Left Column — Feed + Posted Needs */}
            <div className="lg:col-span-2 space-y-6">

              {/* Recommended Teachers (like "Candidates") */}
              <Card className="border-1 border-gray-300 hover:shadow-md transition-shadow bg-white">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    Upcomming Events
                  </CardTitle>
                 
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendedTeachers.map((teacher) => (
                    <div
                      key={teacher.id}
                      className="flex items-center gap-4 p-4 rounded-xl border border-gray-300 bg-gray-50 hover:border-red-300 hover:shadow-sm transition-all "
                    >
                      <div className="flex flex-col">
                            <p className="">May</p>
                            <p className="ml-1"> 24 </p>
                      </div>
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
                            {teacher.subject}
                          </Link>
                         
                        </div>
                        <p className="text-sm text-gray-700"> By {teacher.name}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-700">
                          <span className="flex items-center gap-0.5">
                           <Clock className="w-3 h-3"/> {teacher.time}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0 ">
                        <Link to={'/teachers'}>
                        <Button variant="default" size="sm" className="rounded-xl bg-red-500 text-white hover:scale-105 transition-transform cursor-pointer">
                           Join
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
                    savedTeachers.map((t: any) => (
                      <Link
                        key={t.teacherId}
                        to={`/teacher/${t.teacherId}`}
                        className="flex items-center gap-3 p-2.5 rounded-xl border-1 border-gray-300 hover:bg-gray-100 transition-colors"
                      >
                        <Avatar className="w-9 h-9">
                          <AvatarImage  alt={t.FName} />
                          <AvatarFallback className="bg-red-500 text-white ">{t.FName[0]}</AvatarFallback>
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

export default StudentHome;
