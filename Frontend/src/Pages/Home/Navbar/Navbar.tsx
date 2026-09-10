import React from 'react'
import { GraduationCap } from 'lucide-react';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export const PrivateNavbar = () => {
  const userId = useParams();
  
  return (
    
     <Menubar className="w-full md:lg:h-16 border-gray-200 bg-transparent border-1 rounded-none flex items-center justify-center gap-10 border-b border-t-0 border-gray-300">
      <Link to="/" className="flex items-center gap-2 font-sans absolute left-5">
            <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl md:text-3xl font-bold text-foreground">Tuto</span>
          </Link>
      <MenubarMenu>
        <Link to={`/student-home/${userId.id}`}>
        <MenubarTrigger className="hover:cursor-pointer">Home</MenubarTrigger>
        </Link>
      </MenubarMenu>
      <MenubarMenu>
        <Link to="/teachers">
        <MenubarTrigger className="hover:cursor-pointer">Teachers</MenubarTrigger>
        </Link>
      </MenubarMenu>
      <MenubarMenu>
        <Link to={`/smessages/${userId.id}`}>
        <MenubarTrigger className="hover:cursor-pointer">Messages</MenubarTrigger>
        </Link>
      </MenubarMenu>
      <MenubarMenu>
            <Link to={`/events/${userId.id}`}>
        <MenubarTrigger className="hover:cursor-pointer">Events</MenubarTrigger>
        </Link>
      </MenubarMenu>
      <MenubarMenu>
        <Link to={`/student-dashboards/${userId.id}`}>
          <MenubarTrigger className="hover:cursor-pointer">Activity</MenubarTrigger>
        </Link>
      </MenubarMenu>
      <MenubarMenu>
        <Link to={`/student-profile/${userId.id}`}>
        <MenubarTrigger className="hover:cursor-pointer">Profile</MenubarTrigger>
        </Link>
      </MenubarMenu>
     
    </Menubar>
  )
}
export default PrivateNavbar;
