'use strict';

angular.module('umichAdpiApp').filter('variable', function () {
    return function (input) {
        return input.lowercase().replace(' & ', '-').replace(' ', '-');
    };
});