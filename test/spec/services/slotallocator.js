'use strict';

describe('Service: slotAllocator', function () {

  // load the service's module
  beforeEach(module('schedulerApp'));

  // instantiate service
  var slotAllocator;
  beforeEach(inject(function (_slotAllocator_) {
    slotAllocator = _slotAllocator_;
  }));

  it('should do something', function () {
    expect(!!slotAllocator).toBe(true);
  });

});
