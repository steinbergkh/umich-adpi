'use strict';

angular.module('umichAdpiApp').directive('filterButton', function ($rootScope) {
    return {
        restrict: 'EA', // E = element (<filter-button), A = attribute (<div filter-button)
        scope: {
            title: '@' /* this means that using {{title}} in the collapse-filter-template.html will use
             the string value (because of the '@') from the title attribute of the tag */
        },
        templateUrl: 'components/filterButton/filterButton.html',
        link: function ($scope) {
            $scope.active = false;
            $scope.toggleState = function (tagTitle) {
                $scope.active = !$scope.active;
                if ($scope.active) {
                    console.log('made active! ' + tagTitle);
                    $rootScope.filterTags.push(tagTitle);
                } else {
                    console.log('made unactive! ' + tagTitle);
                    $rootScope.filterTags.splice($rootScope.filterTags.indexOf(tagTitle), 1);
                }
            };
        }
    };
});