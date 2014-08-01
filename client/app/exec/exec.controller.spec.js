'use strict';

describe('Controller: ExecCtrl', function () {

    // load the controller's module
    beforeEach(module('umichAdpiApp'));

    var ExecCtrl, scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        ExecCtrl = $controller('ExecCtrl', {
            $scope: scope
        });
    }));

    it('should ...', function () {
        expect(1).toEqual(1);
    });
});
