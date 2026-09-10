"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActiveConnections = exports.getIncomingRequests = exports.respondToConnectionRequest = exports.sendConnectionRequest = exports.deleteMessage = exports.getConversationMessages = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Connection_1 = require("../Models/Connection");
const Message_1 = __importDefault(require("../Models/Message"));
const getConversationMessages = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const otherUserId = req.params.userId;
        if (!currentUserId || !otherUserId) {
            return res.status(400).json({ message: "Missing user ids." });
        }
        const messages = await Message_1.default.find({
            $or: [
                { senderId: currentUserId, receiverId: otherUserId },
                { senderId: otherUserId, receiverId: currentUserId }
            ]
        })
            .sort({ createdAt: 1 })
            .populate("senderId", "name")
            .populate("receiverId", "name")
            .lean();
        const formattedMessages = messages.map((msg) => ({
            ...msg,
            _id: msg._id.toString(),
            senderId: msg.senderId?._id ? msg.senderId._id.toString() : msg.senderId?.toString(),
            receiverId: msg.receiverId?._id ? msg.receiverId._id.toString() : msg.receiverId?.toString(),
            time: msg.time || new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }));
        return res.status(200).json(formattedMessages);
    }
    catch (error) {
        console.error("Error fetching conversation messages:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};
exports.getConversationMessages = getConversationMessages;
const deleteMessage = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const { messageId } = req.params;
        if (!currentUserId || !messageId) {
            return res.status(400).json({ message: "Missing message id." });
        }
        const deletedMessage = await Message_1.default.findOneAndDelete({
            _id: messageId,
            senderId: new mongoose_1.default.Types.ObjectId(currentUserId)
        });
        if (!deletedMessage) {
            return res.status(404).json({ message: "Message not found or unauthorized." });
        }
        const io = req.app.get("socketio");
        const payload = { messageId, deletedBy: currentUserId };
        if (io) {
            io.to(deletedMessage.receiverId.toString()).emit("messageDeleted", payload);
            io.to(deletedMessage.senderId.toString()).emit("messageDeleted", payload);
        }
        return res.status(200).json({ message: "Message deleted successfully." });
    }
    catch (error) {
        console.error("Error deleting message:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};
exports.deleteMessage = deleteMessage;
const sendConnectionRequest = async (req, res) => {
    try {
        const studentId = req.userId; // Extracted from JWT
        const { teacherId } = req.params;
        // Create a pending relationship. Upserting prevents double-request crashes.
        const result = await Connection_1.Connection.findOneAndUpdate({ studentId, teacherId }, { $setOnInsert: { status: "pending" } }, { upsert: true, new: true, rawResult: true });
        const isNewDocs = !result.lastErrorObject?.updatedExisting;
        if (isNewDocs) {
            const newConnection = result.value;
            const populatedConnection = await Connection_1.Connection.findById(newConnection._id).populate("studentId", "name email");
            const io = req.app.get("socketio");
            if (io) {
                io.to(teacherId).emit("newConnectionRequest", populatedConnection);
                console.log(`Emitted newConnectionRequest to teacher ${teacherId}`);
            }
            return res.status(201).json({ message: "Connection request sent!", status: "pending", connection: populatedConnection });
        }
        return res.status(400).json({ message: "Request already exists or was previously handled." });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.sendConnectionRequest = sendConnectionRequest;
const respondToConnectionRequest = async (req, res) => {
    try {
        const { connectionId, action } = req.body; // action: "accepted" or "rejected"
        if (!["accepted", "rejected"].includes(action)) {
            return res.status(400).json({ message: "Invalid response action." });
        }
        const connection = await Connection_1.Connection.findByIdAndUpdate(connectionId, { status: action }, { new: true });
        if (connection && action === "rejected") {
            //delete the request if rejected
            await Connection_1.Connection.findByIdAndDelete(connectionId);
        }
        if (!connection)
            return res.status(404).json({ message: "Request not found." });
        return res.status(200).json({ message: `Request ${action} successfully.`, status: action });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.respondToConnectionRequest = respondToConnectionRequest;
const getIncomingRequests = async (req, res) => {
    try {
        const teacherId = req.userId; // Extracted from JWT
        const requests = await Connection_1.Connection.find({ teacherId, status: "pending" }).populate("studentId", "name email");
        return res.status(200).json(requests);
    }
    catch (error) {
        console.error("Error fetching incoming requests:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
exports.getIncomingRequests = getIncomingRequests;
const getActiveConnections = async (req, res) => {
    try {
        const userId = req.userId; // Extracted from JWT
        const activeConnections = await Connection_1.Connection.find({
            $or: [
                { studentId: userId, status: "accepted" },
                { teacherId: userId, status: "accepted" }
            ]
        }).populate("studentId", "name email").populate("teacherId", "name email");
        return res.status(200).json(activeConnections);
    }
    catch (error) {
        console.error("Error fetching active connections:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
exports.getActiveConnections = getActiveConnections;
