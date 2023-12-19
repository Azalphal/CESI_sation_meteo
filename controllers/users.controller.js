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

exports.findLast = (req, res) => {
    // chatgtp here
};

exports.findOrCreate = (req, res) => {
    User.findOrCreate({ where: { username: }})
};

exports.findOne = (req, res) => {
    User.findOne(req.body.id).then((result) => res.status(200).json(result));
};

exports.update = (req, res) => {
    User.update().then((result) => res.status(200).json(result));
};

exports.delete = (req, res) => {
    User.destroy().then((result) => res.status(200).json(result));
};