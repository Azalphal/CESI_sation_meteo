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

exports.findLast = (req, res) => {
    // todo: need to check this
    Data.findAll({
        order: [['id', 'DESC']], // sort by id in descending order
    })
        .then((result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: 'No data found' });
            }
        });
};

exports.findOne = (req, res) => {
    Data.findOne(req.body.id).then((result) => res.status(200).json(result));
};