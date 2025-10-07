const express = require("express");
const {
  addAddress,
  fetchAddress,
  deleteAddress,
  updateAddress,
  fetchSingleAddress,
} = require("../controller/address.controller");
const router = express.Router();

router.post("/add", addAddress);
router.get("/get/:id", fetchAddress);
router.delete("/delete/:id", deleteAddress);
router.put("/update/:id", updateAddress);
router.get("/single/:id", fetchSingleAddress);

module.exports = router;
