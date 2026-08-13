"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Student_1 = require("../Controller/Student");
const authmiddleware_1 = require("../Middleware/authmiddleware");
const r = express_1.default.Router();
r.post('/info', Student_1.StudentInformation);
r.post('/savedTeacher/:teacherId', authmiddleware_1.verifyToken, Student_1.SaveTeacher); //save teacher to student profile
r.get('/savedTeacher', authmiddleware_1.verifyToken, Student_1.GetSavedTeachers); //get saved teachers for student profile
r.get('/student/:id', Student_1.findStudentbyId);
r.get('/allstudents', Student_1.allStudents); //fetch all students for homepage
exports.default = r;
