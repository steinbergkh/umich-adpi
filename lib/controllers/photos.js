'use strict';

var mongoose = require('mongoose'),
    Photo = mongoose.model('Photo');

exports.getById = function (req, res) {
    var cloudinaryId = String(req.params.id);
    console.log('retrieving image from db by id ' + cloudinaryId);
    Photo.find({cloudinaryId: cloudinaryId}, function (err, image) {
        if (err) {
            res.send(err);
        }
        else {
            console.log('IMAGE FOUND! ' + image);
            var imageObject = {data: image};
            res.send(imageObject);
        }

    });
};

exports.getAll = function (req, res, next) {
    console.log('looking for all pics');
    return Photo.find(function (err, image) {
        if (!err) {
            return res.json(image);
        } else {
            return res.send(err);
        }
    });
};

exports.edit = function (req, res, next) {
    var cloudinaryId = String(req.params.id);
    var tags = String(req.body.tags);

    Photo.find({cloudinaryId: cloudinaryId}, function (err, image) {
        image.tags = tags;
        image.save(function (err) {
            if (err) return res.send(400);

            res.send(200);
        });
    });
};

exports.create = function (req, res, next) {
    console.log('creating new photo');


    var newPhoto = new Photo(req.body);
    console.log('new photo ');
    newPhoto.save(function (err) {
        if (err) return res.json(400, err);
    });
};
