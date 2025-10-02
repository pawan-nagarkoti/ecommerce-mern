const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: String,
  cartItems: [
    {
      productID: String,
      title: String,
      image: String,
      price: String,
      quantity: String,
    },
  ],
  addressInfo: {
    addressId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  orderStatus: {
    type: String,
    enum: [
      "Pending",
      "Processing",
      "Shipped",
      "OutForDelivery",
      "Delivered",
      "Cancelled",
      "Returned",
      "Refunded",
      "Failed",
    ],
    default: "Pending",
  },
  paymentMethod: String,
  paymentStatus: String,
  totalAmount: Number,
  orderDate: Date,
  orderUpdateDate: Date,
});

module.exports = mongoose.model("Order", orderSchema);
