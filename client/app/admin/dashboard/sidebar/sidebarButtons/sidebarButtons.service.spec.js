'use strict';

describe('Service: sidebarButtons', function () {

    // load the service's module
    beforeEach(module('posApp'));

    // instantiate service
    var sidebarButtons;
    beforeEach(inject(function (_sidebarButtons_) {
        sidebarButtons = _sidebarButtons_;
    }));

    it('should do something', function () {
        expect(!!sidebarButtons).toBe(true);
    });

});
