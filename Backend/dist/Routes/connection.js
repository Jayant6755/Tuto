"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Message_1 = require("../Controller/Message");
const authmiddleware_1 = require("../Middleware/authmiddleware"); // Your JWT guard middleware
const router = express_1.default.Router();
router.get("/incoming-requests", authmiddleware_1.verifyToken, Message_1.getIncomingRequests);
router.post("/respond", authmiddleware_1.verifyToken, Message_1.respondToConnectionRequest);
router.post("/request/:teacherId", authmiddleware_1.verifyToken, Message_1.sendConnectionRequest);
router.get("/active-connections", authmiddleware_1.verifyToken, Message_1.getActiveConnections);
exports.default = router;
