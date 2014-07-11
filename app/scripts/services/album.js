'use strict';
angular.module('umichAdpiApp').factory('album', function ($rootScope, $resource) {
    return function (tag) {
        // set default value for tag
        tag = typeof tag !== 'undefined' ? tag : 'galleries_images';

        var url = $.cloudinary.url(tag, {format: 'json', type: 'list'});
        //cache bust
        url = url + "?" + Math.ceil(new Date().getTime() / 1000);
        return $resource(url, {}, {
            photos: {method: 'GET', isArray: false}
        });
    };
});

angular.module('umichAdpiApp').factory('imageService', function ($resource, $q, $rootScope, adpiHttp) {
    var service = {};
    var ImageTag = $resource('/api/photos/:tag', {tag: '@tag'});

    service.getImages = adpiHttp('/api/photos');
    service.getImagesByTag = function (tag) {
        ImageTag.get({tag: tag}, function (results) {
            console.log('getImagesByTag function: ' + results);
            return results;
        });
    };

    return service;
});

angular.module('umichAdpiApp').factory('imageCreateService', function ($resource, $q, $rootScope) {
    var service = {};
    var ImageCreate = $resource('/api/photo');

    service.saveImage = function (id, url, tags) {
        console.log('creating new image with public id: ' + id + ' and url: ' + url);
        if (typeof(tags) === 'undefined') {
            tags = 'galleries_images';
        }
        ImageCreate.save({cloudinaryId: id, url: url, tags: tags}, function (results) {
            console.log('created new image!');
        });
    };

    return service;
});

angular.module('umichAdpiApp').factory('Image', function ($rootScope, $resource) {
    var Image = {};

    return function (cloudinaryId, url, tags) {
        Image.cloudinaryId = cloudinaryId;
        Image.url = url;
        Image.tags = tags;

        return Image;
    };
});

angular.module('umichAdpiApp').factory('imageModel', function ($rootScope, $resource, album, Image) {

    var ImageCreate = $resource('/api/photo');
    var ImageFind = $resource('/api/photo/:id', {id: '@id'});
    var ImageTag = $resource('/api/photos/:tag', {tag: '@tag'});

    return function (imageObj) {

        if (typeof(imageObj) === 'undefined') {
            //
        }
        var key = imageObj.key;
        var val = imageObj.value;
        console.log(key + ': ' + val);

        var id = val.public_id;
        var url = val.url;
        var tags = 'galleries_images';

        var findImageCallback = function (results) {
            results = results.data;
            // console.log('results = '+results);
            if (results.length > 0) {
                console.log('found matching image ' + results);
                var imageJSON = $rootScope.photos[key];
                var imageDB = results[0];
                $rootScope.photos[key].tags = imageDB.tags;

                console.log('image with key = ' + key + ': ' + imageJSON);
                console.log('image from DB : ' + imageDB);
            }
            else {
                console.log('going to try to create one!');
                ImageCreate.save({cloudinaryId: id, url: url, tags: tags}, function (results) {
                    console.log('created new image!');
                });
            }
        };

        var findImage = function (callback) {
            ImageFind.get({id: id}, callback);
        };

        var editImage = function (callback) {
            ImageFind.post({id: id}, callback);
        };

        findImage(findImageCallback);

        return {
            getImage: findImage,
            editImage: editImage
        };


    };
});


angular.module('umichAdpiApp').factory('albumAPIService', function ($rootScope, $resource, imageService, imageModel) {
    var imageResource = imageService.getImages.get;
    var Images = $resource('/api/photos/:tag', {tag: '@tag'});

    return function (tag) {
        var imageData = [];

        var images = [];

        var imageTag = tag;
        var params = {
            tag: imageTag
        };

        var updateAll = function () {
            return imageResource().then(function (results) {
                console.log('getting all images');
                imageData = results.resources;
                $rootScope.photos = results.resources;
                angular.forEach(results.resources, function (value, key) {

                    images.push(value.public_id);
                });
                console.log('imageData = ' + imageData);
            });
        };

        var updateByTag = function (imageTag) {
            Images.get({tag: tag}, function (results) {
                console.log('getting images by tag ' + params.tag);
                imageData = results.resources;
                $rootScope.photos = results.resources;
                angular.forEach(imageData, function (value, key) {
                    console.log('key: ' + key);
                    console.log('value: ' + value);
                    images.push({key: key, value: value});
                });
                //console.log('imageData = '+imageData);
                //console.log('publicIds = '+publicIds);
                getImageDetails();
            });
        };
        $rootScope.imageDetails = [];
        var getImageDetails = function () {
            console.log('GETTING IMAGE DETAILS!');
            angular.forEach(images, function (val) {
                console.log('key: ' + val.key);
                console.log('val: ' + val.value);
                var model = imageModel(val);
                $rootScope.imageDetails.push(model);
                console.log(model);
            });
        };

        var updateData = function () {
            if (typeof tag == 'undefined') {
                updateAll();
            } else {
                updateByTag(tag);
            }
        };
        updateData();

        var getData = function () {
            return imageData;
        };

        var getDBImages = function () {
            var AllImages = $resource('/api/photo');
            AllImages.get(function (results) {
                console.log('results = ' + results);
            });
        };
        getDBImages();

        return {
            getData: getData,
            getDBImages: getDBImages
        };


    };
});


