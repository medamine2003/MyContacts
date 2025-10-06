
import express from "express";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/user.js";

import contactRoutes from "./routes/contact.js";
const router = express.Router();


router.use("/auth", authRoutes);
router.use("/contacts", contactRoutes);
router.use("/users", usersRoutes);

export default router;
