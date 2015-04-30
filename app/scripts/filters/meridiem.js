'use strict';

/**
 * @ngdoc filter
 * @name schedulerApp.filter:timeSuffix
 * @function
 * @description
 * # timeSuffix
 * Filter in the schedulerApp.
 */
angular.module('schedulerApp')
  .filter('meridiem', function() {
    return function(input) {

      var num = parseInt(input);

      if (typeof num === 'number') {
        return num < 12 ? input + 'am' : input + 'pm';
      }
    };
  });
