"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const Header = req.headers.authorization;
    if (!Header)
        return res.status(401).json({ message: "NO Token Provided" });
    const token = Header.split(" ")[1];
    if (!token)
        return res.status(401).json({ message: "NO Token Provided" });
    if (token == "undefined")
        return res.status(401).json({ message: "Undefined Token Provided" });
    try {
        if (!process.env.JWT_KEY) {
            throw new Error("No Key Provided in ENV");
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        req.userId = decoded.id;
        req.role = decoded.role;
        next();
    }
    catch (error) {
        console.error(error);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token Expired login again" });
        }
        return res.status(403).json({ message: "Invalid Token" });
    }
};
exports.verifyToken = verifyToken;
const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!req.role || !roles.includes(req.role)) {
            return res.status(403).json({ message: "Insufficient permissions" });
        }
        next();
    };
};
exports.authorizeRole = authorizeRole;
