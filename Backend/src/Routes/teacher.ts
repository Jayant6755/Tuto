
import express from "express";

import { TeacherInformation, teacherInfo, findAllTeachers, updateTeacherInfo } from "../Controller/Teacher";

import { verifyToken } from "../Middleware/authmiddleware";

const router = express.Router();



router.post('/info', TeacherInformation); //Info

router.get("/findall",verifyToken, findAllTeachers) //find all teachers for homepage
router.put("/updateInfo/:id", verifyToken, updateTeacherInfo) //update the info of the teacher
router.get("/Info/:id", verifyToken, teacherInfo)//fetch the info 


export default router; 