'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Thing Schema
 */
var PhotoSchema = new Schema({
    cloudinaryId: String,
    url: String,
    tags: String
});

mongoose.model('Photo', PhotoSchema);
