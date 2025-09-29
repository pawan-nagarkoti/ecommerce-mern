const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  uniqueID: {
    type: String,
  },
  productID: {
    // type: String,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
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
