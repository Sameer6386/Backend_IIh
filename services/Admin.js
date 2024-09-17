const Admin = require("../models/Admin");

exports.createAdmin = async (adminData) => {
  return await Admin.create(adminData);
};

exports.getAllAdmins = async () => {
  return await Admin.find();
};

exports.getAdminById = async (id) => {
  return await Admin.findById(id);
};

exports.updateAdmin = async (id, updateData) => {
  return await Admin.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteAdmin = async (id) => {
  return await Admin.findByIdAndDelete(id);
};
