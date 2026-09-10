"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserbyId = exports.loginUser = exports.createUser = void 0;
const User_1 = require("../Models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = new User_1.User({
            name,
            email,
            password: hashedPassword,
            role
        });
        await newUser.save();
        return res.status(201).json({
            message: "User created successfully",
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
};
exports.createUser = createUser;
const loginUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const user = await User_1.User.findOne({ email, role });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        if (!process.env.JWT_KEY)
            throw new Error("No JWT Key in ENV");
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_KEY, { expiresIn: "4h" });
        return res.status(200).json({ message: "Login successful", token, id: user._id });
    }
    catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
};
exports.loginUser = loginUser;
//fetch user by id
const findUserbyId = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_1.User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User found", user });
    }
    catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
exports.findUserbyId = findUserbyId;
