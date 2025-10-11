const express = require("express");
const {
  addNewFeatureImage,
  fetchFeaturedImages,
  deleteAllFeaturedImage,
  deleteFeaturedImage,
  updateFeatureImage,
  fetchSingleFeaturedImage,
} = require("../controller/feature.controller");
const upload = require("../middlewares/multer.middleware");
const { authMiddleware } = require("../controller/auth.controller");

const router = express.Router();

router.post("/add", upload.single("image"), addNewFeatureImage);
router.get("/get", authMiddleware, fetchFeaturedImages);
router.delete("/delete-all", deleteAllFeaturedImage);
router.delete("/delete", deleteFeaturedImage);
router.put("/update", upload.single("image"), updateFeatureImage);
router.get("/single", fetchSingleFeaturedImage);

module.exports = router;
