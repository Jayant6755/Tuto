"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllTeachers = exports.teacherInfo = exports.updateTeacherInfo = exports.TeacherInformation = void 0;
const TeacherInfo_1 = require("../Models/TeacherInfo");
//Details (Isko save hi kyu kar raha hai ???)
const TeacherInformation = async (req, res) => {
    try {
        const { id, FName, LName, email, location, bio, subjects, ClassLevels, experience, hourlyRate } = req.body;
        const check = await TeacherInfo_1.Teacher.findOne({ email });
        if (check) {
            return res.status(409).json({ message: "Same User exists" });
        }
        const TeacherI = new TeacherInfo_1.Teacher({
            teacherId: id,
            FName,
            LName,
            email,
            location,
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
    }
    catch (error) {
        console.error("Error saving teacher profile:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.TeacherInformation = TeacherInformation;
const updateTeacherInfo = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const updatedTeacher = await TeacherInfo_1.Teacher.findOneAndUpdate({ teacherId: id }, updateData, { new: true });
        if (!updatedTeacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        return res.status(200).json({ message: "Teacher updated successfully", teacher: updatedTeacher });
    }
    catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};
exports.updateTeacherInfo = updateTeacherInfo;
//getting the teacher info by id (for profile page)
const teacherInfo = async (req, res) => {
    try {
        const id = req.params.id;
        const stId = req.userId;
        const findteacherInfo = await TeacherInfo_1.Teacher.findOne({ teacherId: id });
        if (!findteacherInfo) {
            return res.status(404).json({ profileComplete: false, message: "Please complete your profile" });
        }
        const isOwner = stId === id;
        return res.status(200).json({ profileComplete: true, findteacherInfo, isOwner });
    }
    catch (error) {
        console.error("Error fetching teacher info:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};
exports.teacherInfo = teacherInfo;
//finding all the teachers (for homepage)
const findAllTeachers = async (req, res) => {
    try {
        const teachers = await TeacherInfo_1.Teacher.find();
        res.status(200).json(teachers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
exports.findAllTeachers = findAllTeachers;
