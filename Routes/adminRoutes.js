const express = require("express");
const adminController = require("../controllers/admincontroller");

const router = express.Router();

router.post("/admin", adminController.createAdmin);
router.get("/admin", adminController.getAllAdmins);
router.get("/admin/:id", adminController.getAdmin);
router.put("/admin/:id", adminController.updateAdmin);
router.delete("/admin/:id", adminController.deleteAdmin);

module.exports = router;
