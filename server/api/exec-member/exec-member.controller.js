'use strict';

var _ = require('lodash');
var ExecMember = require('./exec-member.model');

// Get list of exec-members
exports.index = function (req, res) {
    ExecMember.find(function (err, ExecMembers) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, ExecMembers);
    });
};
// Get list of exec-members
exports.active = function (req, res) {
    ExecMember.find({active: true}, function (err, ExecMembers) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, ExecMembers);
    });
};

// Get a single ExecMember
exports.show = function (req, res) {
    ExecMember.findById(req.params.id, function (err, ExecMember) {
        if (err) {
            return handleError(res, err);
        }
        if (!ExecMember) {
            return res.send(404);
        }
        return res.json(ExecMember);
    });
};

// Creates a new ExecMember in the DB.
exports.create = function (req, res) {
    ExecMember.create(req.body, function (err, ExecMember) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, ExecMember);
    });
};

// Updates an existing ExecMember in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    ExecMember.findById(req.params.id, function (err, ExecMember) {
        if (err) {
            return handleError(err);
        }
        if (!ExecMember) {
            return res.send(404);
        }
        var updated = _.merge(ExecMember, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(err);
            }
            return res.json(200, ExecMember);
        });
    });
};

// Deletes a ExecMember from the DB.
exports.destroy = function (req, res) {
    ExecMember.findById(req.params.id, function (err, ExecMember) {
        if (err) {
            return handleError(res, err);
        }
        if (!ExecMember) {
            return res.send(404);
        }
        ExecMember.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}