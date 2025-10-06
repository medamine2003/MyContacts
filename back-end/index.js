import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes.js"; 
import { swaggerUi, swaggerSpec } from "./swagger.js";


const app = express();


const PORT=process.env.PORT || 7000;
const MONGOURL=process.env.MONGO_URL;
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
mongoose.connect(MONGOURL, 
    ).then(()=>{
    console.log("Database is connected")
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    })
}).catch((error)=>console.log(error));
