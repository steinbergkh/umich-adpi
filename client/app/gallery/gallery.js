'use strict';

angular.module('umichAdpiApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('gallery', {
                url: '/gallery',
                templateUrl: 'app/gallery/gallery.html',
                controller: 'GalleryCtrl'
            });
    });