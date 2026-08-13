import mongoose, { Schema, Document } from "mongoose";

export interface IConnection extends Document {
  studentId: mongoose.Types.ObjectId; // References the Student's User account
  teacherId: mongoose.Types.ObjectId; // References the Teacher's unique identifier string
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
}

const ConnectionSchema: Schema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  teacherId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Matches teacher.teacherId
  status: { 
    type: String, 
    enum: ["pending", "accepted", "rejected"], 
    default: "pending" 
  },
  createdAt: { type: Date, default: Date.now }
});

// Ensure a student can only have ONE unique relationship entry per teacher
ConnectionSchema.index({ studentId: 1, teacherId: 1 }, { unique: true });

export const Connection = mongoose.model<IConnection>("Connection", ConnectionSchema);