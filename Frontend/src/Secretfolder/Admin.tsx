import React, { useState } from 'react'

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Mail, Lock, Eye, EyeOff} from "lucide-react";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';


export const Admin = () => {
  
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/admin/admin", {
                method: 'POST',
                 headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify({name, password})  
            })
         
            const data = await res.json();
               if(!res.ok){
                throw new Error("Backend wala: ",data.message)
            }
            setSuccess(true);
            setTimeout(()=>{
                navigate("/Teacher-login321")
            }, 2000);
            
        } catch (error) {
            setError(true);
            console.error("Frontend wala ",error);
        }

    }
    
  return (
    <div className='flex justify-center items-center'>
        <form onSubmit={handleSubmit} >
        <div className="space-y-2">
             <div className="space-y-2 ">
              <Label htmlFor="email"> 
                Name
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="name"
                  name="Name"
                  type="text"
                  placeholder="Enter your Name"
                  value={name}
                  onChange={(e)=> setName(e.target.value)}
                  className="pl-11 h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/3 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                  className="pl-11 pr-11 h-12 "
                  
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/3 -translate-y-1/3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
                 <button
                  type="button"
                  className="text-sm text-red-500 font-semibold hover:underline cursor-pointer hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            </div>
             <Button type='submit' className='border-1 border-red-300 text-red-400'>
                  Submit
              </Button>
              {error && (
                <div className='flex justify-center rounded-xl items-center border-1 border-red-300 text-red-400'>
                    You are not admin
                </div>
              )}
              {success &&(
                <div className='flex justify-center items-center border-green-300 border-1 text-green-400'>
                    Logged In Successfully
                </div>
              )}
            </div>
            </form>
    </div>
  )
}
