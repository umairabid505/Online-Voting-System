const express = require("express");
const { getResults } = require("../controllers/voteResultsController");

const router = express.Router();

router.get("/result", getResults);

module.exports = router;
