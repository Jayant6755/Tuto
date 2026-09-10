
import express from "express";
import rateLimit from "express-rate-limit";

import { TeacherInformation, teacherInfo, findAllTeachers, updateTeacherInfo } from "../Controller/Teacher";

import { verifyToken } from "../Middleware/authmiddleware";

const router = express.Router();

const findAllTeachersLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: "draft-8",
	legacyHeaders: false,
	message: { message: "Too many requests. Please try again later." },
});



router.post('/info', TeacherInformation); //Info

router.get("/findall", findAllTeachersLimiter, verifyToken, findAllTeachers) //find all teachers for homepage
router.get("/findallteachers", findAllTeachersLimiter, findAllTeachers) //without protection
router.put("/updateInfo/:id", verifyToken, updateTeacherInfo) //update the info of the teacher
router.get("/Info/:id", verifyToken, teacherInfo)//fetch the info 


export default router; 