const { ObjectId } = require("mongodb");
const express = require("express");
require("dotenv").config();

const router = express.Router();
const client = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const data = await client.db("demo1").collection("cars").find().toArray();
    res.send(data);
  } catch (error) {
    console.error("Error fetching cars:", error);
    return res.status(500).send({ error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const car = await client
      .db("demo1")
      .collection("cars")
      .findOne({ _id: new ObjectId(id) }); // Pakeičiau čia
    if (!car) {
      return res.status(404).send({ message: "Car not found" });
    }
    res.send(car);
  } catch (error) {
    console.error("Error fetching car:", error);
    return res.status(500).send({ error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      brand,
      model,
      year,
      color,
      carType,
      gearbox,
      img,
      fuelType,
      price,
    } = req.body;

    const result = await client
      .db("demo1")
      .collection("cars")
      .updateOne(
        { _id: new ObjectId(id) }, // Ir čia
        {
          $set: {
            brand,
            model,
            year,
            color,
            carType,
            gearbox,
            img,
            fuelType,
            price,
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
    const {
      brand,
      model,
      year,
      color,
      carType,
      gearbox,
      img,
      fuelType,
      price,
    } = req.body;

    const result = await client.db("demo1").collection("cars").insertOne({
      brand,
      model,
      year,
      color,
      carType,
      gearbox,
      img,
      fuelType,
      price,
    });

    res
      .status(201)
      .send({ message: "Car added successfully", carId: result.insertedId });
  } catch (error) {
    console.error("Error adding car:", error);
    return res.status(500).send({ error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await client
      .db("demo1")
      .collection("cars")
      .deleteOne({ _id: new ObjectId(id) }); // Ir čia

    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "Car not found" });
    }

    res.status(200).send({ message: "Car deleted successfully" });
  } catch (error) {
    console.error("Error deleting car:", error);
    return res.status(500).send({ error });
  }
});

module.exports = router;
