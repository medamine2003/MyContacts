import express from "express";
import User from "./models/User.js";

const router = express.Router();

// Route GET /api/users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
