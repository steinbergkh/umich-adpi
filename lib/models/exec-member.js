'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Exec Member Schema
 */
var ExecMemberSchema = new Schema({
    _id: Number,
    name: String,
    school: String,
    gradYear: Number,
    imageId: String,
    active: Boolean
});

mongoose.model('ExecMember', ExecMemberSchema);
