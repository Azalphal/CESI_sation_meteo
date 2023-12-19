const data = require("../controllers/data.controller");
const express = require("express");
const router = express.Router();

router.post("/", data.create);

router.get("/", data.findAll);

router.get("/:id", data.findOne);

module.exports = router;
