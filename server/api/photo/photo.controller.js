'use strict';

var _ = require('lodash');
var Photo = require('./photo.model');
var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'umich-adpi',
    api_key: '974991525828391',
    api_secret: 'gFKfOJ8C7X6OEp7KYWuX2EOR-yM'
});

// Get list of photos
exports.index = function (req, res) {
    Photo.find()
        .limit(200)
        .exec(function (err, photos) {
            if (err) {
                return handleError(res, err);
            }
            var returnObj = {
                data: photos
            };
            return res.json(200, returnObj);
        });
};

// Get a single photo
exports.gallery = function (req, res) {
    Photo.find({approved: true})
        .where('rho').equals(false)
        .sort('+cloudinaryId')
        .exec(function (err, Images) {
            console.log('Looking for gallery images!');

            if (err) {
                res.send(err);
            }
            else {
                console.log(Images);
                res.send(Images);
            }
        });
};

// Creates a new photo in the DB.
var createImage = function (req, res) {
    var cloudinaryId = String(req.params.id);


    if (typeof cloudinaryId == undefined) {
        console.log('undefined cloudinaryId!!!!!!');
    }

    console.log('\n---- creating image from createImage function ----');
    console.log('request body: ' + req.body);
    console.log('----------------------------------------------------\n');
    cloudinary.api.update(cloudinaryId,
        function (result) { /*console.log('trying to update image ' +result); */
        },
        { tags: "galleries_images" });
    Photo.create(req.body, function (err, photo) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, photo);
    });
};

exports.create = createImage;

// Get a single photo
exports.show = function (req, res) {
    var cloudinaryId = String(req.params.id);
    console.log('retrieving image from db by id ' + cloudinaryId);
    Photo.findOne({cloudinaryId: cloudinaryId}, function (err, image) {
        if (err) {
            res.send(err);
        }
        else if (!image) {

            console.log('couldn\'t find image ' + cloudinaryId + ' , so we\'re NOT creating it');

            res.send(err);
            /*return createImage(req, res);*/
        }
        else {
            console.log('IMAGE FOUND! ' + image);
            var imageObject = {data: image};

            if (typeof(image.tags) != "undefined") {
                var tagsArray = image.tags.split(',');
                imageObject.tags = [];
                var index;
                for (index = 0; index < tagsArray.length; ++index) {
                    imageObject.tags.push({"text": tagsArray[index]});
                }
                console.log('image changed to ' + image);
            }
            else {
                console.log(image.tags);
            }
            res.send(imageObject);
        }

    });
};

exports.adminUpdate = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    var cloudinaryId = String(req.params.id);
    Photo.findOne({cloudinaryId: cloudinaryId}, function (err, image) {
        if (err) {
            res.send(err);
        }
        else {
            var updated = _.merge(image, req.body);
            updated.save(function (err) {
                if (err) {
                    return handleError(err);
                }
                return res.json(200, image);
            });
        }

    });
    Photo.update({cloudinaryId: cloudinaryId}, {
        $set: {
            tags: req.body.tags,
            approved: req.body.approved,
            gallery: req.body.gallery,
            rho: req.body.rho

        }
    });
};

// Updates an existing photo in the DB.
exports.updateTags = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    var cloudinaryId = String(req.params.id);
    console.log('RETRIEVING IMAGE TO UPDATE TAGS' + cloudinaryId);
    Photo.findOne({cloudinaryId: cloudinaryId}, function (err, image) {
        if (err) {
            res.send(err);
        }
        else {
            console.log('IMAGE FOUND! ' + image);
            console.log('now updating tags from ' + image.tags + ' to ' + req.body.tags);

            var updated = _.merge(image, req.body);
            updated.save(function (err) {
                if (err) {
                    return handleError(err);
                }
                return res.json(200, image);
            });
        }

    });

    Photo.update({cloudinaryId: cloudinaryId}, {$set: {tags: req.body.tags}});
};


// Updates an existing photo in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    var cloudinaryId = String(req.params.id);
    console.log('RETRIEVING IMAGE TO UPDATE ' + cloudinaryId);
    Photo.findOne({cloudinaryId: cloudinaryId}, function (err, photo) {
        if (err) {
            return handleError(err);
        }
        if (!photo) {
            console.log('couldn\'t find image, so we\'re CREATING IT!');
            return CreateImage(req, res);
        }
        var updated = _.merge(photo, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(err);
            }
            return res.json(200, photo);
        });
    });
};

// Deletes a photo from the DB.
exports.destroy = function (req, res) {
    var cloudinaryId = String(req.params.id);
    console.log('retrieving image from db by id ' + cloudinaryId);
    cloudinary.api.delete_resources(cloudinaryId, function (result) {
        console.log('deleted from cloudinary! ' + result);
    });
    Photo.findOne({cloudinaryId: cloudinaryId}, function (err, photo) {
        if (err) {
            return handleError(res, err);
        }
        if (!photo) {
            return res.send(404);
        }
        photo.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(err);
}