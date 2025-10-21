const express = require("express");
const { fetchStats } = require("../controller/dashboard.controller");

const router = express.Router();

router.get("/stats", fetchStats);

module.exports = router;
