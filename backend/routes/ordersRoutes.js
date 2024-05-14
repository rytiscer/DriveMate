const { ObjectId } = require("mongodb");
const express = require("express");
require("dotenv").config();

const router = express.Router();
const client = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const data = await client.db("demo1").collection("orders").find().toArray();
    res.send(data);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).send({ error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const car = await client
      .db("demo1")
      .collection("orders")
      .findOne({ _id: new ObjectId(id) });
    if (!car) {
      return res.status(404).send({ message: "Order not found" });
    }
    res.send(car);
  } catch (error) {
    console.error("Error fetching order:", error);
    return res.status(500).send({ error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      clientId,
      carId,
      startDate,
      endDate,
      pickupLocation,
      returnLocation,
    } = req.body;

    const car = await client
      .db("demo1")
      .collection("cars")
      .findOne({ _id: new ObjectId(carId) });

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    const totalPrice = car.price * days;

    const result = await client
      .db("demo1")
      .collection("orders")
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            clientId,
            carId,
            startDate,
            endDate,
            pickupLocation,
            returnLocation,
            totalPrice,
          },
        }
      );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "Order not found" });
    }

    res.status(200).send({ message: "Order updated successfully" });
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).send({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      clientId,
      carId,
      startDate,
      endDate,
      pickupLocation,
      returnLocation,
      totalPrice,
    } = req.body;

    const result = await client.db("demo1").collection("orders").insertOne({
      clientId,
      carId,
      startDate,
      endDate,
      pickupLocation,
      returnLocation,
      totalPrice,
    });

    res
      .status(201)
      .send({ message: "Order added successfully", carId: result.insertedId });
  } catch (error) {
    console.error("Error adding order:", error);
    return res.status(500).send({ error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await client
      .db("demo1")
      .collection("orders")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "Order not found" });
    }

    res.status(200).send({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    return res.status(500).send({ error });
  }
});

module.exports = router;
