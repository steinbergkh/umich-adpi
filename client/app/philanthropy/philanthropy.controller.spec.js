'use strict';

describe('Controller: PhilanthropyCtrl', function () {

    // load the controller's module
    beforeEach(module('umichAdpiApp'));

    var PhilanthropyCtrl, scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        PhilanthropyCtrl = $controller('PhilanthropyCtrl', {
            $scope: scope
        });
    }));

    it('should ...', function () {
        expect(1).toEqual(1);
    });
});
