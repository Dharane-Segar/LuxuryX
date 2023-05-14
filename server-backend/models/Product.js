const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
   ProductName: {
    type: String,
    require: true,
  },
  Price: {
    type: Number,
    require: true,
  },
  Description: {
    type: String,
    require: true,
  },
  Qty: {
    type: Number,
    require: true,
  },
  Category: {
    type: String,
    require: true,
  },
  ImageBase64: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
