'use strict';

angular.module('umichAdpiApp').controller('ExecEditController', function ($scope, $http) {
    var schools = [
        'Architecture & Urban Planning',
        'Art & Design',
        'Business',
        'Dentistry',
        'Education',
        'Engineering',
        'Kinesiology',
        'Law',
        'Literature, Science & Arts',
        'Medicine',
        'Music, Theatre & Dance',
        'Natural Resources & Environment',
        'Nursing',
        'Pharmacy',
        'Public Health',
        'Public Policy',
        'Rackham School of Graduate Studies',
        'Social Work'
    ];
    $http.get('/api/exec/member').success(function (execBoard) {
        if (execBoard.length > 0) {
            console.log('yay we found some exec members!');
        }
        else {
            console.log('couldn\'t find any exec members!');
        }
        $scope.execBoard = execBoard;

    });
});
