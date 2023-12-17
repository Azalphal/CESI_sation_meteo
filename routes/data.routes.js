const users = require("../controllers/data.controller");
const express = require("express");
const router = express.Router();

router.post("/", users.create);

router.get("/", users.findAll);

module.exports = router;