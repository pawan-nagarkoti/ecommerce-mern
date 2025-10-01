const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  userID: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  pincode: {
    type: String,
  },
  phone: {
    type: String,
  },
  notes: {
    type: String,
  },
});

module.exports = mongoose.model("Address", addressSchema);
