const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Admin",
  },
  device_Token: {
    type: String,
    default: "",
  },
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
