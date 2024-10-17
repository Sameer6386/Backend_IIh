const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/jobMiddle");

// router.post("/login", authController.login);
// router.get("/job-cards", authMiddleware, authController.getJobCardDetails);

module.exports = router;
