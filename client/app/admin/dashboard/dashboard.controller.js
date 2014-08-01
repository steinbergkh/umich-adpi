'use strict';
angular.module('umichAdpiApp').controller('DashboardController', function ($scope, $rootScope, snapRemote) {

    /* --- SIDEBAR SNAPPER --- */

    $scope.opts = {
        disable: 'right',
        hyperextensible: false,
        addBodyClasses: true,
        maxPosition: 265,
        minPosition: -265,
        tapToClose: false,
        touchToDrag: false
    };

    /* - snapRemote github.com/jtrussell/angular-snap.js#snapremote - */
    // automatically open sidebar on page load
    snapRemote.open('left');

    /* --- END SIDEBAR SNAPPER --- */


    $rootScope.sidebarButtons = ['Manage Photos', 'Upload Photos', 'Manage Users', 'Website Styling'];

    $scope.user = {
        name: 'User Name',
        title: 'User Title'
    };


});
