"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = __importDefault(require("../Models/Message"));
const Connection_1 = require("../Models/Connection");
const setupSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("User Connected: ", socket.id);
        socket.on("join", (userId) => {
            if (!userId)
                return;
            socket.join(userId);
            console.log(`User ${userId} joined room`);
        });
        //sending the message
        socket.on("sendMessage", async (data) => {
            try {
                const { senderId, receiverId, content } = data;
                const normalizedContent = typeof content === "string" ? content.trim() : "";
                if (!senderId || !receiverId || !normalizedContent)
                    return;
                const validConnection = await Connection_1.Connection.findOne({
                    $or: [
                        { studentId: senderId, teacherId: receiverId },
                        { studentId: receiverId, teacherId: senderId }
                    ],
                    status: "accepted"
                });
                if (!validConnection) {
                    console.warn(`Blocked message attempt from ${senderId} to ${receiverId} due to missing connection.`);
                    // Send a private error alert event back to the offender's UI window
                    socket.emit("messageError", {
                        message: "Cannot send message. Your connection request must be accepted first."
                    });
                    return;
                }
                //save message
                const message = await Message_1.default.create({
                    senderId, receiverId, content: normalizedContent
                });
                const messagePayload = {
                    _id: message._id,
                    senderId: message.senderId,
                    receiverId: message.receiverId,
                    content: message.content,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    createdAt: message.createdAt
                };
                io.to(receiverId).emit("receiveMessage", messagePayload);
                //send back to sender
                io.to(senderId).emit("receiveMessage", messagePayload);
            }
            catch (error) {
                console.error("Socket message error:", error);
            }
        });
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};
exports.default = setupSocket;
