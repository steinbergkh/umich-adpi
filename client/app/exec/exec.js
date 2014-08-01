'use strict';

angular.module('umichAdpiApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('exec', {
                url: '/exec',
                templateUrl: 'app/exec/exec.html',
                controller: 'ExecCtrl'
            });
    });