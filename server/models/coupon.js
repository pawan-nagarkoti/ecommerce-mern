const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    code: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      enum: ["Percent", "Fixed"],
      default: "Percent",
      require: true,
    },
    value: {
      type: Number,
      require: true,
    },
    minimumOrder: {
      type: Number,
      require: true,
    },
    useLeft: {
      type: Number,
      require: true,
    },
    expireOn: {
      type: String,
      require: true,
    },
    active: {
      type: Boolean,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
