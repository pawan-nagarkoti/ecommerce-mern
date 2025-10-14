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
router.get("/single-coupon/:couponId", getSingleCoupon);
router.post("/add-coupon", addCoupon);
router.put("/update-coupon/:couponId", updateCoupon);
router.delete("/delete-coupon/:couponId", deleteCoupon);
router.delete("/deleteAll-coupon", deleteAllCoupon);

module.exports = router;
