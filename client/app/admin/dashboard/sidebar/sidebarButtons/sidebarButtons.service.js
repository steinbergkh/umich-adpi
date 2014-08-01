'use strict';

angular.module('umichAdpiApp').factory('sidebarButtons', function () {

    var sidebarAdpi = [
        {
            name: 'Manage Photos',
            link: '#/admin/photos',
            state: 'admin.photos'
        },
        {
            name: 'Programs',
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

    var currentButtons;

    // Public API here
    return {
        setISDButtons: function () {
            currentButtons = sidebarISD;
            return sidebarISD;
        },
        setProgramButtons: function () {
            currentButtons = sidebarProgram;
            return sidebarProgram;
        },
        isISD: function () {
            return currentButtons === sidebarISD;
        },
        isProgram: function () {
            return currentButtons === sidebarProgram;
        },
        getButtons: function () {
            return currentButtons;
        }

    };
});
