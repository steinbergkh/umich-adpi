'use strict';
var mongoose = require('mongoose'),
    ExecPosition = mongoose.model('ExecPosition'),
    ExecMember = mongoose.model('ExecMember');

/**
 * Create exec member
 */
exports.create = function (req, res, next) {
    var newExecMember = new ExecMember(req.body);

    var positionId = req.body.positionId;

    newExecMember.save(function (err, execMember) {
        if (err) {
            return res.json(400, err);
        }
        else {
            ExecPosition.findById(positionId, function (err, position) {
                if (err) {
                    console.log('couldn\'t find the exec position with id: ' + positionId);
                    res.send(err);
                }
                else {
                    position.memberId = execMember._id;
                    position.save(function (err, position) {
                        if (err) {
                            return res.json(400, err);
                        }
                        else {
                            console.log('set member id of position ' + position.title + ' to member id of ' + execMember.name);
                            res.json(execMember);
                        }
                    });
                }
            });
        }
    });


};

exports.edit = function (req, res, next) {
    var execId = req.params.id;
    var name = String(req.body.name);
    var school = String(req.body.school);
    var gradYear = Number(req.body.gradYear);
    var imageId = String(req.body.imageid);

    ExecMember.findById(execId, function (err, exec) {
        exec.name = name;
        exec.school = school;
        exec.gradYear = gradYear;
        exec.image_id = imageId;

        exec.save(function (err) {
            if (err) return res.send(400);

            res.send(200);
        });
    });
};

exports.findById = function (req, res, next) {
    // use mongoose to get exec by id
    var execId = req.params.id;
    ExecMember.findById(execId, function (err, exec) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err);

        res.json(exec);
    });
};

exports.findAll = function (req, res, next) {
    // use mongoose to get all nerds in the database
    ExecMember.find(function (err, execs) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err);

        res.json(execs); // return all nerds in JSON format
    });
};