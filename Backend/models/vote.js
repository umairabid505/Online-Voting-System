// const mongoose = require("mongoose");

// const voteSchema = new mongoose.Schema({
//   voterCnic: { type: String, required: true },
//   candidate: {
//     name: { type: String, required: true },
//     symbol: { type: String, required: true },
//   },
// });

// module.exports = mongoose.model("Vote", voteSchema);
const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  voterCnic: { type: String, required: true },
  candidate: {
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    nameIv: { type: String, required: true }, // IV for name decryption
    symbolIv: { type: String, required: true }, // IV for symbol decryption
  },
});

module.exports = mongoose.model("Vote", voteSchema);
