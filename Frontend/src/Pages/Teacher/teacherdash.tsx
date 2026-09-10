import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {PrivateNavbar} from "@/Pages/Home/Navbar/Navbar";
import {jwtDecode} from "jwt-decode";
import {
  Users,
  Calendar,
  DollarSign,
  Star,
  Clock,
  MessageSquare,
  BookOpen,
  Settings,
  ChevronRight,
  Video,
  FileText,
  BarChart3,
  Eye,
  
  LucideMessagesSquare,
  LucideBell,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const teacherProfile = {
  name: "Dr. Sarah Chen",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
  subject: "Mathematics",
  rating: 4.9,
  profileCompletion: 85,
};

const stats = [
  { label: "Total Students", value: "0",  icon: Users, color: "text-red-500" },
  { label: "Sessions This Month", value: "0",  icon: Calendar, color: "text-green-500" },
  // { label: "Monthly Earnings", value: "$3,120", icon: DollarSign, color: "text-yellow-600" },
  { label: "Average Rating", value: "0",  icon: Star, color: "text-red-600" },
];

const upcomingSessions: any[] = [
  // { id: 1, student: "Alex Thompson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", subject: "Calculus II", date: "Today", time: "2:00 PM - 3:00 PM", type: "Video Call", status: "confirmed" },
  // { id: 2, student: "Priya Patel", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face", subject: "SAT Math Prep", date: "Today", time: "4:30 PM - 5:30 PM", type: "Video Call", status: "confirmed" },
  // { id: 3, student: "Jordan Lee", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", subject: "Linear Algebra", date: "Tomorrow", time: "10:00 AM - 11:00 AM", type: "In Person", status: "pending" },
  // { id: 4, student: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", subject: "Statistics", date: "Feb 12", time: "1:00 PM - 2:00 PM", type: "Video Call", status: "confirmed" },
];


const recentReviews: any[] = [
  // { id: 1, student: "Alex Thompson", rating: 5, comment: "Dr. Chen explained complex calculus concepts in a way that finally clicked for me!", date: "2 days ago" },
  // { id: 2, student: "Priya Patel", rating: 5, comment: "Amazing SAT prep session. My practice scores have improved significantly.", date: "1 week ago" },
  // { id: 3, student: "Jordan Lee", rating: 4, comment: "Very thorough explanation of linear algebra. Would recommend!", date: "2 weeks ago" },
];



interface teacherData {
  name: string,
  email: string
}

interface tokenPayload {
  id: string,
  role: string,
}

interface activeuser {
  id: string,
  name: string,
  email: string
}
const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const {id} = useParams();
  const [store, setStore] = useState<teacherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [teacherName, setTeacherName] = useState("");
  const location = useLocation();

  const [activeChatUser, setactiveChatUser] = useState<activeuser[]>(() => {
    const saved = localStorage.getItem("activeUser");
    return saved ? (JSON.parse(saved) as activeuser[]) : [];
  });
  
  const [completeprofile, setCompleteprofile] = useState(false);
 
  const navigate = useNavigate();

  
  const token = localStorage.getItem("token");
  if(!token) {
    return <Navigate to="/user-login" />
    }

 
  //fetch token from backend and store in local storage
  useEffect(() => {
    const fetchToken = async () => {
      const savedtoken = localStorage.getItem("token");
     
      if (!savedtoken) {
        console.error("No token found, redirecting to login");
        return;
      }
    try {
      const res = await fetch(`http://localhost:5000/api/teachers/Info/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${savedtoken}`
        }
      });

      const data = await res.json();
      
     
      setCompleteprofile(data.profileComplete);
      setTeacherName(data.findteacherInfo.FName);
    
    } catch (error) {
      console.error(error);
    }
  };
  fetchToken();
  }, []);

  //this fetch teacher name
  useEffect(()=>{
    
    const fetchteacher = async ()=>{
      const savedtoken = localStorage.getItem("token");
      try {
        
        const res = await fetch(`http://localhost:5000/api/user/teacher-dashboard/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${savedtoken}`
          }
        });
        
        const data: teacherData = await res.json();
       
        setStore(data);
        
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchteacher();
  }, [])
  
  
    const profilePage = async ()=> {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/api/teachers/Info/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await res.json();
       
        const decoded = jwtDecode<tokenPayload>(token!);
       
        if(completeprofile){
          navigate(`/teacher/${decoded.id}`);
        }
        else{
          navigate(`/teacherRegister`);
        }
      } catch (error) {
        console.error(error);
      }
    }

    const LogOut = () => {
      localStorage.removeItem("token")
      navigate("/");
    };

  
  if(isLoading) return <div>Loading....</div>

  return (
    <div className="min-h-screen bg-gray-100">
     
      <main className="pt-5 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-2 border-primary/20">
                <AvatarImage src={teacherProfile.avatar} alt={teacherProfile.name} />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Welcome {teacherName}
                </h1>
                <h2>{!completeprofile && (
                  <Badge  className="text-red-500 lg:md:text-lg">Profile Incomplete</Badge>
                )}</h2>
                <p className="text-muted-foreground">
                  Here's what's happening with your teaching today.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-end">
              <Button size="sm" onClick={profilePage} className=" border-1 border-gray-400 cursor-pointer hover:bg-black hover:text-white hover:border-none">
                 
                  <Eye className="w-4 h-4 mr-2 text-red-600" />
                  View Profile
                
              </Button>
              
               
                 <DropdownMenu>
                   
      <DropdownMenuTrigger asChild>
        <Button className="border-1 border-gray-400" ><Settings className="w-4 h-4 mr-2" />Setting</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem onClick={LogOut}>Log Out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>

         <Link to={`/tmessages/${id}`}> <button className=" flex cursor-pointer bg-red-500 w-10 h-10 rounded-xl justify-center items-center">
            <LucideMessagesSquare className="w-6 h-6 text-white" />
            </button>
          </Link>
           <Link to={`/notifications/${id}`}> <button className=" flex cursor-pointer bg-red-500 w-10 h-10 rounded-xl justify-center items-center">
            <LucideBell className="w-6 h-6 text-white" />
            </button>
          </Link>
            </div>
          </div>

         

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <Card key={stat.label} className="hover:shadow-md transition-shadow border-1 border-red-200 bg-white">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground text-semibold">{stat.label}</span>
                    <div className={`w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-500">{stat.value}</div>
                  
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-gray-200 p-1">
              <TabsTrigger value="overview" className="gap-2 cursor-pointer">
                <BarChart3 className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="sessions" className="gap-2 cursor-pointer">
                <Calendar className="w-4 h-4" />
                Sessions
              </TabsTrigger>
              <TabsTrigger value="messages" className="gap-2 cursor-pointer">
                <MessageSquare className="w-4 h-4" />
                Messages
               
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Upcoming Sessions */}
                <div className="lg:col-span-2 ">
                  <Card className="bg-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-3 ">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-red-500" />
                        Upcoming Sessions
                      </CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setActiveTab("sessions")}>
                        View All <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {upcomingSessions && upcomingSessions.length > 0 ? (
                         upcomingSessions.slice(0, 3).map((session) => (
                        <div
                          key={session.id}
                          className="flex items-center gap-4 p-3 rounded-lg border-1 border-red-200 hover:bg-muted/30 transition-colors"
                        >
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={session.avatar} alt={session.student} />
                            <AvatarFallback>{session.student[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-foreground truncate">{session.student}</p>
                             
                            </div>
                            <p className="text-sm text-muted-foreground">{session.subject}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-medium text-foreground">{session.date}</p>
                            <p className="text-xs text-muted-foreground">{session.time}</p>
                          </div>
                          <div className="shrink-0">
                            {session.type === "Video Call" ? (
                              <Video className="w-4 h-4 text-red-500" />
                            ) : (
                              <Users className="w-4 h-4 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      ))
                      ):(
                         <div className="p-4 text-center">
                           <p className="text-xs text-muted-foreground">No recent Sessions</p>
                        </div>
                      )}
                     
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Recent Messages */}
                  <Card className="bg-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-primary" />
                        Messages
                      </CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setActiveTab("messages")}>
                        View All
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {activeChatUser.slice(0, 3).map((msg) => (
                        <div
                          key={msg?.id }
                          className={`flex items-start gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted/30 transition-colors `}
                        >
                          <Avatar className="w-8 h-8 mt-0.5 border-2 border-red-400">
                            <AvatarImage  alt={msg?.name[0] || "U"} />
                            <AvatarFallback>{msg?.name[0] || "Nahi pata"}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className={`text-sm font-semibold text-foreground`}>
                                {msg?.name || "Unknown User"}
                              </p>
                              
                              {/* <span className="text-[10px] text-muted-foreground shrink-0">{msg.time}</span> */}
                            </div>
                            {/* <p className="text-xs text-muted-foreground truncate mt-0.5">{msg.message}</p> */}
                          </div>
                          {/* {msg.unread && <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />} */}
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Recent Reviews */}
                  <Card className="bg-white">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        Recent Reviews
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {recentReviews && recentReviews.length > 0 ? (
                         recentReviews.map((review) => (
                        <div key={review.id} className="p-2 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-foreground">{review.student}</p>
                            <div className="flex gap-0.5">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">{review.comment}</p>
                          <p className="text-[10px] text-muted-foreground">{review.date}</p>
                        </div>
                      ))
                      ):(
                       <div className="p-4 text-center">
                           <p className="text-xs text-muted-foreground">No recent reviews yet.</p>
                        </div>
                      )
                    }
                     
                    </CardContent>
                  </Card>

                
                
                </div>
              </div>
            </TabsContent>

            {/* Sessions Tab */}
            <TabsContent value="sessions">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    All Upcoming Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingSessions && upcomingSessions.length > 0 ? (
                     upcomingSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center gap-4 p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={session.avatar} alt={session.student} />
                        <AvatarFallback>{session.student[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">{session.student}</p>
                          <Badge variant={session.status === "confirmed" ? "default" : "secondary"}>
                            {session.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{session.subject}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {session.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {session.time}
                          </span>
                          <span className="flex items-center gap-1">
                            {session.type === "Video Call" ? <Video className="w-3 h-3" /> : <Users className="w-3 h-3" />}
                            {session.type}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        {session.status === "pending" && (
                          <Button size="sm" variant="default">Accept</Button>
                        )}
                        <Button size="sm" variant="outline">
                          {session.type === "Video Call" ? "Join" : "Details"}
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                  ):(
                     <div className="p-4 text-center">
                           <p className="text-xs text-muted-foreground">No recent Sessions.</p>
                        </div>
                  )}
                 
                </CardContent>
              </Card>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    Messages
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {activeChatUser.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-4 p-4 rounded-lg cursor-pointer hover:bg-muted/30 transition-colors `}
                    >
                      <Avatar className="w-10 h-10 border-2 border-green-500">
                        <AvatarImage  alt={msg.name[0]} />
                        <AvatarFallback>{msg.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className={`text-sm font-medium text-foreground`}>
                            {msg.name}
                          </p>
                          {/* <span className="text-xs text-muted-foreground">{msg.time}</span> */}
                        </div>
                        {/* <p className="text-sm text-muted-foreground">{msg.message}</p> */}
                      </div>
                      {/* {msg.unread && <div className="w-2.5 h-2.5 rounded-full bg-primary shrink-0 mt-2" />} */}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>


          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
