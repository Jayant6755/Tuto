import express from "express";
import { deleteMessage, getActiveConnections, getConversationMessages, getIncomingRequests, respondToConnectionRequest, sendConnectionRequest } from "../Controller/Message";
import { verifyToken } from "../Middleware/authmiddleware"; // Your JWT guard middleware


const router = express.Router();

router.get("/incoming-requests", verifyToken, getIncomingRequests);
router.post("/respond", verifyToken, respondToConnectionRequest);
router.post("/request/:teacherId", verifyToken, sendConnectionRequest);
router.get("/messages/:userId", verifyToken, getConversationMessages);
router.delete("/messages/:messageId", verifyToken, deleteMessage);

router.get("/active-connections", verifyToken, getActiveConnections);
export default router;