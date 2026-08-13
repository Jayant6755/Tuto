import { Star, MapPin, Clock, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";
import axios from "axios";
import {  useEffect, useState } from "react";





interface TeacherInfo {
  
  name: string;
  teacherId: string;
  email: string;
  location: string;
  verified: boolean;  
  _id: string;
  specializations: string[];
  bio: string;
  hourlyRate: number;
  experience: number;

}
interface TeacherI{
  teacher: TeacherInfo
}

const TeacherCard = ({ teacher }: TeacherI) => {
 
const [connectionStatus, setConnectionStatus] = useState<"Connect" | "Requested" | "Accepted">("Connect");
const [savedTeacherIds, setSavedTeacherIds] = useState<string[]>([]);
const [isSaved, setIsSaved] = useState(false);


const handleConnect = async () => { 
  if(connectionStatus !== "Connect") return;

  const savedToken = localStorage.getItem("token");
  setConnectionStatus("Requested");

  try{
    const response = await axios.post(`http://localhost:5000/api/connection/request/${teacher.teacherId}`, {}, {
      headers: {
        Authorization: `Bearer ${savedToken}`,
      }
    });
  }
  catch(error){
    console.error("Connection error:", error);
    setConnectionStatus("Connect");
  }
}

useEffect(()=>{
  const checkToken = async () => {
    const token = localStorage.getItem("token");  
  }
  checkToken();

})

const saveTeacher = async (teacherId: string) => {
   const savedToken = localStorage.getItem("token");

   const isAlreadySaved = savedTeacherIds.includes(teacherId);

   const previousSavedTeacherIds = isSaved;
   setIsSaved(!previousSavedTeacherIds);

   const previous = [...savedTeacherIds]

   if (isAlreadySaved) {
     setSavedTeacherIds((prev) => prev.filter((id) => id !== teacherId));
     
   }
   
  try {
   const response = await axios.post(`http://localhost:5000/api/student/savedTeacher/${teacherId}`, {}, {
      headers: {
        Authorization: `Bearer ${savedToken}`,
      }
    });
    
    setIsSaved(response.data.isSaved);
  } catch (error) {
    console.error("Error saving teacher:", error);
    setIsSaved(previousSavedTeacherIds);
  }
}


  return (
    <div className="group rounded-2xl bg-gray-100 p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1  ">
      {/* Header */}
      <div className="flex gap-4 mb-4">
        <div className="relative">
          <img
            
            alt= "could not load"
            className="w-20 h-20 rounded-xl object-cover shadow-md"
          />
          {teacher.verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success bg-green-500 rounded-full flex items-center justify-center shadow-sm">
              <svg className="w-3.5 h-3.5 text-success-foreground" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
          
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-xl text-card-foreground truncate">
                {teacher.name}
              </h3>
              <p className="text-red-500 font-medium"></p>
            </div>
            <button className="p-2 rounded-lg hover:bg-red-100 cursor-pointer transition-colors group/heart" onClick={() => saveTeacher(teacher.teacherId)}>
              <Bookmark className={`w-5 h-5 text-gray-500 group-hover/heart:text-red-500 transition-colors ${
                isSaved
                  ? "text-red-500 fill-red-500"
                  : "text-gray-500"               }`}
                />
            </button>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-medium text-card-foreground"></span>
            {/* <span className="text-gray-500 text-sm">
              ({teacher.reviewCount} reviews)
            </span> */}
          </div>
        </div>
      </div>

      {/* Specializations
      <div className="flex flex-wrap gap-2 mb-4">
        {teacher.specializations.slice(0, 3).map((spec) => (
          <Badge key={spec} variant="secondary" className="text-bold bg-gray-300">
            {spec}
          </Badge>
        ))}
        {teacher.specializations.length > 3 && (
          <Badge variant="outline" className="text-xs">
            +{teacher.specializations.length - 3}
          </Badge>
        )}
      </div> */}

      {/* Bio */}
      <p className="text-gray-500 lg:text-lg mb-4 line-clamp-2 ">
        {teacher.bio}
      </p>

      {/* Info */}
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4" />
          {teacher.location}
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span> {teacher.experience} years</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div>
          <span className="text-2xl font-bold text-card-foreground">
            ${teacher.hourlyRate}
          </span>
          <span className="text-muted-foreground text-sm">/hour</span>
        </div>
        <div className="flex gap-2">
          <Button  size="sm" className="bg-gray-100 border-1 hover:bg-gray-200 text-gray-800 cursor-pointer"
          onClick={handleConnect}
          >
            {connectionStatus}
          </Button>
          <Link to={`/teacher/${teacher.teacherId}`}>
            <Button variant="default" size="sm" className="bg-red-600 text-white">
              View Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
