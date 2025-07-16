const express = require("express");
const {
  fetchProducts,
  addProducts,
  deleteAllProducts,
} = require("../controller/product.controller");
const upload = require("../middlewares/multer.middleware");

const router = express.Router();

router.get("/get", fetchProducts);
router.post("/add", upload.single("image"), addProducts);
router.delete("/delete-all", deleteAllProducts);

module.exports = router;
