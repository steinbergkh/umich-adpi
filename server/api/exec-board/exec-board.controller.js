'use strict';

var _ = require('lodash');
var ExecPosition = require('../exec-position/exec-position.model');
var ExecMember = require('../exec-member/exec-member.model');

exports.index = function (req, res) {
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
                var returnItem = {
                    results: ExecBoardList
                };
                return res.json(200, returnItem);
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

function handleError(res, err) {
    return res.send(500, err);
}
3