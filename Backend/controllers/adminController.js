const bcrypt = require("bcrypt");
const Admin = require("../models/admin");

const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log(username,password);
    
    // Find admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare hashed passwords
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: " invalid pass" });
    }

    // Generate token
    const token = await admin.generateToken();
    console.log("Generated Token:", token);

    // Set cookie with the token
    res.cookie("loginCookies", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure flag for production
      sameSite: "strict", // Prevent CSRF attacks
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { adminLogin };
