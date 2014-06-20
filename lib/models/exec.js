'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Thing Schema
 */
var ExecSchema = new Schema({
    name: String,
    school: String,
    gradYear: Number,
    position: String,
    description: String,
    order: Number
});

mongoose.model('Exec', ExecSchema);
