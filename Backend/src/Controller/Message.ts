import { Request, Response } from "express";
import mongoose from "mongoose";
import { AuthRequest } from "../Middleware/authmiddleware";
import {Connection} from "../Models/Connection";
import Message from "../Models/Message";

export const getConversationMessages = async (req: AuthRequest, res: Response) => {
  try {
    const currentUserId = req.userId;
    const otherUserId = req.params.userId;

    if (!currentUserId || !otherUserId) {
      return res.status(400).json({ message: "Missing user ids." });
    }

    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: currentUserId }
      ]
    })
      .sort({ createdAt: 1 })
      .populate("senderId", "name")
      .populate("receiverId", "name")
      .lean();

    const formattedMessages = messages.map((msg: any) => ({
      ...msg,
      _id: msg._id.toString(),
      senderId: msg.senderId?._id ? msg.senderId._id.toString() : msg.senderId?.toString(),
      receiverId: msg.receiverId?._id ? msg.receiverId._id.toString() : msg.receiverId?.toString(),
      time: msg.time || new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }));

    return res.status(200).json(formattedMessages);
  } catch (error) {
    console.error("Error fetching conversation messages:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};



export const deleteMessage = async (req: AuthRequest, res: Response) => {
  try {
    const currentUserId = req.userId;
    const { messageId } = req.params;

    if (!currentUserId || !messageId) {
      return res.status(400).json({ message: "Missing message id." });
    }

    const deletedMessage = await Message.findOneAndDelete({
      _id: messageId,
      senderId: new mongoose.Types.ObjectId(currentUserId)
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
  } catch (error) {
    console.error("Error deleting message:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const sendConnectionRequest = async (req: AuthRequest, res: Response) => {
  try {
    const studentId = req.userId; // Extracted from JWT
    const { teacherId } = req.params;

    // Create a pending relationship. Upserting prevents double-request crashes.
    const result = await Connection.findOneAndUpdate(
      { studentId, teacherId },
      { $setOnInsert: { status: "pending" } },
      { upsert: true, new: true, rawResult: true }
    ) as unknown as any;

    const isNewDocs = !result.lastErrorObject?.updatedExisting;

    if (isNewDocs) {
      const newConnection = result.value;

      const populatedConnection = await Connection.findById(newConnection._id).populate("studentId", "name email");

      const io = req.app.get("socketio");
      if (io) {
        io.to(teacherId).emit("newConnectionRequest", populatedConnection);
        console.log(`Emitted newConnectionRequest to teacher ${teacherId}`);
      }
      return res.status(201).json({ message: "Connection request sent!", status: "pending", connection: populatedConnection });
    }
    return res.status(400).json({ message: "Request already exists or was previously handled." });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const respondToConnectionRequest = async (req: AuthRequest, res: Response) => {
  try {
    const { connectionId, action } = req.body; // action: "accepted" or "rejected"
    
    if (!["accepted", "rejected"].includes(action)) {
      return res.status(400).json({ message: "Invalid response action." });
    }

    const connection = await Connection.findByIdAndUpdate(
      connectionId,
      { status: action },
      { new: true }
    );
    if (connection && action === "rejected") {
      //delete the request if rejected
      await Connection.findByIdAndDelete(connectionId);
    }
    if (!connection) return res.status(404).json({ message: "Request not found." });
    

    return res.status(200).json({ message: `Request ${action} successfully.`, status: action });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getIncomingRequests = async (req: AuthRequest, res: Response) => {
  try {
    const teacherId = req.userId; // Extracted from JWT

    const requests = await Connection.find({ teacherId, status: "pending" }).populate("studentId", "name email");

    return res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching incoming requests:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getActiveConnections = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId; // Extracted from JWT

    const activeConnections = await Connection.find({
      $or: [
        { studentId: userId, status: "accepted" },
        { teacherId: userId, status: "accepted" }
      ]
    }).populate("studentId", "name email").populate("teacherId", "name email");

    return res.status(200).json(activeConnections);
  } catch (error) {
    console.error("Error fetching active connections:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
