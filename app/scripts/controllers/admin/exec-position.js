'use strict';

angular.module('umichAdpiApp')
    .controller('ExecPositionController', function ($scope, $http) {
        $http.get('/api/awesomeThings').success(function (awesomeThings) {
            $scope.execPositions = awesomeThings;
        });
    });
