const models = require('../models');
const User = models.User;

console.log(User);

exports.create = (req, res) => {

    User.build({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).save().then((result) => res.status(200).json(result));

};

exports.findAll = (req, res) => {
     User.findAll().then((result) => res.status(200).json(result));

};