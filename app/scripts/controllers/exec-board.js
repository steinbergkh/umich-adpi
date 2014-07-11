'use strict';

angular.module('umichAdpiApp')
    .controller('ExecBoardController', function ($scope, $http) {
        $http.get('/api/exec').success(function (execBoard) {
            if (execBoard.length > 0) {
                console.log('yay we found some exec members!');
            }
            else {
                console.log('couldn\'t find any exec members!');
            }
            $scope.execBoard = execBoard;

        });
    });
