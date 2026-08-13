import mongoose, {Schema} from "mongoose";

const MessageSchema = new Schema({
    senderId: {type: Schema.Types.ObjectId, required: true },
    receiverId: {type: Schema.Types.ObjectId, required: true },
    content: {type: String, required: true},
    read: {type: Boolean, default: false},
},
{timestamps: true}
);

export default mongoose.model("Message", MessageSchema);