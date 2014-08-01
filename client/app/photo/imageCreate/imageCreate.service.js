'use strict';

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