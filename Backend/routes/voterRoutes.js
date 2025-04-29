const express = require("express");
const { checkVote } = require("../controllers/voterController");

const router = express.Router();

router.post("/checkVote", checkVote);

module.exports = router;
