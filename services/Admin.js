const Admin = require("../models/adminModel");

exports.getAllAdmins = async () => {
  return await Admin.find();
};

exports.getAdminById = async (id) => {
  return await Admin.findById(id);
};

// Create a new admin
exports.createAdmin = async (data) => {
  const newAdmin = new Admin(data);
  return await newAdmin.save();
};

// Update an admin by ID
exports.updateAdmin = async (id, data) => {
  return await Admin.findByIdAndUpdate(id, data, { new: true });
};

// Delete an admin by ID
exports.deleteAdmin = async (id) => {
  return await Admin.findByIdAndDelete(id);
};
