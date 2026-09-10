"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Admin_1 = require("../Controller/Admin/Admin");
const adminrouter = express_1.default.Router();
adminrouter.post("/admin", Admin_1.adminLogin);
exports.default = adminrouter;
