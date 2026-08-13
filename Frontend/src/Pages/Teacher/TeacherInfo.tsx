import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon, CheckCircle2Icon} from "lucide-react"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, X, GraduationCap, BookOpen, Clock, Lock, Eye, EyeOff } from "lucide-react";
import { data, Link, useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
 
import Navbar from "../../Hero/Navbar";
import Footer from "../../Hero/Footer";
import axios from "axios";

const kitab = [
  "Mathematics", "Physics", "Chemistry", "Biology", "English", 
  "History", "Geography", "Computer Science", "Economics", "Art"
];

const classLevels = [
  "Elementary (K-5)", "Middle School (6-8)", "High School (9-12)", 
  "College/University", "Graduate Level", "Professional"
];

interface JwtPayloadWithId {
  id: string;
  [key: string]: any;
}

const TeacherRegister = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(null);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [ClassLevels, setClassLevels] = useState<string[]>([]);
  
  const [FName, setFname] = useState<string>("");
  const [LName, setLname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [hourlyRate, setHourlyRate] = useState<string>("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [id, setId] = useState<string>("");
 
  const toggleSelection = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };


  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    
     if (!agreedToTerms) {
       ({
         title: "Terms Required",
         description: "Please agree to the terms and conditions to continue.",
         variant: "destructive",
       });
       return;
     }

     if (subjects.length === 0) {
       ({
         title: "Subjects Required",
        description: "Please select at least one subject you can teach.",
        variant: "destructive",
      });
       return;
     }

     if(!location){
      alert("Please enter your Location");
      return;
     }
     
     const savedToken = localStorage.getItem("token");
     if (!savedToken) {
       alert("Authentication token not found. Please log in again.");
     }
     
    
     
     try {

      const decoded = jwtDecode<JwtPayloadWithId>(savedToken!);
      const userId = decoded.id;
     
    
      const teacher = {
      id: userId,
      FName,
      LName,
      email,
      location,
      bio,
      experience: Number(experience.split("-")[0]), // Extracting minimum years from the range
      hourlyRate: Number(hourlyRate),
      subjects,
      ClassLevels,
     }
      
      const res = await fetch('http://localhost:5000/api/teachers/info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${savedToken}`,
        },
        body: JSON.stringify(teacher),
      });
      
      const data = await res.json();
    
      if(!res.ok){
        throw new Error (data.message);
      }
      setSuccess(data.message);
      setError("");
      
      setTimeout(()=>{
         navigate(`/teacher/${decoded.id}`);
      }, 2000);
      
     } catch (error: any) {
      setError(error.message)
      setSuccess("");
     }
  };

  //for going back
  const back = ()=>{
      navigate(`/teacher-dashboard`)
  }

  useEffect(()=>{
    const teacherInfo = async()=>{
      try{
        const savedToken = localStorage.getItem("token");
        const decoded = jwtDecode<JwtPayloadWithId>(savedToken!);
        setId(decoded.id);
        const res = await axios.get(`http://localhost:5000/api/teachers/Info/${decoded.id}`, {
          headers: {
            "Authorization": `Bearer ${savedToken}`
          }
        });
        const data = res.data;
        if(!data){
          setShow(null);
        }
        if(res.status === 200 && data.findteacherInfo){
          const info = data.findteacherInfo;
          setFname(info.FName);
          setLname(info.LName);
          setEmail(info.email);
          setLocation(info.location);
          setBio(info.bio);
          setExperience(info.experience + "-" + (Number(info.experience) + 2));
          setHourlyRate(info.hourlyRate.toString());
          setSubjects(info.subjects);
          setShow(info.FName);
          setClassLevels(info.ClassLevels);
        }
        
      }
      catch(error: any){
        console.error("Error fetching teacher info:", error);
        if(error.response && error.response.status === 401){
          alert("Session expired. Please log in again.");
         
        }

      }
    }
      teacherInfo();
  }, []);

  const handleUpdate = async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try{
      const savedToken = localStorage.getItem("token");
      const teacher = {
        id,
        FName,
        LName,
        email,
        location,
        bio,
        experience: Number(experience.split("-")[0]), // Extracting minimum years from the range
        hourlyRate: Number(hourlyRate),
        subjects,
        ClassLevels,
      }
      const res = await axios.put(`http://localhost:5000/api/teachers/updateInfo/${id}`, teacher, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${savedToken}`
        }
      });
      const data = res.data;
      if(res.status === 200){
        setSuccess(data.message);
        setError("");
        setTimeout(()=>{
          navigate(`/teacher/${id}`);
        }, 2000);
      }
    }
    catch(error: any){
      setError(error.response.data.message || "An error occurred while updating information.");
      setSuccess("");
    }
  }

  
 
  

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Link */}
          <button 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            onClick={back}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-200 text-red-500 mb-4">
              <GraduationCap className="w-4 h-4" />
              <span className="text-sm font-medium">Join Our Teaching Community</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tell Us About Yourself
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Share your knowledge with students worldwide. Create your profile and start teaching on your own terms.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            <Card className="border-border/50 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center">
                    <span className="text-red-500 font-semibold text-sm">1</span>
                  </div>
                  Personal Information
                </CardTitle>
                <CardDescription>Tell us about yourself</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value= {FName}
                      onChange={(e)=> setFname(e.target.value)}
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={LName}
                      onChange={(e)=> setLname(e.target.value)}
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e)=> setEmail(e.target.value)}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      type="tel"
                      value={location}
                      onChange={(e)=> setLocation(e.target.value)}
                      placeholder="Delhi, India"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio *</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={bio}
                    onChange={(e)=> setBio(e.target.value)}
                    placeholder="50-100 words"
                    className="min-h-[120px]"
                    required
                  />
                </div>


              </CardContent>
            </Card>

            {/* Teaching Details */}
            <Card className="border-border/50 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center">
                    <span className="text-red-500 font-semibold text-sm">2</span>
                  </div>
                  Teaching Details
                </CardTitle>
                <CardDescription>What and how you teach</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Subjects */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-red-500" />
                    Subjects You Teach *
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {kitab.map((Subject) => (
                      <Badge
                        key={Subject}
                        variant={subjects.includes(Subject) ? "default" : "outline"}
                        className="cursor-pointer transition-all hover:scale-105"
                        onClick={() => toggleSelection(Subject, subjects, setSubjects)}
                      >
                        {subjects.includes(Subject) && <X className="w-3 h-3 mr-1" />}
                        {Subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Class Levels */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-red-500" />
                    Class Levels
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {classLevels.map(level => (
                      <Badge
                        key={level}
                        variant={ClassLevels.includes(level) ? "default" : "outline"}
                        className="cursor-pointer transition-all hover:scale-105"
                        onClick={() => toggleSelection(level, ClassLevels, setClassLevels)}
                      >
                        {ClassLevels.includes(level) && <X className="w-3 h-3 mr-1" />}
                        {level}
                      </Badge>
                    ))}
                  </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="experience" className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-red-500" />
                      Years of Experience *
                    </Label>
                    <Select 
                      name="experience"
                      value={experience} 
                      onValueChange={(value) => setExperience(value)}  //Dhayan se dekh 
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">Less than 1 year</SelectItem>
                        <SelectItem value="1-3">1-3 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hourlyRate">Hourly Rate ($) *</Label>
                    <Input
                      id="hourlyRate"
                      name="hourlyRate"
                      type="number"
                      min="10"
                      max="500"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      placeholder="50"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>


            {/* Terms and Submit */}
            {!show &&(
               <Card className="border-border/50 shadow-elegant ">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3 mb-6">
                  <Checkbox
                    className="text-red-500"
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                    I agree to the <Link to="/terms" className="text-red-500 hover:underline">Terms of Service</Link> and{" "}
                    <Link to="/privacy" className="text-red-500 hover:underline">Privacy Policy</Link>. 
                    I confirm that all information provided is accurate and I am authorized to teach the subjects listed.
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 border-2 border-red-500">
                  <Button type="submit" size="lg" className=" text-white bg-red-500 lg:w-170">
                    Submit Application
                  </Button>
                  <Button type="button" className="bg-gray-100 border-gray-300 border"  size="lg" asChild>
                    <Link to="/">Cancel</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            )}
           
           
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

                </div>
          </form>
           {show && (
              <form onSubmit={handleUpdate} className="flex flex-col gap-4">
               <div className="flex flex-col sm:flex-row gap-4 ">
                  <Button type="submit" size="lg" className=" text-white bg-blue-500 w-1/2" >
                    Save Information
                  </Button>
                  <Button type="button" className="bg-gray-100 border-gray-300 border w-1/2"  size="lg" asChild>
                    <Link to="/">Cancel</Link>
                  </Button>
                </div>
                </form>
              )}

              
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
      </main>

      <Footer />
    </div>
  );
};

export default TeacherRegister;
