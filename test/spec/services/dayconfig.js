'use strict';

describe('Service: dayConfig', function () {

  // load the service's module
  beforeEach(module('schedulerApp'));

  // instantiate service
  var dayConfig;
  beforeEach(inject(function (_dayConfig_) {
    dayConfig = _dayConfig_;
  }));

  it('should do something', function () {
    expect(!!dayConfig).toBe(true);
  });

});
