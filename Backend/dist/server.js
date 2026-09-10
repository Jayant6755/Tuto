"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const teacher_1 = __importDefault(require("./Routes/teacher"));
const student_1 = __importDefault(require("./Routes/student"));
const user_1 = __importDefault(require("./Routes/user"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const socket_1 = __importDefault(require("./socket/socket"));
const connection_1 = __importDefault(require("./Routes/connection"));
const admin_1 = __importDefault(require("./Routes/admin"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const uri = process.env.MONGO_URI || "";
const PORT = process.env.PORT || 5000;
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});
app.set("socketio", io);
//Initialize socket logic
(0, socket_1.default)(io);
// Middleware
app.use((0, cors_1.default)()); // Allow all origins
app.use(express_1.default.json()); // Parse JSON body
// MongoDB Connection
mongoose_1.default
    .connect(uri)
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});
// Routes for teacher
app.use("/api/teachers", teacher_1.default);
//Routes for student 
app.use("/api/student", student_1.default);
app.use("/api/studentSignup", student_1.default);
app.use("/api/user", user_1.default);
// Routes for connection requests
app.use("/api/connection", connection_1.default);
//admin
app.use("/api/admin", admin_1.default);
// Start Server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
