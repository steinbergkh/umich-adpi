'use strict';

angular.module('umichAdpiApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('involvement', {
                url: '/involvement',
                templateUrl: 'app/involvement/involvement.html',
                controller: 'InvolvementCtrl'
            });
    });