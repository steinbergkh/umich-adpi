angular.module('umichAdpiApp').factory('ExecBoardService', function ($rootScope, $resource) {

    var service = {};
    service.execBoard = $resource('/api/exec-board');

    return service;
});