//const Users = require("../models").sequelize;
const models = require('../models');
const User = models.User;

//const User = require("../models/users") // DOES NOT WORK

const validateUsersInput = (newUser) => {
    if (!newUser || typeof newUser !== "object" ||
        !("username" in newUser) ||
        !("email" in newUser) ||
        !("password" in newUser)) {
        throw new Error("Invalid input: Missing required fields.")
    }
};

exports.create = (req, res) => {

    //validateUsersInput(req);

    User.build({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).save().then((result) => res.status(200).json(result));

};

exports.findAll = (req, res) => {
     User.findAll().then((result) => res.status(200).json(result));

};