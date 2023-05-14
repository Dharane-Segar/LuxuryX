const express = require("express");
const dotenv = require("dotenv");
const CustomerOrder = require("../models/CustomerOrder");
const router = new express.Router();
const mongoose = require("mongoose");
//place order
router.post("/submit", async (req, res) => {
  const { email, ProductName, Price, contact, address } = req.body;

  try {
    const newOrder = new CustomerOrder({
      email,
      ProductName,
      Price,
      contact,
      address,
    });

    const storedata = await newOrder.save();
    res.status(201).json(storedata);
  } catch (error) {
    console.log("Cannot place order" + error.message);
    res.status(422).send(error);
  }
});

router.route("/").get((req, res) => {
  order
    .find()
    .then((Order) => {
      res.json(CustomerOrder);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/update/:id").put(async (req, res) => {
  let orderId = req.params.id;
  const { email, fname, product, total, contact, address, status } = req.body;

  const updateOrder = {
    email,
    fname,
    product,
    total,
    contact,
    address,
    status,
  };

  const update = await CustomerOrder.findByIdAndUpdate(orderId, updateOrder)
    .then(() => {
      res.status(200).send({ status: "Order Updated", Order: update });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});
router.route("/delete/:id").delete(async (req, res) => {
  let orderId = req.params.id;

  await order
    .findByIdAndDelete(orderId)
    .then(() => {
      res.status(200).send({ status: "User Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with delete order", error: err.message });
    });
});

router.route("/get/:id").get(async (req, res) => {
  let orderId = req.params.id;
  const Order = await CustomerOrder.findById(orderId)
    .then(() => {
      res.status(200).send({ status: "User Fetched", Order: CustomerOrder });
    })
    .catch(() => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get order", error: err.message });
    });
});
module.exports = router;
