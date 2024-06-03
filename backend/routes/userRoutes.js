const { ObjectId } = require("mongodb");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();
const client = require("../config/db");

router.post("/", async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    const existingUser = await client
      .db("demo1")
      .collection("driveMateUsers")
      .findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await client.db("demo1").collection("driveMateUsers").insertOne({
      fullName,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please enter email and password" });
  }

  try {
    console.log("Login request data:", { email, password });
    const existingUser = await client
      .db("demo1")
      .collection("driveMateUsers")
      .findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ error: "User with this email not found" });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Password is not correct" });
    }
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
