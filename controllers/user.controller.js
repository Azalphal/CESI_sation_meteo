const models = require ('../models');
const User = models.User;

// Create and Save a new Tutorial
exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Tutorial
    new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    }).save().then(result => res.status(201).json(result));
};

exports.findAll =  (req, res) => {
    User.findAll().then(result => res.status(200).json(result));
}