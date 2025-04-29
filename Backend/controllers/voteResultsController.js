const crypto = require("crypto"); // Node.js crypto module for encryption/decryption
const Vote = require("../models/vote"); // Mongoose model for votes

// Decryption function using AES-256-CBC
const decryptData = (encryptedData, iv) => {
  const algorithm = "aes-256-cbc";
  const secretKey = process.env.SECRET_KEY_ENC; // Secret key from .env file

  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey), // Convert key to buffer
    Buffer.from(iv, "hex")  // Convert IV to buffer from hex string
  );

  let decrypted = decipher.update(encryptedData, "hex", "utf8"); // Decrypt encrypted string
  decrypted += decipher.final("utf8"); // Finalize decryption
  return decrypted; // Return the decrypted data
};

// Controller to get voting results
const getResults = async (req, res) => {
  try {
    const votes = await Vote.find(); // Fetch all votes from database

    // Decrypt each vote's candidate data
    const decryptedVotes = votes.map((vote) => {
      const decryptedName = decryptData(
        vote.candidate.name,
        vote.candidate.nameIv
      );

      const decryptedSymbol = decryptData(
        vote.candidate.symbol,
        vote.candidate.symbolIv
      );

      return {
        name: decryptedName,
        symbol: decryptedSymbol,
      };
    });

    console.log('all decrypt', decryptedVotes); // Debug: log decrypted data

    // Aggregate results (count total votes for each candidate)
    const results = decryptedVotes.reduce((acc, { name, symbol }) => {
      const existingCandidate = acc.find((item) => item.name === name);
      if (existingCandidate) {
        existingCandidate.totalVotes += 1; // Increase vote count if candidate exists
      } else {
        acc.push({ name, symbol, totalVotes: 1 }); // Add new candidate with 1 vote
      }
      return acc;
    }, []);

    // Sort results from highest to lowest votes
    results.sort((a, b) => b.totalVotes - a.totalVotes);

    console.log("Decrypted Aggregation Results:", results); // Debug: log final results
    res.status(200).json(results); // Send JSON response
  } catch (error) {
    console.error("Error fetching results:", error); // Log error
    res
      .status(500)
      .json({ message: "Server error while fetching results", error: error.message });
  }
};

module.exports = { getResults }; // Export the function to use in routes
