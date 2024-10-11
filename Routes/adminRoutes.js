const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Admin Sign-up
router.post("/signup", adminController.signup);

// Admin Sign-in
router.post("/signin", adminController.signin);

// Admin CRUD routes for the dashboard
router.get("/", adminController.getAllAdmins);
router.get("/:id", adminController.getAdminById);
router.put("/:id", adminController.updateAdmin);
router.delete("/:id", adminController.deleteAdmin);

module.exports = router;
