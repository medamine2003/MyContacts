import request from "supertest";
import mongoose from "mongoose";
import app from "../index.js"; // ← Déjà correct
import User from "../models/User.js";
import Contact from "../models/Contact.js";

const MONGO_TEST_URL = process.env.MONGO_URL_TEST || "mongodb://localhost:27017/test_db";

let token;

beforeAll(async () => {
  // Vérifier si déjà connecté
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGO_TEST_URL);
  }
  await User.deleteMany({});
  await Contact.deleteMany({});

  const userRes = await request(app)
    .post("/api/auth/register")
    .send({
      firstName: "Test",
      lastName: "User",
      email: "test@user.com",
      password: "123456",
    });

  token = userRes.body.token;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Contacts API", () => {
  let contactId;

  test("POST /api/contacts → crée un contact", async () => {
    const res = await request(app)
      .post("/api/contacts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        firstName: "Alice",
        lastName: "Smith",
        phone: "0612345678",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.firstName).toBe("Alice");
    contactId = res.body._id;
  });

  test("GET /api/contacts → récupère les contacts", async () => {
    const res = await request(app)
      .get("/api/contacts")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("PATCH /api/contacts/:id → met à jour un contact", async () => {
    const res = await request(app)
      .patch(`/api/contacts/${contactId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ phone: "0611111111" });

    expect(res.statusCode).toBe(200);
    expect(res.body.phone).toBe("0611111111");
  });

  test("DELETE /api/contacts/:id → supprime un contact", async () => {
    const res = await request(app)
      .delete(`/api/contacts/${contactId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });
});