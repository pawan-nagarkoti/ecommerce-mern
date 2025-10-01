const express = require("express");
const {
  addAddress,
  fetchAddress,
  deleteAddress,
  updateAddress,
} = require("../controller/address.controller");
const router = express.Router();

router.post("/add", addAddress);
router.get("/get", fetchAddress);
router.delete("/delete/:id", deleteAddress);
router.put("/update/:id", updateAddress);

module.exports = router;
