'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ExecPositionSchema = new Schema({
    _id: Number,
    title: String,
    description: String,
    rank: Number,
    memberId: String
});

module.exports = mongoose.model('ExecPosition', ExecPositionSchema);