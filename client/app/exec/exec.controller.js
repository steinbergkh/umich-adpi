'use strict';

angular.module('umichAdpiApp').controller('ExecCtrl', function ($scope, $rootScope, ExecBoardService) {
    var ExecBoardResource = ExecBoardService.execBoard;
    /*$scope.getExecBoard = function() {
     return ExecBoardResource.get().then(function(results) {
     $scope.execBoard = results;
     });
     };
     $scope.getExecBoard();
     */
    ExecBoardResource.get(function (results) {
        $scope.execBoard = results.results;
        console.log(results);
        console.log($scope.execBoard);
    });


});
