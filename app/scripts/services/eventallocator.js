'use strict';

/**
 * @ngdoc service
 * @name schedulerApp.slotAllocator
 * @description
 * # slotAllocator
 * Service in the schedulerApp.
 */
angular.module('schedulerApp')
  .service('eventAllocator', function() {

    // return an hour of the calendar
    this.allocateEvent = function(num) {
      return Math.ceil(num / 60);
    };
  });
