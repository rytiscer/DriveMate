const { ObjectId } = require("mongodb");
const express = require("express");
require("dotenv").config();

const router = express.Router();
const client = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const data = await client
      .db("demo1")
      .collection("service")
      .find()
      .toArray();
    res.send(data);
  } catch (error) {
    console.error("Error fetching notes:", error);
    return res.status(500).send({ error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const car = await client
      .db("demo1")
      .collection("service")
      .findOne({ _id: new ObjectId(id) });
    if (!car) {
      return res.status(404).send({ message: "Note not found" });
    }
    res.send(car);
  } catch (error) {
    console.error("Error fetching note:", error);
    return res.status(500).send({ error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { carId, note, status, createdAt, updatedAt } = req.body;

    const result = await client
      .db("demo1")
      .collection("service")
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            carId,
            note,
            status,
            createdAt,
            updatedAt,
          },
        }
      );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "Car not found" });
    }

    res.status(200).send({ message: "Car updated successfully" });
  } catch (error) {
    console.error("Error updating car:", error);
    return res.status(500).send({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { carId, note, status, createdAt, updatedAt } = req.body;

    const result = await client.db("demo1").collection("service").insertOne({
      carId,
      note,
      status,
      createdAt,
      updatedAt,
    });

    res
      .status(201)
      .send({ message: "Note added successfully", carId: result.insertedId });
  } catch (error) {
    console.error("Error adding note:", error);
    return res.status(500).send({ error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await client
      .db("demo1")
      .collection("service")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "Note not found" });
    }

    res.status(200).send({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    return res.status(500).send({ error });
  }
});

module.exports = router;
