const auth = require("../controllers/data.controller");
const express = require("express");
const router = express.Router();

router.post("/", users.create);

router.get("/", users.findAll);

router.get("/:id", users.findOne);

module.exports = router;
