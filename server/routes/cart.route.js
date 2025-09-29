const express = require("express");
const {
  addToCart,
  fetchCartData,
  deleteCartItem,
  updateCartItem,
} = require("../controller/cart.controller");
const router = express.Router();

router.post("/add", addToCart);
router.get("/fetch/:id", fetchCartData);
router.delete("/delete/:id", deleteCartItem);
router.put("/update", updateCartItem);

module.exports = router;
