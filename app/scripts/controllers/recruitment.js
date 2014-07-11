'use strict';

angular.module('umichAdpiApp')
    .controller('RecruitmentController', function ($scope, $http) {
        $http.get('/api/awesomeThings').success(function (awesomeThings) {
            $scope.awesomeThings = awesomeThings;
        });
    });
