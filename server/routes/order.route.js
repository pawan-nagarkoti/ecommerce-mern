const express = require("express");
const {
  addOrder,
  fetchOrder,
  updateOrder,
  fetchSingleOrder,
  fetchAllOrder,
} = require("../controller/order.controller");
const { authorize } = require("../middlewares/auth.middleware");

const router = express.Router();
router.post("/add", authorize("admin"), addOrder);
router.get("/fetch/:id", authorize("admin"), fetchOrder);
router.get("/get", fetchAllOrder);
router.put("/update/:id/:userId", authorize("admin"), updateOrder);
router.get("/single/:id", authorize("admin"), fetchSingleOrder);

module.exports = router;
