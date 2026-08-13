import { Toaster } from "@/components/ui/sonner";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./Pages/Index";
import Teachers from "./Pages/Teacher/Teachers";
import TeacherProfile from "./Pages/Teacher/TeacherProfile";
import StudentAuth from "./Pages/Student/StudentLogin";
import TeacherRegister from "./Pages/Teacher/TeacherInfo";
import TeacherAuth from "./Pages/Teacher/TeacherLogin";
import TeacherDashboard from "./Dashboard/teacherdash";
import  TeacherEducation from "./Pages/Teacher/TeacherEducation";
import Teacherprofile from "./Pages/Teacher/TeacherProfile";

import About from "./Hero/about";
import Working from "./Hero/Working";
import Messages from "./Pages/Message/Message";
import UserLogin from "./login/UserLogin";

import StudentDashboardss from "./Dashboard/Studentdashboard";
import StudentProfile from "./Pages/Student/Studentprofile";
import StudentForm from "./Pages/Student/StudentForm";
import Notify from "./Pages/Notification/notify";


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
          <Route path="/tmessages/:id" element={<Messages />} />
          <Route path="/smessages/:id" element={<Messages />} />
          <Route path="/notifications/:id" element={<Notify />} />

          <Route path="/teachers" element={<Teachers />} />
          <Route path="/teacher/:id" element={<TeacherProfile />} />
          <Route path="/student-login" element={<StudentAuth />} />
          <Route path="/teacherRegister" element={<TeacherRegister />} />
          <Route path="/teacher-login" element={<TeacherAuth/>}/>
          <Route path="/teacher-dashboard/:id" element={<TeacherDashboard/>}/>
          <Route path="/teacher-profile/:id" element={<Teacherprofile/>}/>
          <Route path="/Educationform" element={<TeacherEducation/>}/>

          <Route path="/user-login" element={<UserLogin/>}/>

          <Route path="/student-dashboards" element={<StudentDashboardss />}/>
          <Route path="/student-profile/:id" element={<StudentProfile />}/>
          <Route path="/student-form/:id" element={<StudentForm />}/>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
