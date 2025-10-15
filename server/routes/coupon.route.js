const express = require("express");
const {
  addCoupon,
  getAllCoupon,
  deleteCoupon,
  deleteAllCoupon,
  updateCoupon,
  getSingleCoupon,
} = require("../controller/coupon.controller");
const { authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/all-coupon", getAllCoupon);
router.get("/single-coupon/:couponId", getSingleCoupon);
router.post("/add-coupon", authorize("admin"), addCoupon);
router.put("/update-coupon/:couponId", authorize("admin"), updateCoupon);
router.delete("/delete-coupon/:couponId", authorize("admin"), deleteCoupon);
router.delete("/deleteAll-coupon", authorize("admin"), deleteAllCoupon);

module.exports = router;
