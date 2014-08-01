'use strict';

describe('Controller: RecruitmentCtrl', function () {

    // load the controller's module
    beforeEach(module('umichAdpiApp'));

    var RecruitmentCtrl, scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        RecruitmentCtrl = $controller('RecruitmentCtrl', {
            $scope: scope
        });
    }));

    it('should ...', function () {
        expect(1).toEqual(1);
    });
});
