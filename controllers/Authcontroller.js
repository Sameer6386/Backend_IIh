const User = require("../models/user");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

exports.sendResetOtp = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const otp = otpGenerator.generate(6, {
    upperCase: false,
    specialChars: false,
  });
  user.otp = otp;
  user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
  await user.save();

  // Send OTP via email
  const transporter = nodemailer.createTransport({
    /* Email config here */
  });
  const mailOptions = {
    from: "Samir638670@gmail.com",
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP for password reset is: ${otp}`,
  };
  transporter.sendMail(mailOptions);

  res.status(200).json({ message: "OTP sent to your email." });
};

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });
  if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
  if (user.otpExpires < Date.now())
    return res.status(400).json({ message: "OTP has expired" });

  // Hash the new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // Update password and clear OTP fields
  user.password = hashedPassword;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  res.status(200).json({ message: "Password reset successfully." });
};
