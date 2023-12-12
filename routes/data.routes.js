module.exports = app => {
    const data = require("../controllers/data.model");

    const router = require("express").Router();

    // Create a new Tutorial
    router.post("/", data.create);

    // Retrieve all Tutorials
    router.get("/", data.findAll);

    // Retrieve all published Tutorials
    router.get("/published", data.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", data.findOne);

    app.use('/api/tutorials', router);
};