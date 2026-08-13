"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../Controller/User");
const authmiddleware_1 = require("../Middleware/authmiddleware");
const express_1 = __importDefault(require("express"));
const authmiddleware_2 = require("../Middleware/authmiddleware");
const ro = express_1.default.Router();
ro.post('/create', User_1.createUser); //create user
ro.post('/user-login', User_1.loginUser);
ro.get('/user-info/:id', User_1.findUserbyId); //fetch user info by id
ro.get('/teacher-dashboard/:id', authmiddleware_1.verifyToken, (0, authmiddleware_2.authorizeRole)(['Teacher']), async (req, res) => {
    try {
        const teacherId = req.userId;
        res.status(200).json({ message: "Welcome to the teacher dashboard", teacherId });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});
ro.get('/student-dashboard', authmiddleware_1.verifyToken, (0, authmiddleware_2.authorizeRole)(['Student']), async (req, res) => {
    try {
        const studentId = req.userId;
        res.status(200).json({ message: "Welcome to the student dashboard", studentId });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
        console.error("Error in student dashboard route:", error);
    }
});
exports.default = ro;
