"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = void 0;
const adminLogin = async (req, res) => {
    try {
        const { name, password } = req.body;
        if (name == process.env.ADMIN_NAME && password == process.env.ADMIN_PASSWORD) {
            res.status(201).json({ message: "Logged In Successfully" });
        }
        else {
            res.status(403).json({ message: "Forbidden User" });
        }
    }
    catch (error) {
        res.status(500).json("Backend failed");
    }
};
exports.adminLogin = adminLogin;
