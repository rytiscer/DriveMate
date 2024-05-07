const { ObjectId } = require("mongodb");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();
const client = require("../config/db");

// Registracijos maršrutas
router.post("/", async (req, res) => {
  const { fullName, email, password } = req.body;

  // Patikriname, ar visi privalomi laukai yra pateikti
  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    // Patikriname, ar vartotojas su nurodytu el. paštu jau egzistuoja
    const existingUser = await client
      .db("demo1")
      .collection("driveMateUsers")
      .findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hasiuojame slaptažodį prieš išsaugodami vartotoją
    const hashedPassword = await bcrypt.hash(password, 10);

    // Įrašome naują vartotoją į duomenų bazę
    await client.db("demo1").collection("driveMateUsers").insertOne({
      fullName,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Grąžiname sėkmingo registracijos pranešimą
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Error" });
  }
});

// Prisijungimo maršrutas
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Patikriname, ar nurodyti el. paštas ir slaptažodis yra pateikti
  if (!email || !password) {
    return res.status(400).json({ error: "Please enter email and password" });
  }

  try {
    // Surandame vartotoją pagal nurodytą el. paštą
    const existingUser = await client
      .db("demo1")
      .collection("driveMateUsers")
      .findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ error: "User with this email not found" });
    }

    // Patikriname, ar slaptažodis atitinka
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Password is not correct" });
    }

    // Sukuriame JWT tokeną ir grąžiname prisijungusiam vartotojui
    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Error" });
  }
});

module.exports = router;
