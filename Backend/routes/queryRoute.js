// queryRoute.js
const express = require("express");
const router = express.Router();
const { handleQuery } = require("../controllers/queryController");

// POST request to handle user queries
router.post("/", handleQuery);

module.exports = router;
