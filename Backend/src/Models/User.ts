import mongoose from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "Teacher" | "Student";
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String, enum: ["Teacher", "Student"], default: "Student" },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);