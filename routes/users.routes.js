const users = require("../controllers/users.controller");
const express = require("express");
const router = express.Router();

router.post("/", users.create);

router.get("/", users.findAll);

router.get("/:id", users.findOne);

router.put("/:id", users.update);

router.delete("/", users.delete);

module.exports = router;