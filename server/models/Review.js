const mongoose = require("mongoose");

const ProductReviewSchema = new mongoose.Schema({
  userId: String,
  productId: String,
  username: String,
  reviewMessage: String,
  reviewRating: Number,
});

module.exports = mongoose.model("Review", ProductReviewSchema);
