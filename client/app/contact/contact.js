'use strict';

angular.module('umichAdpiApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('contact', {
                url: '/contact',
                templateUrl: 'app/contact/contact.html',
                controller: 'ContactCtrl'
            });
    });