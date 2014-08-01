'use strict';

angular.module('umichAdpiApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('admin.upload', {
                url: '/photo/upload',
                templateUrl: 'app/photo/upload/upload.html',
                controller: 'photoUploadCtrl'
            });
    });