'use strict';

angular.module('umichAdpiApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('recruitment', {
                url: '/recruitment',
                templateUrl: 'app/recruitment/recruitment.html',
                controller: 'RecruitmentCtrl'
            });
    });