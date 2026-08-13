"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSavedTeachers = exports.SaveTeacher = exports.allStudents = exports.findStudentbyId = exports.StudentInformation = void 0;
const StudentInfo_1 = require("../Models/StudentInfo");
const TeacherInfo_1 = require("../Models/TeacherInfo");
const StudentInformation = async (req, res) => {
    try {
        const { id, name, email, phone, location, bio } = req.body;
        const check = await StudentInfo_1.StudentInfo.findById(id);
        if (check) {
            return res.status(409).json({ message: "Same User exists" });
        }
        const StudentI = new StudentInfo_1.StudentInfo({
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
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.StudentInformation = StudentInformation;
//fetch by id (students)
const findStudentbyId = async (req, res) => {
    try {
        const { id } = req.params;
        const findstudent = await StudentInfo_1.StudentInfo.findOne({ studentId: id });
        if (!findstudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({ message: "Student found", findstudent });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.findStudentbyId = findStudentbyId;
//fetch all students
const allStudents = async (req, res) => {
    try {
        const students = await StudentInfo_1.StudentInfo.find();
        if (!students) {
            return res.status(404).json({ message: "No students found" });
        }
        res.status(200).json({ message: "Students found", students });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.allStudents = allStudents;
const SaveTeacher = async (req, res) => {
    try {
        const studentId = req.userId;
        const { teacherId } = req.params;
        const student = await StudentInfo_1.StudentInfo.findOne({ studentId: studentId });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        // Resolve the actual Teacher document and store its ObjectId in savedTeachers
        const teacher = await TeacherInfo_1.Teacher.findOne({ teacherId });
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        const teacherObjectId = teacher._id;
        const isAlreadySaved = student.savedTeachers.some((id) => id.equals(teacherObjectId));
        if (isAlreadySaved) {
            student.savedTeachers = student.savedTeachers.filter((id) => !id.equals(teacherObjectId));
            await student.save();
            return res.status(200).json({ message: "Teacher removed from saved list", isSaved: false });
        }
        else {
            student.savedTeachers.push(teacherObjectId);
            await student.save();
            return res.status(200).json({ message: "Teacher saved successfully", isSaved: true });
        }
    }
    catch (error) {
        console.error("Error in SaveTeacher controller:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
exports.SaveTeacher = SaveTeacher;
const GetSavedTeachers = async (req, res) => {
    try {
        const studentId = req.userId;
        const studentsavedTeachers = await StudentInfo_1.StudentInfo.findOne({ studentId: studentId }).populate('savedTeachers');
        if (!studentsavedTeachers) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({ message: "Saved teachers retrieved successfully", savedTeachers: studentsavedTeachers.savedTeachers });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.GetSavedTeachers = GetSavedTeachers;
