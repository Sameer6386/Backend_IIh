const jwt = require("jsonwebtoken");
const JobCard = require("../models/JobCard");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getJobCardDetails = async (req, res) => {
  try {
    const jobCards = await JobCard.find(); // Fetch all job cards
    res.json(jobCards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
