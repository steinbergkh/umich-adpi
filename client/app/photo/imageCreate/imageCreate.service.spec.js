'use strict';

describe('Service: imageCreate', function () {

    // load the service's module
    beforeEach(module('umichAdpiApp'));

    // instantiate service
    var imageCreate;
    beforeEach(inject(function (_imageCreate_) {
        imageCreate = _imageCreate_;
    }));

    it('should do something', function () {
        expect(!!imageCreate).toBe(true);
    });

});
