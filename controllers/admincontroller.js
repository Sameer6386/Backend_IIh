const adminService = require("../services/Admin");

// Admin Sign-up
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newAdmin = await adminService.createAdmin({ name, email, password });
    res
      .status(201)
      .json({ message: "Admin created successfully", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin Sign-in
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await adminService.signInAdmin({ email, password });
    res.status(200).json({ message: "Admin signed in successfully", token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

// CRUD operations for admin dashboard
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await adminService.getAllAdmins();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAdminById = async (req, res) => {
  try {
    const admin = await adminService.getAdminById(req.params.id);
    res.status(200).json(admin);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const updatedAdmin = await adminService.updateAdmin(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    await adminService.deleteAdmin(req.params.id);
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
