'use strict';

describe('Controller: InvolvementCtrl', function () {

    // load the controller's module
    beforeEach(module('umichAdpiApp'));

    var InvolvementCtrl, scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        InvolvementCtrl = $controller('InvolvementCtrl', {
            $scope: scope
        });
    }));

    it('should ...', function () {
        expect(1).toEqual(1);
    });
});
