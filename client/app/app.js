'use strict';

angular.module('umichAdpiApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.bootstrap',
    'ui.router',
    'cloudinary',
    'ngTagsInput',
    'wu.masonry',
    'snap'
])
    .config(function ($sceDelegateProvider, $stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            'http://res.cloudinary.com/**'
        ]);
        $urlRouterProvider
            .otherwise('/');
        $stateProvider.state('admin', {
            templateUrl: 'app/admin/admin-dashboard.html',
            controller: 'AdminCtrl',
            url: '/admin'
        });

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');
    })

    .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};
                if ($cookieStore.get('token')) {
                    config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                }
                return config;
            },

            // Intercept 401s and redirect you to login
            responseError: function (response) {
                if (response.status === 401) {
                    $location.path('/login');
                    // remove any stale tokens
                    $cookieStore.remove('token');
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }
        };
    })

    .run(function ($rootScope, $location, Auth) {
        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$stateChangeStart', function (event, next) {
            if (next.authenticate && !Auth.isLoggedIn()) {
                $location.path('/login');
            }
        });
    });

$.cloudinary.config().cloud_name = 'umich-adpi';
$.cloudinary.config().upload_preset = 'qhjuofh5';

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