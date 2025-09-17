const express = require("express");
const { registerUser } = require("../controller/auth.controller");
const router = express.Router();

router.get("/register", registerUser);

module.exports = router;
