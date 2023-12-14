const users = require("../controllers/user.controller");
const express = require('express');
const router = express.Router();

// Create a new Tutorial
router.post("/", users.create);
router.get("/", users.findAll);

module.exports = router;

