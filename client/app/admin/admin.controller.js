'use strict';

angular.module('umichAdpiApp')
    .controller('AdminCtrl', function ($scope, $http, Auth, User, $rootScope) {

        $http.get('/api/users').success(function (users) {
            $scope.users = users;
        });

        $rootScope.dashTitle = "Admin Home";

        $scope.delete = function (user) {
            User.remove({ id: user._id });
            angular.forEach($scope.users, function (u, i) {
                if (u === user) {
                    $scope.users.splice(i, 1);
                }
            });
        };
    });
