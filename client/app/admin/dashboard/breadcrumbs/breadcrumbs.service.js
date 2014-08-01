'use strict';

angular.module('umichAdpiApp').factory('BreadcrumbService', function () {
    var service = {};
    service.breadcrumbs = [
        {
            name: 'Integrative Systems + Design',
            nameShort: 'ISD',
            link: '#/admin'
        }
    ];

    service.addBreadcrumb = function (crumbName, crumbLink, crumbNameShort) {
        if (typeof(crumbNameShort) === 'undefined') {
            // no short name was entered, always use long name
            crumbNameShort = '';
        }

        if (typeof(crumbName) === 'undefined') {
            // no name for the new breadcrumb was entered
            console.log('no breadcrumb name was entered - breadcrumb will not be added');
        }
        else {  // create the new breadcrumb and add it
            var newBreadcrumb = {
                name: crumbName,
                link: crumbLink,
                nameShort: crumbNameShort
            };
            service.breadcrumbs.push(newBreadcrumb);
        }
    };

    service.getBreadcrumbs = function () {
        var formattedBreadcrumbs = [];

        angular.forEach(service.breadcrumbs, function (value, key) {
            var newBreadcrumb = {
                link: value.link
            };

            /* use short name if it exists and it is not the current page */
            if ((value.nameShort.length > 0) && (key < (service.breadcrumbs.length - 1) )) {
                newBreadcrumb.name = value.nameShort;
            }
            else {
                newBreadcrumb.name = value.name;
            }

            this.push(newBreadcrumb);
        }, formattedBreadcrumbs);
        return formattedBreadcrumbs;
    };

    service.removeBreadcrumb = function (index, howMany) {
        if (typeof(howMany) === 'undefined') {
            // didn't specify how many to remove, assume 1
            howMany = 1;
        }

        if (typeof(index) === 'undefined') {
            // no index was entered, assume last item
            index = -1;
        }
        service.breadcrumbs.splice(index, howMany);
    };

    /* click on breadcrumb, and all crumbs after it are removed */
    service.navigateTo = function (index) {
        index++;
        var length = service.breadcrumbs.length;
        var numVictims = length - index;
        service.breadcrumbs.splice(index, numVictims);
    };
    return service;

});
