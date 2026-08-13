import bcrypt from 'bcrypt'

import { json, Request, Response } from 'express'; 
import Jwt from "jsonwebtoken"

import { AuthRequest } from '../Middleware/authmiddleware';
import {StudentInfo} from '../Models/StudentInfo';
import {Teacher} from '../Models/TeacherInfo';

export const StudentInformation = async (req: Request, res: Response) => {
        try {
            const {id, name, email, phone, location, bio} = req.body;
            const check = await StudentInfo.findById(id);
            if(check){
                return res.status(409).json({message: "Same User exists"})
            }

            const StudentI = new StudentInfo({
                studentId: id,
                name,
                email,
                phone,
                location,
                bio
            });
            const saveStudentI = await StudentI.save();
            res.status(201).json({ message: "Thank You for the details", student: {
                id: id,
            } });   
        }
        catch(error){
            res.status(500).json({message: "Server Error"})
        }
    }

 //fetch by id (students)
 export const findStudentbyId = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        
        const findstudent = await StudentInfo.findOne({studentId: id});
        
        if(!findstudent){
            return res.status(404).json({message: "Student not found"});
        }
       
        res.status(200).json({message: "Student found", findstudent})
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
 }

 //fetch all students
 export const allStudents = async (req: Request, res: Response) => {
    try {
        const students = await StudentInfo.find();
        if(!students){
            return res.status(404).json({message: "No students found"});
        }
        res.status(200).json({message: "Students found", students});
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
 }

export const SaveTeacher = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const studentId = req.userId;
        const {teacherId} = req.params;
       
        const student = await StudentInfo.findOne({studentId: studentId});
        if(!student){
            return res.status(404).json({message: "Student not found"});
        }
        // Resolve the actual Teacher document and store its ObjectId in savedTeachers
        const teacher = await Teacher.findOne({ teacherId });
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        const teacherObjectId = teacher._id;
        const isAlreadySaved = student.savedTeachers.some((id) => id.equals(teacherObjectId));

        if (isAlreadySaved) {
            student.savedTeachers = student.savedTeachers.filter((id) => !id.equals(teacherObjectId));
            await student.save();
            return res.status(200).json({ message: "Teacher removed from saved list", isSaved: false });
        } else {
            student.savedTeachers.push(teacherObjectId);
            await student.save();
            return res.status(200).json({ message: "Teacher saved successfully", isSaved: true });
        }
        
    }
    catch(error){
        console.error("Error in SaveTeacher controller:", error);
        res.status(500).json({message: "Server Error"})
    }
}

export const GetSavedTeachers = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const studentId = req.userId;
       
        const studentsavedTeachers = await StudentInfo.findOne({studentId: studentId}).populate('savedTeachers');

        if(!studentsavedTeachers){
            return res.status(404).json({message: "Student not found"});
        }
        

        res.status(200).json({message: "Saved teachers retrieved successfully", savedTeachers: studentsavedTeachers.savedTeachers});
    }
    catch(error: any){
      
        res.status(500).json({message: "Server Error"})
    }
}
 
