'use strict';

var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'umich-adpi',
    api_key: '974991525828391',
    api_secret: 'gFKfOJ8C7X6OEp7KYWuX2EOR-yM'
});

/**
 * Get awesome things
 */
exports.getImages = function (req, res) {
    return cloudinary.api.resources(function (result) {
        console.log(result);
        return res.json(result);
    });
};

exports.getByTag = function (req, res) {
    var paramTag = String(req.params.tag);
    console.log('retrieving images by paramTag ' + paramTag);
    return cloudinary.api.resources_by_tag(paramTag, function (result) {
        console.log(result);
        return res.json(result);
    });
};
