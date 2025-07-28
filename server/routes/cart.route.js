const express = require("express");
const { addToCart } = require("../controller/cart.controller");
const router = express.Router();

router.get("/get", addToCart);

module.exports = router;
