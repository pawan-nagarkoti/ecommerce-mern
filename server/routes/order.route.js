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
router.post("/add", authorize("user"), addOrder);
router.get("/fetch/:id", authorize("user", "admin"), fetchOrder);
router.get("/get", fetchAllOrder);
router.put("/update/:id/:userId", authorize("admin"), updateOrder);
router.get("/single/:id", authorize("admin", "user"), fetchSingleOrder);

module.exports = router;
