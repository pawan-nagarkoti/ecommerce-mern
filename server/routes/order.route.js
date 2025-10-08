const express = require("express");
const {
  addOrder,
  fetchOrder,
  updateOrder,
  fetchSingleOrder,
  fetchAllOrder,
} = require("../controller/order.controller");

const router = express.Router();
router.post("/add", addOrder);
router.get("/fetch/:id", fetchOrder);
router.get("/get", fetchAllOrder);
router.put("/update/:id/:userId", updateOrder);
router.get("/single/:id", fetchSingleOrder);

module.exports = router;
