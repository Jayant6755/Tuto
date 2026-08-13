import { User } from "../Models/User";
import Jwt from "jsonwebtoken";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    });
    
    await newUser.save();

    return res.status(201).json({
      message: "User created successfully",
    });

  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
   
  }
};

export const loginUser = async (req: Request, res: Response)=>{
  try{
    const {email, password, role} = req.body;
   
    const user = await User.findOne({email, role});
    if(!user){
      return res.status(404).json({message: "User not found"});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

   if(!process.env.JWT_KEY) throw new Error("No JWT Key in ENV");

   const token = Jwt.sign({ id: user._id, role: user.role }, process.env.JWT_KEY, { expiresIn: "4h" });

    return res.status(200).json({ message: "Login successful", token, id: user._id });
  }
  catch(error){
    return res.status(500).json({ message: "Server Error" });
  }
}

//fetch user by id
export const findUserbyId = async (req: Request, res: Response) => {
  try {
      const {id} = req.params;
      const user = await User.findById(id);
      if(!user){
          return res.status(404).json({message: "User not found"});
      }
      
      res.status(200).json({message: "User found", user})
  } catch (error) {
      console.error("Error fetching user by ID:", error);
      res.status(500).json({message: "Server Error"})
  }
}