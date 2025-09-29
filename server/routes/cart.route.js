const express = require("express");
const {
  addToCart,
  fetchCartData,
  deleteCartItem,
} = require("../controller/cart.controller");
const router = express.Router();

router.post("/add", addToCart);
router.get("/fetch", fetchCartData);
router.delete("/delete/:id", deleteCartItem);

module.exports = router;
