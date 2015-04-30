'use strict';

describe('Service: ScheduleCreator', function () {

  // load the service's module
  beforeEach(module('schedulerApp'));

  // instantiate service
  var ScheduleCreator;
  beforeEach(inject(function (_ScheduleCreator_) {
    ScheduleCreator = _ScheduleCreator_;
  }));

  it('should do something', function () {
    expect(!!ScheduleCreator).toBe(true);
  });

});
