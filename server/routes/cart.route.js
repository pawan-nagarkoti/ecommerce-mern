const express = require("express");
const { addToCart } = require("../controller/cart.controller");
const router = express.Router();

router.post("/add", addToCart);

module.exports = router;
