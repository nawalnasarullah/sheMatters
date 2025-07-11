// import express from "express";
// import 'dotenv/config'
// import authRoutes from "./routes/auth.routes.js";
// import userRoutes from "./routes/user.routes.js";
// import psychologistAuthRoutes from "./routes/psychologist.auth.routes.js";
// import psychologistRoutes from "./routes/psychologist.routes.js";
// import adminRoutes from "./routes/admin.routes.js";
// import appointmentRoutes from "./routes/appointment.routes.js";
// import journalRoutes from "./routes/journal.routes.js";
// import messageRoutes from "./routes/message.routes.js";
// import paymentRoutes from "./routes/payment.routes.js";
// import webhookRoutes from "./routes/webhook.routes.js";
// import cookieParser from "cookie-parser";
// import "./services/reminderNotificationService.js";
// import { connectDB } from "./config/db.js";
// import { v2 as cloudinary } from 'cloudinary';
// import { error } from "./middleware/error.js";
// import cors from "cors";
// import { app, server,  initSocket } from "./config/socket.js";

// const corsOption = {
//     origin: ["http://localhost:5173", "https://shematters.netlify.app"],
//     credentials: true
// }

// // const app = express();
// connectDB();
// cloudinary.config({ 
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// app.use(cors(corsOption));
// app.use('/payment', webhookRoutes);

// app.use(cookieParser());

// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));


// app.use('/', authRoutes);
// app.use('/', userRoutes);
// app.use('/', psychologistAuthRoutes);
// app.use('/', psychologistRoutes);
// app.use('/', adminRoutes);
// app.use('/', journalRoutes);
// app.use('/', appointmentRoutes);
// app.use('/messages', messageRoutes);
// app.use("/payment", paymentRoutes);

// // app.use('*', (req, res, next)=>{
// //     res.json({
// //         message: "Some kinda error!! :("
// //     })
// // })

// app.use(error)

// app.use((err, req, res, next) => {
//     console.error(err);
//     res.status(500).json({
//         success: false,
//         message: err.message || "An unexpected error occurred.",
//     });
// });

// initSocket();
// server.listen(process.env.PORT, ()=>{
//     console.log(`Server is running on port ${process.env.PORT}`);
// })

import express from "express";
import http from "http";
import { Server } from "socket.io";
import { ExpressPeerServer } from "peer";
import cors from "cors";
import cookieParser from "cookie-parser";
import 'dotenv/config';

import { connectDB } from "./config/db.js";
import { v2 as cloudinary } from "cloudinary";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import psychologistAuthRoutes from "./routes/psychologist.auth.routes.js";
import psychologistRoutes from "./routes/psychologist.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import journalRoutes from "./routes/journal.routes.js";
import messageRoutes from "./routes/message.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import webhookRoutes from "./routes/webhook.routes.js";

import { error } from "./middleware/error.js";
import { initSocket } from "./config/socket.js";

// Express app and HTTP server setup
const app = express();
app.set("trust proxy", 1); // ✅ Trust Railway/Netlify Proxy Headers

const server = http.createServer(app);
app.use(cors({
  origin: ["http://localhost:5173", "https://shematters.netlify.app"],
  credentials: true,
}));

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://shematters.netlify.app"],
    credentials: true,
  },
});

// PeerJS setup
const peerServer = ExpressPeerServer(server, {
  debug: true,
});
app.use("/peerjs", peerServer);

// Connect to DB and configure Cloudinary
connectDB();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware setup
app.use('/payment', webhookRoutes); // Stripe Webhook before body-parser JSON!
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

// Routes setup
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', psychologistAuthRoutes);
app.use('/', psychologistRoutes);
app.use('/', adminRoutes);
app.use('/', journalRoutes);
app.use('/', appointmentRoutes);
app.use('/messages', messageRoutes);
app.use("/payment", paymentRoutes);

// Error handler middleware
app.use(error);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: err.message || "An unexpected error occurred.",
  });
});

// Initialize Socket.IO events
initSocket(io);

server.listen(process.env.PORT, () => {
  console.log(`✅ Server running on port ${process.env.PORT}`);
});
