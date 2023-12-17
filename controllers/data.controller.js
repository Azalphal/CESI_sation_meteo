const models = require('../models');
const Data = models.Data;

console.log(Data);

exports.create = (req, res) => {

    Data.build({
        humidity: req.body.humidity,
        temperature: req.body.temperature,
        position: req.body.position
    }).save().then((result) => res.status(200).json(result));

};

exports.findAll = (req, res) => {
    Data.findAll().then((result) => res.status(200).json(result));
};