const crypto = require("crypto");
const Voter = require("../models/voter");
const Vote = require("../models/vote");

// Encryption configuration
const algorithm = "aes-256-cbc";
const secretKey = process.env.SECRET_KEY_ENC; // Define a secret key in your .env file

const encryptData = (data) => {
  const iv = crypto.randomBytes(16); // Generate a new IV for each encryption
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, "utf8"), iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return { encryptedData: encrypted, iv: iv.toString("hex") };
};

const castVote = async (req, res) => {
  const { cnic, candidate } = req.body;

  try {
    const voter = await Voter.findOne({ cnic });

    if (!voter) {
      return res.status(404).json({ message: "Voter not found" });
    }

    if (voter.hasVoted) {
      return res.status(400).json({ message: "Voter has already voted" });
    }

    voter.hasVoted = true;
    await voter.save();

    // Encrypt the candidate's data
    const encryptedName = encryptData(candidate.name);
    const encryptedSymbol = encryptData(candidate.symbol);

    // Saving the vote with the encrypted candidate object
    const newVote = new Vote({
      voterCnic: cnic,
      candidate: {
        name: encryptedName.encryptedData,
        symbol: encryptedSymbol.encryptedData,
        nameIv: encryptedName.iv, // Store the IV for name decryption
        symbolIv: encryptedSymbol.iv, // Store the IV for symbol decryption
      },
    });

    await newVote.save();

    res.status(200).json({ message: "Vote cast successfully" });
  } catch (error) {
    console.error("Error while casting vote:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { castVote };
