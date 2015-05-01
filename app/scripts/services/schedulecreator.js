'use strict';

/**
 * @ngdoc service
 * @name schedulerApp.ScheduleCreator
 * @description
 * # ScheduleCreator
 * Factory in the schedulerApp.
 */
angular.module('schedulerApp')
  .factory('ScheduleCreator', function() {
    // Service logic
    // ...

    var scheduledEvent = function(config) {
      this.start = config.start;
      this.end = config.end;
      this.name = config.name || 'New Event';
      this.offsetTop = config.start;
      this.horizontalSpan = null;
    };

    scheduledEvent.prototype.getDuration = function() {
      this.duration = this.end - this.start;
      return this;
    };

    scheduledEvent.prototype.getLayout = function(overlaps) {
      this.horizontalSpan = overlaps;
      return this;
    };

    return scheduledEvent;
  });
