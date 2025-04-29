const Voter = require("../models/voter");
const bcrypt = require("bcryptjs"); // import bcrypt

const checkVote = async (req, res) => {
  const { cnic, password } = req.body;

  try {
    const voter = await Voter.findOne({ cnic });

    if (!voter) {
      return res.status(404).json({ message: "Voter not found" });
    }

    // Compare provided password with hashed password
    const isPasswordValid = await bcrypt.compare(password, voter.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    if (voter.hasVoted) {
      return res.status(200).json({ hasVoted: true });
    } else {
      return res.status(200).json({ hasVoted: false });
    }
  } catch (error) {
    console.error("Error checking vote:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { checkVote };
