const express = require("express");
const {
  addNewFeatureImage,
  fetchFeaturedImages,
} = require("../controller/feature.controller");
const upload = require("../middlewares/multer.middleware");

const router = express.Router();

router.post("/add", upload.single("image"), addNewFeatureImage);
router.get("/get", fetchFeaturedImages);

module.exports = router;
