'use strict';

describe('Filter: timeSuffix', function () {

  // load the filter's module
  beforeEach(module('schedulerApp'));

  // initialize a new instance of the filter before each test
  var timeSuffix;
  beforeEach(inject(function ($filter) {
    timeSuffix = $filter('timeSuffix');
  }));

  it('should return the input prefixed with "timeSuffix filter:"', function () {
    var text = 'angularjs';
    expect(timeSuffix(text)).toBe('timeSuffix filter: ' + text);
  });

});
