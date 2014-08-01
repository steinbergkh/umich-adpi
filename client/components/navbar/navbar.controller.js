'use strict';

angular.module('umichAdpiApp')
    .controller('NavbarCtrl', function ($scope, $location, Auth) {
        $scope.menu = [
            {
                'title': 'Home',
                'link': '/'
            },
            {
                'title': 'About Us',
                'link': '/about-us'
            },
            {
                'title': 'Recruitment',
                'link': '/recruitment'
            },
            {
                'title': 'Philanthropy',
                'link': '/philanthropy'
            },
            {
                'title': 'Campus Involvement',
                'link': '/involvement'
            },
            {
                'title': 'Executive Board',
                'link': '/exec'
            },
            {
                'title': 'Photo Gallery',
                'link': '/gallery'
            },
            {
                'title': 'Contact Us',
                'link': '/contact'
            }
        ];

        $scope.isCollapsed = true;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.logout = function () {
            Auth.logout();
            $location.path('/login');
        };

        $scope.isActive = function (route) {
            return route === $location.path();
        };
    });