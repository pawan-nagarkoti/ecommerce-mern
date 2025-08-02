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

const router = express.Router();

router.get("/get", fetchProducts);
router.post("/add", upload.single("image"), addProducts);
router.delete("/delete-all", deleteAllProducts);
router.delete("/delete", deleteProduct);
router.put("/update", upload.single("image"), updateProducts);
router.get("/single", fetchSingleProduct);

module.exports = router;
