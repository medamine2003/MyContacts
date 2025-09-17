import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes.js"; 



const app = express();
dotenv.config();

const PORT=process.env.PORT || 7000;
const MONGOURL=process.env.MONGO_URL;
app.use(express.json());
app.use("/api", userRoutes);
mongoose.connect(MONGOURL, 
    { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(()=>{
    console.log("Database is connected")
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    })
}).catch((error)=>console.log(error));