const express = require("express");
const { adminLogin } = require("../controllers/adminController");

const router = express.Router();

router.post("/adminLogin", adminLogin);

module.exports = router;
