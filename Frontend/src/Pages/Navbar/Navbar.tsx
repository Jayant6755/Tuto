import React from 'react'
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Link } from 'react-router-dom';

export const PrivateNavbar = () => {
  return (
     <Menubar className="w-full md:lg:h-16 border-gray-200 bg-transparent border-1 rounded-none flex items-center justify-center gap-10 border-b border-t-0 border-gray-300">
      <MenubarMenu>
        <Link to="/teachers">
        <MenubarTrigger className="hover:cursor-pointer">Find Teacher</MenubarTrigger>
        </Link>
      </MenubarMenu>
      <MenubarMenu>
            <Link to="/working">
        <MenubarTrigger className="hover:cursor-pointer">How it Works</MenubarTrigger>
        </Link>
      </MenubarMenu>
      <MenubarMenu>
        <Link to="/about">
          <MenubarTrigger className="hover:cursor-pointer">About Us</MenubarTrigger>
        </Link>
      </MenubarMenu>
     
    </Menubar>
  )
}
export default PrivateNavbar;
