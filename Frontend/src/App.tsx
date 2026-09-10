import { Toaster } from "@/components/ui/sonner";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./Pages/Home/Index";
import Teachers from "./Pages/Teacher/Teachers";
import TeacherProfile from "./Pages/Teacher/TeacherProfile";
import FAQ from "./Pages/Footer/FAQ";
import TeacherRegister from "./Pages/Teacher/TeacherInfo";
import Contact from "./Pages/Footer/Contact";
import TeacherDashboard from "./Pages/Teacher/teacherdash";
import  TeacherEducation from "./Pages/Teacher/TeacherEducation";
import Teacherprofile from "./Pages/Teacher/TeacherProfile";
import AccessGate from "./Pages/Accesspage/accesspage";

import About from "./Hero/about";
import Working from "./Hero/Working";

import UserLogin from "./login/UserLogin";

import StudentDashboardss from "./Pages/Student/Studentdashboard";
import StudentProfile from "./Pages/Student/Studentprofile";
import StudentForm from "./Pages/Student/StudentForm";
import Notify from "./Pages/Notification/notify";
import HelpCenter from "./Pages/Footer/HelpCenter";

import TMessage from "./Pages/Message/TMessage";
import RMessage from "./Pages/Message/SMessage";

import TeacherLogin from "./Secretfolder/TeacherLogin";
import StudentHome from "./Pages/Student/StudentHome";
import Events from "./Pages/Event/Event";
import { Admin } from "./Secretfolder/Admin";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/working" element={<Working />} />
          <Route path="/tmessages/:id" element={<TMessage />} />
          
          <Route path="/notifications/:id" element={<Notify />} />

          <Route path="/teachers" element={<Teachers />} />
          <Route path="/teacher/:id" element={<TeacherProfile />} />
         
          <Route path="/teacherRegister" element={<TeacherRegister />} />
        
          <Route path="/teacher-dashboard/:id" element={<TeacherDashboard/>}/>
          <Route path="/teacher-profile/:id" element={<Teacherprofile/>}/>
          <Route path="/Educationform" element={<TeacherEducation/>}/>

          <Route path="/user-login" element={<UserLogin/>}/>
          <Route path="/Teacher-login321" element={<TeacherLogin/>}/>

         
          <Route path="/student-dashboards/:id" element={<StudentDashboardss />}/>
          <Route path="/student-profile/:id" element={<StudentProfile />}/>
          <Route path="/student-form/:id" element={<StudentForm />}/>

          <Route path="/access" element={<AccessGate />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />

          {/* Student Navbar */}
           <Route path="/student-home/:id" element={<StudentHome/>}/>
           <Route path="/student-dashboards/:id" element={<StudentDashboardss />}/>
           <Route path="/student-profile/:id" element={<StudentProfile />}/>
           <Route path="/smessages/:id" element={<RMessage />} />
           <Route path="/events/:id" element={<Events/>}/>

           {/* Admin */}
           <Route path="/tuto-admin" element={<Admin/>}/>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
