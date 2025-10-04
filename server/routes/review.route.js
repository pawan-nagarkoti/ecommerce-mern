const express = require("express");
const {
  addProductReview,
  fetchProductReview,
  checkValidUserForReview,
} = require("../controller/review.controller");

const router = express.Router();

router.post("/add", addProductReview);
router.get("/fetch/:id", fetchProductReview);
router.get("/checkValidUser", checkValidUserForReview);

module.exports = router;
