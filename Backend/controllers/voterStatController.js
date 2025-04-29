const Voter = require("../models/voter"); // Import the Voter model
const Vote = require("../models/vote");   // Import the Vote model

// Function to get voter stats
const getVoterStat = async (req, res) => {
  try {
    // Count the total number of voters
    const totalVoters = await Voter.countDocuments();

    // Count the total number of votes cast (where hasVoted is true)
    const totalVotesCast = await Voter.countDocuments({ hasVoted: true });

    // Calculate the remaining voters
    const remainingVoters = totalVoters - totalVotesCast;

    // Return the stats in the response
    res.json({
      totalVoters,
      totalVotesCast,
      remainingVoters
    });
  } catch (error) {
    console.error("Error fetching voter stats:", error);
    res.status(500).json({ message: "Error fetching voter stats" });
  }
};

module.exports = { getVoterStat };
