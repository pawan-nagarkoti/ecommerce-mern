const express = require("express");
const {
  addOrder,
  fetchOrder,
  updateOrder,
} = require("../controller/order.controller");

const router = express.Router();
router.post("/add", addOrder);
router.get("/fetch", fetchOrder);
router.put("/update/:id/:userId", updateOrder);

module.exports = router;
