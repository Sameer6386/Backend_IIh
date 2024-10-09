const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admincontroller");

router.get("/", adminController.getAllAdmins); // Get all admins
router.get("/:id", adminController.getAdminById); // Get admin by ID
router.post("/", adminController.createAdmin); // Create a new admin
router.put("/:id", adminController.updateAdmin); // Update an admin by ID
router.delete("/:id", adminController.deleteAdmin); // Delete an admin by ID

module.exports = router;
