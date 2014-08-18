'use strict';

angular.module('umichAdpiApp').controller('PhotoEditController', function ($scope, $rootScope, $resource, albumAPIService) {

    var albumAPI = albumAPIService();

    $scope.photoList = albumAPI.getData();
    var photos = albumAPI.getData();
    if (photos.length > 0) {
        $rootScope.photos = photos;
    }

    $rootScope.tagList = [];

    $rootScope.filterTags = [];

    $scope.tagOptions = [];

    var ImageUpdateTags = $resource('/api/photos/:id/tag', {id: '@id'}, {
        updateTags: {method: 'PUT'}
    });

    var ImageUpdateChecks = $resource('/api/photos/admin/:id', {id: '@id'}, {
        updateCheck: {method: 'PUT'}
    });

    var ImageDelete = $resource('/api/photos/:id', {id: '@id'}, {
        removeImage: {method: 'DELETE'}
    });

    var editImageCallback = function (results) {
        var resultsInit = results;

        if (results != undefined || results.length > 0) {
            console.log('well we got some stuff back! ' + results);
        }
        else {
            console.log('uh oh ' + resultsInit);
            ImageCreate.save({cloudinaryId: id, url: url, tags: tags}, function (results) {
                console.log('created new image! ' + results);
            });
        }
    };

    var deleteImageCallback = function (results) {
        var resultsInit = results;

        if (results != undefined || results.length > 0) {
            console.log('well we got some stuff back! ' + results);
        }
        else {
            console.log('uh oh ' + resultsInit);
        }
    };

    $scope.editImage = function (id, tags, photo) {
        var tagsArray = [];

        angular.forEach(tags, function (value, key) {
            this.push(value.text);
        }, tagsArray);

        console.log('going to edit image with id ' + id + ' and tags ' + tagsArray);
        ImageUpdateTags.updateTags({id: id}, {
            tags: tagsArray,
            gallery: photo.gallery,
            approved: photo.approved,
            rho: photo.rho
        }).$promise.then(editImageCallback);
    };

    $scope.checkbox = function (photo) {
        var id = photo.cloudinaryId
        console.log('going to edit image with id ' + id);

        var tagsArray = [];

        angular.forEach(photo.tags, function (value, key) {
            this.push(value.text);
        }, tagsArray);

        ImageUpdateChecks.updateCheck({id: id}, {
            gallery: photo.gallery,
            approved: photo.approved,
            rho: photo.rho,
            tags: tagsArray
        }).$promise.then(editImageCallback);mo
    };


    $scope.deleteImage = function (photo, id) {
        photo.deleted = true;
        console.log('going to delete image with id ' + id);
        ImageDelete.removeImage({id: id}).$promise.then(deleteImageCallback);
    };
});