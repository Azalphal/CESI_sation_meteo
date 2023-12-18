const models = require('../models');
const Probe = models.Probe;

console.log(Probe);

exports.create = (req, res) => {

    Probe.build({
        name: req.body.name,
        location: req.body.location
    }).save().then((result) => res.status(200).json(result));

};

exports.findAll = (req, res) => {
    Probe.findAll().then((result) => res.status(200).json(result));

};

exports.findOne = (req, res) => {
    Probe.findOne(req.body.id || req.body.name).then((result) => res.status(200).json(result));
};

exports.update = (req, res) => {
    Probe.update().then((result) => res.status(200).json(result));
};