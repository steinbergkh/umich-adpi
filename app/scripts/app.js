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
            }).when('/about-us', {
                templateUrl: 'partials/about-us',
                controller: 'AboutUsController'
            }).when('/about', {
                redirectTo: '/about-us'
            }).when('/recruitment', {
                templateUrl: 'partials/recruitment',
                controller: 'RecruitmentController'
            }).when('/philanthropy', {
                templateUrl: 'partials/philanthropy',
                controller: 'PhilanthropyController'
            }).when('/involvement', {
                templateUrl: 'partials/campus-involvement',
                controller: 'CampusInvolvementController'
            }).when('/exec', {
                templateUrl: 'partials/exec-board',
                controller: 'ExecBoardController'
            }).when('/gallery', {
                templateUrl: 'partials/photo-gallery',
                controller: 'PhotoGalleryController'
            }).when('/contact', {
                templateUrl: 'partials/contact',
                controller: 'ContactUsController'
            }).when('/admin/exec', {
                templateUrl: 'partials/admin/exec-list',
                controller: 'ExecEditController'
            }).when('/admin/exec-position', {
                templateUrl: 'partials/admin/exec-position',
                controller: 'ExecPositionController'
            }).when('/photos', {
                templateUrl: 'partials/photo-list.html',
                controller: 'PhotoEditController'
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

angular.module('umichAdpiApp').factory('_', function () {
    var _ = window._;

    // adds functions to underscore.
    _.mixin({ mapValues: function (obj, val) {
        return _.object(_.keys(obj), _.map(obj, val));
    }});

    return _;
});

/**
 * Convenience method wrapping Angular's original $http
 * Returns an object with get and post method that accepts a param argument
 * The method returns a normal promise object.
 */
angular.module('umichAdpiApp').factory('adpiHttp', function ($http, $resource, _) {
    var resolveResp = function (resp) {
        if (resp.status === 200) {
            return resp.data;
        }
        return resp;
    };

    return function (url) {
        return {
            get: function (params, config) {
                params = params || {};
                console.log('params: ' + params);
                config = config || {};
                _.extend(config, {params: params});
                return $resource.get(url, params)
                    .then(resolveResp);
            },
            post: function (data, config) {
                return $http.post(url, data, config)
                    .then(resolveResp);
            }
        };
    };
});

angular.module('umichAdpiApp').factory('adpiResource', function ($http, $resource, _) {
    var resolveResp = function (resp) {
        if (resp.status === 200) {
            return resp.data;
        }
        return resp;
    };

    return function (resourceObject) {
        var resourceObj = resourceObject;
        return {
            get: function (params, config) {
                return resourceObj.get(params);
            },
            post: function (data, config) {
                return $http.post(url, data, config)
                    .then(resolveResp);
            }
        };
    };
});