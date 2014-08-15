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

angular.module('umichAdpiApp').filter('selectedTags', function () {
    return function (items, tags) {
        return items.filter(function (item) {
            if ((typeof tags == undefined) || (tags.length < 1)){
                return true;
            }
            for (var i in tags) {
                console.log(item.tagsString);
                console.log(i);
                if (item.tagsString.indexOf(tags[i]) != -1) {
                    return true;
                }
            }
            return false;

        });
    };
});