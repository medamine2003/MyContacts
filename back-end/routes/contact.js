import express from "express";
import Contact from "../models/Contact.js";
import requireAuth from "../routes/requireAuth.js";

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Gestion des contacts d'un utilisateur
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - phone
 *       properties:
 *         _id:
 *           type: string
 *           description: ID du contact
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         phone:
 *           type: string
 *         userId:
 *           type: string
 *       example:
 *         _id: 68f123abcd456ef78901234
 *         firstName: John
 *         lastName: Doe
 *         phone: "0612345678"
 *         userId: 68e3785f72646cd7555fe78e
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Récupérer tous les contacts de l'utilisateur connecté
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *       401:
 *         description: Unauthorized
 *
 *   post:
 *     summary: Créer un nouveau contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - phone
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *             example:
 *               firstName: John
 *               lastName: Doe
 *               phone: "0612345678"
 *     responses:
 *       201:
 *         description: Contact créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Numéro de téléphone invalide
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /contacts/{id}:
 *   patch:
 *     summary: Mettre à jour un contact partiellement
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact non trouvé
 *       401:
 *         description: Unauthorized
 *
 *   delete:
 *     summary: Supprimer un contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact
 *     responses:
 *       200:
 *         description: Contact supprimé avec succès
 *       404:
 *         description: Contact non trouvé
 *       401:
 *         description: Unauthorized
 */

const router = express.Router();

import mongoose from "mongoose"; // ← Ajoute ça en haut du fichier si pas déjà présent

router.get("/", requireAuth, async (req, res) => {
  try {
    console.log("🔍 === DEBUG BACKEND GET CONTACTS ===");
    console.log("🔍 req.user:", req.user);
    console.log("🔍 req.user.id:", req.user.id);
    console.log("🔍 Type de req.user.id:", typeof req.user.id);
    
    // Récupère TOUS les contacts pour debug
    const allContacts = await Contact.find({});
    console.log("🔍 TOUS les contacts dans la DB:");
    allContacts.forEach(c => {
      console.log(`   - ${c.firstName} ${c.lastName} | userId: ${c.userId}`);
    });
    
    // Filtre par userId
    const contacts = await Contact.find({ userId: req.user.id });
    console.log("🔍 Contacts filtrés pour cet utilisateur:", contacts.length);
    console.log("🔍 ===================================");
    
    res.json(contacts);
  } catch (err) {
    console.error("❌ Erreur:", err);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
});

router.post("/", requireAuth, async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;

    if (phone.length < 10 || phone.length > 20) {
      return res.status(400).json({ error: "Le numéro doit faire entre 10 et 20 caractères" });
    }
 
    const contact = new Contact({
      firstName,
      lastName,
      phone,
      userId: req.user.id, 
    });

    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
});


router.patch("/:id", requireAuth, async (req, res) => {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!updatedContact) return res.status(404).json({ error: "Contact non trouvé" });
    res.json(updatedContact);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const deletedContact = await Contact.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deletedContact) return res.status(404).json({ error: "Contact non trouvé" });
    res.json({ message: "Contact supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
});

export default router;
