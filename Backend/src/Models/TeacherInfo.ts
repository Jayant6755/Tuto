import mongoose, {Schema, Document } from 'mongoose';


export interface ITeacher extends Document {
    _id: mongoose.Types.ObjectId;
    teacherId: mongoose.Types.ObjectId,
    FName: string;
    LName: string;
    email: string;
    location:string;
    bio: string;
    subjects: string[]; 
    ClassLevels: string[]; 
    experience: string;
    hourlyRate: number;
}

export const TeacherSchema: Schema = new Schema({
    teacherId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teachersign",
        unique:true
    },
    FName: { type: String },
    LName: { type: String },
    email: { type: String, unique: true },
    location: {type: String},
    bio: { type: String },
    subjects: { type: [String] }, 
    ClassLevels: { type: [String] },
    experience: { type: Number },
    hourlyRate: { type: Number },
})

export const Teacher = mongoose.model<ITeacher>('Teacher', TeacherSchema);