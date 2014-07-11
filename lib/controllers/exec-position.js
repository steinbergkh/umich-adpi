'use strict';
var mongoose = require('mongoose'),
    ExecPosition = mongoose.model('ExecPosition');

/**
 * Create exec member
 */
exports.create = function (req, res, next) {
    var newExecPosition = new ExecPosition(req.body);
    newExecPosition.save(function (err) {
        if (err) return res.json(400, err);
    });
};

exports.edit = function (req, res, next) {
    var execId = req.params.id;
    var title = String(req.body.title);
    var description = String(req.body.description);
    var rank = Number(req.body.rank);

    ExecPosition.findById(execId, function (err, exec) {
        exec.title = title;
        exec.description = description;
        exec.rank = rank;
        exec.save(function (err) {
            if (err) return res.send(400);

            res.send(200);
        });
    });
};

exports.findById = function (req, res, next) {
    var execId = req.params.id;
    ExecPosition.findById(execId, function (err, exec) {
        if (err)
            res.send(err);
        res.json(exec);
    });
};

exports.findByTitle = function (req, res, next) {
    var title = req.params.title;
    ExecPosition.find({title: title}, function (err, exec) {
        if (err)
            res.send(err);
        res.json(exec);
    });
};

exports.findByRank = function (req, res, next) {
    var rank = req.params.rank;
    ExecPosition.find({rank: rank}, function (err, exec) {
        if (err)
            res.send(err);
        res.json(exec);
    });
};

exports.findByMember = function (req, res, next) {
    var memberId = req.params.memberId;
    ExecPosition.find({memberId: memberId}, function (err, exec) {
        if (err)
            res.send(err);
        res.json(exec);
    });
};


exports.findAll = function (req, res, next) {
    // use mongoose to get all nerds in the database
    console.log('looking for exec positions');
    return ExecPosition.find(function (err, things) {
        if (!err) {
            return res.json(things);
        } else {
            return res.send(err);
        }
    });
};