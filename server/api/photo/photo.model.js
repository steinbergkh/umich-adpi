'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PhotoSchema = new Schema({
    cloudinaryId: String,
    url: String,
    gallery: Boolean,
    approved: Boolean,
    rho: Boolean,
    tags: String
});

module.exports = mongoose.model('Photo', PhotoSchema);