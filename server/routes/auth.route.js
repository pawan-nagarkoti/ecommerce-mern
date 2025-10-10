const express = require("express");
const {
  registerUser,
  loginUser,
  refreshToken,
} = require("../controller/auth.controller");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);

module.exports = router;
