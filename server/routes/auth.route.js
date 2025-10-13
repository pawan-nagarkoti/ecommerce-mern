const express = require("express");
const {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
  restPassword,
  authMiddleware,
  sendMailForOtp,
  verifyOtp,
} = require("../controller/auth.controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.post("/logout", logoutUser);
router.post("/reset-password", authMiddleware, restPassword);
router.post("/mail-for-otp", sendMailForOtp);
router.post("/verify-otp", verifyOtp);

module.exports = router;
