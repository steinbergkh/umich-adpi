'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Thing Schema
 */
var ExecPositionSchema = new Schema({
    _id: Number,
    title: String,
    description: String,
    rank: Number,
    memberId: String
});

mongoose.model('ExecPosition', ExecPositionSchema);
