const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  uniqueID: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
  totalPrice: {
    type: Number,
  },
});

module.exports = mongoose.model("Cart", CartSchema);
