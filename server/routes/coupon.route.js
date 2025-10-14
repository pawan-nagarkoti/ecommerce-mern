const express = require("express");
const {
  addCoupon,
  getAllCoupon,
  deleteCoupon,
  deleteAllCoupon,
  updateCoupon,
  getSingleCoupon,
} = require("../controller/coupon.controller");

const router = express.Router();

router.get("/all-coupon", getAllCoupon);
router.get("/single-coupon/:id", getSingleCoupon);
router.post("/add-coupon", addCoupon);
router.put("/update-coupon/:id", updateCoupon);
router.delete("/delete-coupon", deleteCoupon);
router.delete("/deleteAll-coupon", deleteAllCoupon);

module.exports = router;
