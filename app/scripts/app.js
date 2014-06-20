'use strict';

angular.module('umichAdpiApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
    'cloudinary'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      }).when('/photos', {
            templateUrl: 'partials/photo-list.html',
            resolve: {
                photoList: function($q, $rootScope, album) {
                    if (!$rootScope.serviceCalled) {
                        return album.photos({}, function(v){
                            $rootScope.serviceCalled = true;
                            $rootScope.photos = v.resources;
                        });
                    } else {
                        return $q.when(true);
                    }
                }
            }
        }).
        when('/photos/new', {
            templateUrl: 'partials/photo-upload.html',
            controller: 'photoUploadCtrl'
        })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
  });