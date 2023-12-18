const probes = require("../controllers/probe.controller");
const express = require("express");
const router = express.Router();

router.post("/", probes.create);

router.get("/", probes.findAll);

router.get("/:id", probes.findOne);

router.put("/", probes.update);

module.exports = router;