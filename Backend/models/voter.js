
const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
  cnic: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  hasVoted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Voter", voterSchema);
