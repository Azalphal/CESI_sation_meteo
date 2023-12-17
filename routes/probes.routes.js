const probes = require("../controllers/probe.controller");
const express = require("express");
const router = express.Router();

router.post("/", probes.create);

router.get("/", probes.findAll);

module.exports = router;