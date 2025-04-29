const express = require('express');
const { getVoterStat } = require('../controllers/voterStatController');

const router = express.Router();

router.get("/stats", getVoterStat);

module.exports =  router;