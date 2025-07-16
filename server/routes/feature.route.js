const express = require("express");
const {
  addNewFeatureImage,
  fetchFeaturedImages,
  deleteAllFeaturedImage,
} = require("../controller/feature.controller");
const upload = require("../middlewares/multer.middleware");

const router = express.Router();

router.post("/add", upload.single("image"), addNewFeatureImage);
router.get("/get", fetchFeaturedImages);
router.delete("/delete-all", deleteAllFeaturedImage);

module.exports = router;
