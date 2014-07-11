'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
    ExecPositions = mongoose.model('ExecPosition');

/**
 * Get awesome things
 */
exports.awesomeThings = function (req, res) {
    return Thing.find(function (err, things) {
        if (!err) {
            return res.json(things);
        } else {
            return res.send(err);
        }
    });
};

exports.awesomePositions = function (req, res) {
    return ExecPositions.find(function (err, things) {
        if (!err) {
            return res.json(things);
        } else {
            return res.send(err);
        }
    });
};