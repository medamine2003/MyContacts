import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: "Routes d'authentification inscription et connexion"
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Enregistrer un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Med
 *               lastName:
 *                 type: string
 *                 example: Amine
 *               email:
 *                 type: string
 *                 example: med@amine.com
 *               password:
 *                 type: string
 *                 example: medamine123
 *     responses:
 *       201:
 *         description: "Utilisateur créé avec succès"
 *       500:
 *         description: "Erreur serveur, ex: email déjà utilisé"
 */
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName, lastName, email, password: hashedPassword });
    await user.save();
    
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    
    res.status(201).json({ 
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  } catch (error) {
    console.log("Error in /register:", error);
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
});


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion utilisateur (retourne un JWT)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: med@amine.com
 *               password:
 *                 type: string
 *                 example: medamine123
 *     responses:
 *       200:
 *         description: "Connexion réussie, JWT retourné"
 *       401:
 *         description: "Identifiants invalides"
 *       500:
 *         description: "Erreur serveur"
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
