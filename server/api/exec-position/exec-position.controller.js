'use strict';

var _ = require('lodash');
var ExecPosition = require('./exec-position.model');
var ExecMember = require('../exec-member/exec-member.model');

var mongoose = require('mongoose');
var db = mongoose.connection;

var MJ = require("mongo-fast-join"),
    mongoJoin = new MJ();

// Get list of ExecPositions
exports.index = function (req, res) {
    ExecPosition.find(function (err, ExecPositions) {
        if (err) {
            return handleError(res, err);
        }
        else {
            console.log('ALL EXEC POSITIONS');
            console.log(ExecPositions);
        }

    });
};

// Get a single ExecPosition
exports.show = function (req, res) {
    ExecPosition.findById(req.params.id, function (err, ExecPosition) {
        if (err) {
            return handleError(res, err);
        }
        if (!ExecPosition) {
            return res.send(404);
        }
        return res.json(ExecPosition);
    });
};

// Creates a new ExecPosition in the DB.
exports.create = function (req, res) {
    ExecPosition.create(req.body, function (err, ExecPosition) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, ExecPosition);
    });
};

// Updates an existing ExecPosition in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    ExecPosition.findById(req.params.id, function (err, ExecPosition) {
        if (err) {
            return handleError(err);
        }
        if (!ExecPosition) {
            return res.send(404);
        }
        var updated = _.merge(ExecPosition, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(err);
            }
            return res.json(200, ExecPosition);
        });
    });
};

// Deletes a ExecPosition from the DB.
exports.destroy = function (req, res) {
    ExecPosition.findById(req.params.id, function (err, ExecPosition) {
        if (err) {
            return handleError(res, err);
        }
        if (!ExecPosition) {
            return res.send(404);
        }
        ExecPosition.remove(function (err) {
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

exports.execBoard = function () {
    var ExecBoardList = [];
    ExecPosition.find(function (err, ExecPositions) {
        if (err) {
            console.log(err);
        }
        else {
            for (var i = 0; i < ExecPositions.length; ++i) {
                var ExecPositionItem = _.clone(ExecPositions[i])._doc;
                // console.log(ExecPositionItem);
                var boardMember = findMember(ExecPositions[i].memberId, ExecPositionItem._id, ExecPositionItem);
            }
        }
    });
    var findMember = function (memId, positionId, positionItem) {
        ExecMember.findById(memId, function (err, member) {
            if (err) {
                console.log(err);
            }
            else if (!member) {
                console.log('couldn\'t find member with id = ' + memId);
            }
            var ExecBoardItem = ExecBoard(positionItem, member);
            ExecBoardList.push(ExecBoardItem);
            if (ExecBoardList.length > 7) {
                ExecBoardList = _.sortBy(ExecBoardList, function (item) {
                    var rank = item.position.rank;
                    console.log(rank);
                    return rank;
                });
                console.log('\n-----------');
                console.log(ExecBoardList);
                console.log('-----------\n');
            }
            return member;
        });
    };

    var ExecBoard = function (position, member) {
        return {
            'position': position,
            'member': member
        };
    };
};