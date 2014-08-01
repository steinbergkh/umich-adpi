'use strict';

describe('Directive: filterButton', function () {

    // load the directive's module and view
    beforeEach(module('umichAdpiApp'));
    beforeEach(module('components/filterButton/filterButton.html'));

    var element, scope;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));

    it('should make hidden element visible', inject(function ($compile) {
        element = angular.element('<filter-button></filter-button>');
        element = $compile(element)(scope);
        scope.$apply();
        expect(element.text()).toBe('this is the filterButton directive');
    }));
});