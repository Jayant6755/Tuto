import { createUser, loginUser, findUserbyId } from "../Controller/User";
import  { Request, Response } from "express";
import {verifyToken} from "../Middleware/authmiddleware";
import express from "express";
import { authorizeRole, AuthRequest} from "../Middleware/authmiddleware";


const ro = express.Router();

ro.post('/create',  createUser) //create user
ro.post('/user-login',loginUser)
ro.get('/user-info/:id', findUserbyId) //fetch user info by id

ro.get('/teacher-dashboard/:id', verifyToken, authorizeRole(['Teacher']), async (req: AuthRequest, res: Response) => {

    try{
     const teacherId = req.userId;
  

     res.status(200).json({message: "Welcome to the teacher dashboard", teacherId});
    }
    catch(error){
        res.status(500).json({message: "Server Error"});
    }
    
})

ro.get('/student-dashboard', verifyToken, authorizeRole(['Student']), async (req: AuthRequest, res: Response) => {

    try{
     const studentId = req.userId;
     
        res.status(200).json({message: "Welcome to the student dashboard", studentId});
    }
    catch(error){
        res.status(500).json({message: "Server Error"});
        console.error("Error in student dashboard route:", error);
    }
    
})

export default ro;