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
const { authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post(
  "/add",
  authorize("admin"),
  upload.single("image"),
  addNewFeatureImage
);
router.get("/get", fetchFeaturedImages);
router.delete("/delete-all", authorize("admin"), deleteAllFeaturedImage);
router.delete("/delete", authorize("admin"), deleteFeaturedImage);
router.put(
  "/update",
  authorize("admin"),
  upload.single("image"),
  updateFeatureImage
);
router.get("/single", fetchSingleFeaturedImage);

module.exports = router;
