const { ObjectId } = require("mongodb");
const express = require("express");
require("dotenv").config();

const router = express.Router();
const client = require("../config/db");

// Get all clients
router.get("/", async (req, res) => {
  try {
    const data = await client
      .db("demo1")
      .collection("clients")
      .find()
      .toArray();
    res.send(data);
  } catch (error) {
    console.error("Error fetching clients:", error);
    return res.status(500).send({ error });
  }
});

// Get a specific client by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const clientData = await client
      .db("demo1")
      .collection("clients")
      .findOne({ _id: new ObjectId(id) });
    if (!clientData) {
      return res.status(404).send({ error: "Client not found" });
    }
    res.send(clientData);
  } catch (error) {
    console.error("Error fetching client:", error);
    return res.status(500).send({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, lastName, email, phone, driving_experience, carId } =
      req.body;

    const result = await client.db("demo1").collection("clients").insertOne({
      name,
      lastName,
      email,
      phone,
      driving_experience,
      carId,
    });

    res
      .status(201)
      .send({ message: "Car added successfully", carId: result.insertedId });
  } catch (error) {
    console.error("Error adding car:", error);
    return res.status(500).send({ error });
  }
});

// Update a client by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastName, email, phone, driving_experience, carId } =
      req.body; // Pridėjome carId
    const result = await client
      .db("demo1")
      .collection("clients")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { name, lastName, email, phone, driving_experience, carId } } // Pridėjome carId
      );
    if (result.modifiedCount === 0) {
      return res.status(404).send({ error: "Client not found" });
    }
    res.send({ message: "Client updated successfully" });
  } catch (error) {
    console.error("Error updating client:", error);
    return res.status(500).send({ error });
  }
});

router.put("/:id/update-car", async (req, res) => {
  try {
    const { id } = req.params;
    const { carId } = req.body; // Tik automobilio ID
    const result = await client
      .db("demo1")
      .collection("clients")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { carId } } // Tik automobilio ID
      );
    if (result.modifiedCount === 0) {
      return res.status(404).send({ error: "Client not found" });
    }
    res.send({ message: "Client's car updated successfully" });
  } catch (error) {
    console.error("Error updating client's car:", error);
    return res.status(500).send({ error });
  }
});

// Delete a client by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client
      .db("demo1")
      .collection("clients")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).send({ error: "Client not found" });
    }
    res.send({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("Error deleting client:", error);
    return res.status(500).send({ error });
  }
});

module.exports = router;
