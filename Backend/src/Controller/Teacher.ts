import bcrypt from 'bcrypt'
import mongoose from 'mongoose';
import { Teacher} from '../Models/TeacherInfo';
import { Request, Response } from 'express'; 
import Jwt from "jsonwebtoken"

import { AuthRequest } from '../Middleware/authmiddleware';
import { profile } from 'console';

//Details (Isko save hi kyu kar raha hai ???)
 export const TeacherInformation = async (req: AuthRequest, res: Response) => {
    
     try {
         const {id, FName, LName, email, location, Title, Education, bio, subjects, ClassLevels, experience, hourlyRate} = req.body;
        

         const check = await Teacher.findOne({email});
        if(check){
            return res.status(409).json({message: "Same User exists"})
        }
           
         const TeacherI = new Teacher({
             teacherId: id,
             FName, 
             LName,
             email,
             location,
             Title,
             Education,
             bio,
             subjects,
             ClassLevels,
             experience,
             hourlyRate
         });
         
        
         const saveTeacherI = await TeacherI.save();
        
         res.status(201).json({ message: "Thank You for the details", teacher: {
            id: id,
         } });
         
     } catch (error: any) {
       console.error("Error saving teacher profile:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
     }
 }

 export const updateTeacherInfo = async (req: AuthRequest, res: Response) => {
    try{
        const id = req.params.id as string;
        const updateData = req.body;

        const updatedTeacher = await Teacher.findOneAndUpdate({teacherId: id}, updateData, {new: true});

        if(!updatedTeacher){
            return res.status(404).json({message: "Teacher not found"});
        }
        return res.status(200).json({message: "Teacher updated successfully", teacher: updatedTeacher});
    }
    catch(error){
       
        return res.status(500).json({ message: "Server error", error });
    }
 }

 //getting the teacher info by id (for profile page)
 export const teacherInfo = async(req: AuthRequest, res: Response)=> {
    try {
        
        const id = req.params.id as string;
        const stId = req.userId;
        
        const findteacherInfo = await Teacher.findOne({teacherId: id});
        
        if(!findteacherInfo){
          
          return res.status(404).json({profileComplete: false, message: "Please complete your profile"});
        }
        

        const isOwner = stId === id;

        return res.status(200).json({profileComplete: true, findteacherInfo, isOwner});
        
        
    } catch (error: any) {
        console.error("Error fetching teacher info:", error);
        res.status(500).json({message: "Server Error", error});
    }
 }

 //finding all the teachers (for homepage)
 export const findAllTeachers = async (req: AuthRequest, res: Response) =>{
    
    try {
        const teachers = await Teacher.find();
        res.status(200).json(teachers);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"})
    }
 }




 
