'use strict';

describe('Service: googleLocation', function () {

  // load the service's module
  beforeEach(module('beautifulprayerApp'));

  // instantiate service
  var googleLocation;
  beforeEach(inject(function (_googleLocation_) {
    googleLocation = _googleLocation_;
  }));

  it('should do something', function () {
    expect(!!googleLocation).toBe(true);
  });

});
