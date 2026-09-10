"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const Teacher_1 = require("../Controller/Teacher");
const authmiddleware_1 = require("../Middleware/authmiddleware");
const router = express_1.default.Router();
const findAllTeachersLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { message: "Too many requests. Please try again later." },
});
router.post('/info', Teacher_1.TeacherInformation); //Info
router.get("/findall", findAllTeachersLimiter, authmiddleware_1.verifyToken, Teacher_1.findAllTeachers); //find all teachers for homepage
router.get("/findallteachers", findAllTeachersLimiter, Teacher_1.findAllTeachers); //without protection
router.put("/updateInfo/:id", authmiddleware_1.verifyToken, Teacher_1.updateTeacherInfo); //update the info of the teacher
router.get("/Info/:id", authmiddleware_1.verifyToken, Teacher_1.teacherInfo); //fetch the info 
exports.default = router;
