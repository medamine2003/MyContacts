import express from "express";
import User from "../models/User.js";
import requireAuth from "./requireAuth.js"; 

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
