const express = require("express");
const { searchProduct } = require("../controller/search.controller");

const router = express.Router();

router.get("/:keyword", searchProduct);

module.exports = router;
