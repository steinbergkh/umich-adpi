'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Thing Schema
 */
var PhotoSchema = new Schema({
    cloudinary_id: String,
    version: Number,
    width: Number,
    height: Number,
    format: String,
    bytes: Number,
    url: String,
    secure_url: String,
    title: String,
    tags: String
});

mongoose.model('Photo', PhotoSchema);
