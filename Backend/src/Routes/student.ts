
import express from "express";

import {  allStudents, findStudentbyId, SaveTeacher, StudentInformation, GetSavedTeachers } from "../Controller/Student";
import { verifyToken } from "../Middleware/authmiddleware";



const r = express.Router();


r.post('/info', StudentInformation)
r.post('/savedTeacher/:teacherId', verifyToken, SaveTeacher) //save teacher to student profile


r.get('/savedTeacher', verifyToken, GetSavedTeachers) //get saved teachers for student profile
r.get('/student/:id',findStudentbyId)
r.get('/allstudents', allStudents) //fetch all students for homepage


export default r; 