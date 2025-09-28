const express = require("express");
const { addToCart, fetchCartData } = require("../controller/cart.controller");
const router = express.Router();

router.post("/add", addToCart);
router.get("/fetch", fetchCartData);

module.exports = router;
