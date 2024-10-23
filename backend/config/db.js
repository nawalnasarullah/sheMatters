import mongoose from "mongoose";

export const connectDB =  () => {
     mongoose.connect('mongodb://127.0.0.1/sheMatters')
    .then(()=>console.log("Database is connected"))
    .catch((err)=>console.log(err))
}