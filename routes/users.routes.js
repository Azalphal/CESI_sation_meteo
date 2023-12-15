const users = require("../controllers/users.controller");
const express = require("express");
const router = express.Router();

router.post("/", users.create);

//lolrouter.get("/", users.findAll);

module.exports = router;