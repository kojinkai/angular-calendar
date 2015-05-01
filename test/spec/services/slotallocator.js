'use strict';

describe('Service: eventManager', function() {

  // load the service's module
  beforeEach(module('schedulerApp'));

  // instantiate service
  var slotAllocator;
  beforeEach(inject(function(_eventmanager_) {
    eventmanager = _eventmanager_;
  }));

  it('should do something', function() {
    expect(!!eventManager).toBe(true);
  });

});
