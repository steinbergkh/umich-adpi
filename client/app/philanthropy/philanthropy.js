'use strict';

angular.module('umichAdpiApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('philanthropy', {
                url: '/philanthropy',
                templateUrl: 'app/philanthropy/philanthropy.html',
                controller: 'PhilanthropyCtrl'
            });
    });