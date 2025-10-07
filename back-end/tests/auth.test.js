import request from "supertest";
import mongoose from "mongoose";
import app from "../index.js"; // ← Changez app.js en index.js
import User from "../models/User.js";

const MONGO_TEST_URL = process.env.MONGO_URL_TEST || "mongodb://localhost:27017/test_db";

beforeAll(async () => {
  // Vérifier si déjà connecté
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGO_TEST_URL);
  }
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Auth API", () => {
  const userData = {
    firstName: "John",
    lastName: "Doe",
    email: "john@test.com",
    password: "123456",
  };

  test("POST /api/auth/register → crée un utilisateur", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(userData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.email).toBe(userData.email);
  });

  test("POST /api/auth/login → connecte l'utilisateur", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: userData.email, password: userData.password });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("POST /api/auth/login → refuse mauvais mot de passe", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: userData.email, password: "wrongpass" });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
  });
});