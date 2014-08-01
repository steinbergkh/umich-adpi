'use strict';

angular.module('umichAdpiApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('admin.edit', {
                url: '/photo/edit',
                templateUrl: 'app/photo/edit/edit.html',
                controller: 'PhotoEditController'
            });
    });