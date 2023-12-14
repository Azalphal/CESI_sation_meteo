const models = require("../models");
const User = models.Users;

const validateUsersInput = (newUser) => {
    if (!newUser || typeof newUser !== "object" ||
        !("username" in newUser) ||
        !("email" in newUser) ||
        !("password" in newUser)) {
        throw new Error("Invalid input: Missing required fields.")
    }
};

exports.create = (req, res) => {

    validateUsersInput(req);

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    try {
        User.create(newUser, (err, result) => {
            return res.status(201).json(result);
        })
    } catch (err) {
        return res.status(400).json({error: "Validation error", details: err.message});
    }
};