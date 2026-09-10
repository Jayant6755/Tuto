import express from "express";
import { adminLogin } from "../Controller/Admin/Admin";


const adminrouter = express.Router();

adminrouter.post("/admin", adminLogin)

export default adminrouter;