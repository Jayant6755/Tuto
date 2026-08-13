import mongoose, { Document, Schema } from "mongoose";

export interface IStudentInfo extends Document {
    studentId: mongoose.Types.ObjectId,
    email: string,
    phone: string,
    location: string,
    bio: string,
    name: string; 
    savedTeachers: mongoose.Types.ObjectId[]; // Array of saved teacher IDs
}

export const StudentInfoSchema: Schema = new Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        unique: true
    },
    name: { type: String },
    email: { type: String, unique: true },
    phone: { type: String },
    location: { type: String },
    bio: { type: String },
    savedTeachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }] // Array of saved teacher IDs
});



export const StudentInfo = mongoose.model<IStudentInfo>("StudentInfo", StudentInfoSchema);