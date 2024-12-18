import express from "express";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import psychologistAuthRoutes from "./routes/psychologist.auth.routes.js";
import psychologistRoutes from "./routes/psychologist.routes.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config'
import { error } from "./middleware/error.js";
import cors from "cors";

const corsOption = {
    origin: "http://localhost:5173",
    credentials: true
}

const app = express();
connectDB();
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


app.use(cors(corsOption));

app.use(cookieParser());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', psychologistAuthRoutes);
app.use('/', psychologistRoutes);

// app.use('*', (req, res, next)=>{
//     res.json({
//         message: "Some kinda error!! :("
//     })
// })

app.use(error)

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        success: false,
        message: err.message || "An unexpected error occurred.",
    });
});

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})

