'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ExecMemberSchema = new Schema({
    _id: Number,
    name: String,
    school: String,
    gradYear: Number,
    imageId: String,
    active: Boolean
});

module.exports = mongoose.model('ExecMember', ExecMemberSchema);