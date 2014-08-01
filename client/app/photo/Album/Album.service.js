'use strict';

angular.module('umichAdpiApp').factory('imageModel', function ($rootScope, $resource, _) {

    var ImageCreate = $resource('/api/photos');
    var ImageFind = $resource('/api/photos/:id', {id: '@id'});
    var ImageUpdateTags = $resource('/api/photos/:id/tag', {id: '@id'});
    var ImageTag = $resource('/api/cloudinary/tag/:tag', {tag: '@tag'});

    return function (imageObj) {

        if (typeof(imageObj) === 'undefined') {
            //
        }
        var key = imageObj.key;
        var val = imageObj.value;

        var id = val.public_id;
        var url = val.url;
        var type = val.format;
        var tags = 'galleries_images,2014';

        var modelObj;

        var addTag = function (tag) {
            // Returns true if the value is present in the list
            if ((tag == "galleries_images") || (_.contains($rootScope.tagList, tag))) {

            } else {
                $rootScope.tagList.push(tag);
            }
        };
        var findImageCallback = function (results) {
            results = results.data;
            if (results != undefined && results.length > 0) {
                var imageJSON = $rootScope.photos[key];
                var imageDB = results[0];
                var tagsArray = imageDB.tags.split(',');
                imageDB.tags = [];
                var index;
                for (index = 0; index < tagsArray.length; ++index) {
                    addTag(tagsArray[index]);
                    imageDB.tags.push({"text": tagsArray[index]});
                }
                $rootScope.photos[key].tags = imageDB.tags;

                var modelObj = imageDB;
            }
            else {
                console.log('going to try to create one!');
                ImageCreate.save({cloudinaryId: id, url: url, tags: tags, gallery: true, approved: false, rhos: false}, function (results) {
                    console.log('created new image! ' + results);
                });
            }
        };


        var findImage = function (callback) {
            ImageFind.get({id: id}).$promise.then(callback);
        };

        var editImage = function (tags) {
            console.log(this);
            ImageUpdateTags.save({id: id}, tags).$promise.then(editImageCallback);
        };

        findImage(findImageCallback);

        return {
            getImage: findImage,
            editImage: editImage
        };


    };
});

angular.module('umichAdpiApp').factory('imageService', function ($resource, $q, $rootScope, adpiHttp) {
    var service = {};
    var ImageTag = $resource('/api/cloudinary/tag/:tag', {tag: '@tag'});

    service.getImages = adpiHttp('/api/photos');
    service.getImagesByTag = function (tag) {
        ImageTag.get({tag: tag}, function (results) {
            console.log('getImagesByTag function: ' + results);
            return results;
        });
    };

    return service;
});

angular.module('umichAdpiApp').factory('albumAPIService', function ($rootScope, $resource, imageService, imageModel) {
    var Images = $resource('/api/cloudinary/tag/:tag', {tag: '@tag'});
    var AllImages = $resource('/api/photos');

    return function (tag) {
        var imageData = [];

        var images = [];

        var imageTag = tag;
        var params = {
            tag: imageTag
        };

        $rootScope.tagList = [];

        var addTag = function (tag) {
            // Returns true if the value is present in the list
            if ((tag == "galleries_images") || (_.contains($rootScope.tagList, tag))) {

            } else {
                $rootScope.tagList.push(tag);
            }
        };

        var updateAll = function () {
            AllImages.get().$promise.then(function (results) {
                results = results.data;
                if (results != undefined && results.length > 0) {
                    imageData = results;
                    $rootScope.photos = results;
                    getImageDetails(results);
                }
            });
        };

        $rootScope.imageDetails = [];
        var getImageDetails = function (results) {
            imageData = results;
            angular.forEach(results, function (image, index) {

                var imageJSON = $rootScope.photos[index];
                var imageDB = image;
                var tagsArray = imageDB.tags.split(',');
                imageDB.tags = [];
                var i;
                for (i = 0; i < tagsArray.length; ++i) {
                    addTag(tagsArray[i]);
                    imageDB.tags.push({"text": tagsArray[i]});
                }
                $rootScope.photos[index].tags = imageDB.tags;

            });
        };

        var updateData = function () {
            updateAll();
        };

        updateData();

        var getData = function () {
            return imageData;
        };

        var getDBImages = function () {
            //var AllImages = $resource('/api/photos');
            AllImages.get().$promise.then(function (results) {
                $rootScope.photos = results.data;
                console.log('results = ' + results.data);
            });
        };

        return {
            getData: getData,
            getDBImages: getDBImages
        };


    };
});

angular.module('umichAdpiApp').factory('galleryAPIService', function ($rootScope, $resource, imageService, imageModel) {
    var AllImages = $resource('/api/photos/gallery');

    return function (tag) {
        var imageData = [];

        var images = [];

        var imageTag = tag;
        var params = {
            tag: imageTag
        };

        var updateAll = function () {
            AllImages.get(function (results) {
                console.log('getting images by tag ' + params.tag);
                imageData = results.resources;
                $rootScope.photos = results.resources;
                angular.forEach(imageData, function (value, key) {
                    images.push({key: key, value: value});
                });
                getImageDetails();
            });
        };
        $rootScope.imageDetails = [];
        var getImageDetails = function () {
            angular.forEach(images, function (val) {
                var model = imageModel(val);
                $rootScope.imageDetails.push(model);
            });
        };

        var updateData = function () {
            updateAll();
        };
        updateData();

        var getData = function () {
            return imageData;
        };

        var getDBImages = function () {
            var AllImages = $resource('/api/photos');
            AllImages.get(function (results) {
                console.log('results = ' + results);
            });
        };
        //getDBImages();

        return {
            getData: getData,
            getDBImages: getDBImages
        };


    };
});