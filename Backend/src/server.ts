import express, { Application } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./Routes/teacher";
import r from "./Routes/student";
import ro from "./Routes/user";
import http from "http";
import {Server} from "socket.io";

import setupSocket from "./socket/socket"
import connectionRouter from "./Routes/connection";

dotenv.config();

const app: Application = express();

const uri = process.env.MONGO_URI || "";
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});
app.set("socketio", io);

//Initialize socket logic
setupSocket(io);


// Middleware
app.use(cors()); // Allow all origins
app.use(express.json()); // Parse JSON body

// MongoDB Connection
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Routes for teacher
app.use("/api/teachers", router);


//Routes for student 
app.use("/api/student", r);
app.use("/api/studentSignup", r);


app.use("/api/user", ro);

// Routes for connection requests
app.use("/api/connection", connectionRouter);

// Start Server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
