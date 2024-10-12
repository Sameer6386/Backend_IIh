const express = require("express");
const authController = require("../controllers/Authcontroller");
const router = express.Router();

// Route to request an OTP for resetting password
router.post("/reset-password-otp", authController.sendResetOtp);

// Route to reset password with OTP
router.post("/reset-password", authController.resetPassword);

module.exports = router;
