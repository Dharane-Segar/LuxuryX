const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique:true
    },
    expiryDate: {
      type: String,
      required: true,
    },
    usageLimit: {
      type: String,
      required: true,
    },
    usedCount: {
      type: String,
      required: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
    },
    product: {
      type: String,
      required: true,
    }
  },

);

const Coupon = mongoose.model("Coupon", couponSchema)

module.exports = Coupon;