'use strict';

angular.module('umichAdpiApp').controller('GalleryCtrl', function ($rootScope, $scope, galleryAPIService) {
    var albumAPI = galleryAPIService();
    $rootScope.photos = albumAPI.getData();
    $rootScope.tagList = [];
    $rootScope.filterTags = [];
});
