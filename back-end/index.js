import dotenv from "dotenv";
dotenv.config();
 
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes.js"; 
import { swaggerUi, swaggerSpec } from "./swagger.js";

const app = express();


const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://my-contacts-iota.vercel.app/", 
  process.env.FRONTEND_URL, 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API is running", status: "OK" });
});

app.use("/api", userRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose.connect(MONGOURL)
  .then(() => {
    console.log("Database is connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

export default app;