const express = require("express");
const {
  addNewFeatureImage,
  fetchFeaturedImages,
} = require("../controller/feature-controller");

const router = express.Router();

// router.post("/add", addNewFeatureImage);
router.get("/get", fetchFeaturedImages);

module.exports = router;
