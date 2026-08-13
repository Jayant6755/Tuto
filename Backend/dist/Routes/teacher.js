"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Teacher_1 = require("../Controller/Teacher");
const authmiddleware_1 = require("../Middleware/authmiddleware");
const router = express_1.default.Router();
router.post('/info', Teacher_1.TeacherInformation); //Info
router.get("/findall", authmiddleware_1.verifyToken, Teacher_1.findAllTeachers); //find all teachers for homepage
router.put("/updateInfo/:id", authmiddleware_1.verifyToken, Teacher_1.updateTeacherInfo); //update the info of the teacher
router.get("/Info/:id", authmiddleware_1.verifyToken, Teacher_1.teacherInfo); //fetch the info 
exports.default = router;
