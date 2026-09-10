import { useEffect, useState } from "react";
import {  Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Mail, Lock, User, ArrowLeft, Eye, EyeOff, Github, Flag } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon, CheckCircle2Icon} from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"




// import { useToast } from "@/hooks/use-toast";

const TeacherLogin = () => {

  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Student");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess ] = useState("");

   // use to track active tab
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    setIsLoading(true);
    

     // Basic validation
     if (isLogin && !email || !password || !role){
      setError("All fields are required")
      setIsLoading(false)
      return
     }

     if(!isLogin && (!email || !password || !name || !confirmPassword || !role)){
      setError("All fields are required")
      setIsLoading(false)
      return
     }

     if(!isLogin && (password != confirmPassword)){
      setError("Password do not match")
      setIsLoading(false)
      return
     }


    

     try {

      if(isLogin){
        const response = await fetch("http://localhost:5000/api/user/user-login", {
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify({email, password, role})  
        });
        
        const LoginData = await response.json();
        
        if(!response.ok){
          throw new Error(LoginData.message)
        }
        localStorage.setItem("token", LoginData.token);
        setIsLoading(false);
        setSuccess(LoginData.message)
        setError("");
        
        setTimeout(() => {
          if(role === "Teacher"){
            navigate(`/teacher-dashboard/${LoginData.id}`);
          }
          else{
            navigate(`/student-dashboards/${LoginData.id}`);
          }
        }, 2000);
      }
        else {
      
      const res = await fetch(`http://localhost:5000/api/user/create`,{
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify({name, email, password, role})
      });
      
      const data = await res.json();
      
       if(!res.ok){
        throw new Error(data.message)
      }
      setIsLoading(false);
      setSuccess(data.message)
      setError("");
     }
  }
  catch (error: any) {
        setIsLoading(false)
        setError(error.message)
        setSuccess("")
        console.error("Error:", error);
        setTimeout(() => {
          setError("")
        }, 2000);
     }
    }

 
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12  lg:md:w-1/2 absolute ">
        <div className="mx-auto w-full max-w-md">
          {/* Back Button */}
          <Link
            to="/tuto-admin"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center shadow-md">
              <GraduationCap className="w-6 h-6 text-white " />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Tuto</h1>
            
            </div>
          </div>

       
          {/* Toggle Buttons */}
          <div className="flex gap-2 p-1 bg-gray-100 rounded-lg mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                isLogin
                  ? "bg-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                !isLogin
                  ? "bg-white text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
         
          {isLogin && (
            <div className="space-y-2">
             <div className="space-y-2 ">
              <Label htmlFor="email"> 
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                  className="pl-11 h-12"
                />
              </div>
            </div>

             <div className="space-y-2 ">
              <Label htmlFor="email"> 
                Role
              </Label>
              <div className="relative">
               <RadioGroup defaultValue="comfortable" className="w-fit border border-border rounded-md p-4 w-full"
               value={role}
               onValueChange={setRole}
               >
      <div className="flex items-center gap-3">
        <RadioGroupItem 
          value="Teacher"
          id="Teacher" 
         />
        <Label htmlFor="Teacher">Teacher</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="Student" id="Student"/>
        <Label htmlFor="Student" >Student</Label>
      </div>
    </RadioGroup>
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
            </div>
          )}
           

            {!isLogin && (
              <div className="space-y-5 ">
               <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    className="pl-11 h-12  border-border focus:border-primary"
                  />
                </div>
              </div>

               <div className="space-y-2 ">
              <Label htmlFor="email"> 
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                  className="pl-11 h-12"
                />
              </div>
            </div>

             <div className="space-y-2 ">
              <Label htmlFor="email"> 
                Role
              </Label>
              <div className="relative">
               <RadioGroup defaultValue="comfortable" className="w-fit border border-border rounded-md p-4 w-full">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="Teacher" id="Teacher" />
        <Label htmlFor="Teacher">Teacher</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="Student" id="Student" />
        <Label htmlFor="Student">Student</Label>
      </div>
    </RadioGroup>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e)=> setConfirm(e.target.value)}
                    className="pl-11 h-12 bg-secondary/50 border-border focus:border-primary"
                  />
                </div>
              </div>
              </div>
            )}


            <Button
              type="submit"
              className="w-full h-12 text-white font-semibold bg-red-500"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  {isLogin ? "Logging in..." : "Creating account..."}
                </span>
              ) : isLogin ? (
                "Log In"
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

           <div className=" mt-5 flex justify-center items-center ">
                {error &&
                 <div className="grid w-full max-w-md items-start gap-4">
                     <Alert className="text-red-500  font-semibold">
                      <AlertCircleIcon />
                      <AlertTitle>Error</AlertTitle>
                       <AlertDescription>
                        {error}
                      </AlertDescription>
                   </Alert>
               </div>
              } 

                {success &&
               <div className="grid w-full max-w-md items-start gap-4">
                     <Alert className="text-green-500 text-lg font-semibold">
                      <CheckCircle2Icon />
                      <AlertTitle>Success</AlertTitle>
                       <AlertDescription>
                        {success}
                      </AlertDescription>
                   </Alert>
               </div>
                }

                </div>
          

          {/* Divider */}
          {/* <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-muted-foreground">
                or continue with
              </span>
            </div>
          </div> */}

          {/* Social Login
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12 hover:bg-black hover:text-white cursor-pointer" >
              Google
            </Button>
            <Button variant="outline" className="h-12 hover:bg-black hover:text-white cursor-pointer">
              <Github/>
              GitHub
            </Button>
          </div> */}

          {/* Terms */}
          {!isLogin && (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              By creating an account, you agree to our{" "}
              <button className="text-red-600 hover:underline">Terms of Service</button>{" "}
              and{" "}
              <button className="text-red-600 hover:underline">Privacy Policy</button>
            </p>
          )}

        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 absolute ml-170 min-h-screen overflow-hidden lg:w-1/2">
        <img
          src="Pictures/olenchic-teacher-9799237.png"
          alt="Login Visual"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
       

export default TeacherLogin;
