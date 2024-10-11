const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Service for creating admin
exports.createAdmin = async ({ name, email, password }) => {
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    throw new Error("Email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newAdmin = new Admin({ name, email, password: hashedPassword });
  return await newAdmin.save();
};

// Service for admin sign-in
exports.signInAdmin = async ({ email, password }) => {
  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { id: admin._id, email: admin.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return token;
};

// CRUD operations
exports.getAllAdmins = async () => {
  return await Admin.find();
};

exports.getAdminById = async (id) => {
  const admin = await Admin.findById(id);
  if (!admin) {
    throw new Error("Admin not found");
  }
  return admin;
};

exports.updateAdmin = async (id, data) => {
  return await Admin.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteAdmin = async (id) => {
  return await Admin.findByIdAndDelete(id);
};
