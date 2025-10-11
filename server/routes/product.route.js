const express = require("express");
const {
  fetchProducts,
  addProducts,
  deleteAllProducts,
  deleteProduct,
  updateProducts,
  fetchSingleProduct,
} = require("../controller/product.controller");
const upload = require("../middlewares/multer.middleware");
const { authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/get", authorize("user", "admin"), fetchProducts);
router.post("/add", upload.single("image"), authorize("admin"), addProducts);
router.delete("/delete-all", authorize("admin"), deleteAllProducts);
router.delete("/delete", authorize("admin"), deleteProduct);
router.put(
  "/update",
  upload.single("image"),
  authorize("admin"),
  updateProducts
);
router.get("/single", authorize("admin", "user"), fetchSingleProduct);

module.exports = router;
