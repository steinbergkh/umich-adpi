'use strict';
angular.module('umichAdpiApp').controller('SidebarController', function ($scope, $rootScope) {

    var sidebarAdpi = [
        {
            name: 'Website Homepage',
            link: '#/',
            state: 'main'
        },
        {
            name: 'Manage Photos',
            link: '#/admin/edit',
            state: 'admin.edit'
        },
        {
            name: 'Upload Photos',
            link: '#/admin/upload',
            state: 'admin.upload'
        },
        {
            name: 'Manage Users',
            link: '#/admin/users',
            state: 'admin.users'
        },
        {
            name: 'Website Style',
            link: '#/admin/style',
            state: 'admin.style'
        }
    ];

    $rootScope.currentViewSidebar = sidebarAdpi;
});
