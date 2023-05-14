const mongoose = require("mongoose");
//customer order schema
const orderSchema = new mongoose.Schema(
  {
    OrderNo: {
      type: String,
    },
    ProductName: {
      type: Array,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
    },
    Price: {
      type: Number,
    },
    contact: {
      type: Number,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", orderSchema);
