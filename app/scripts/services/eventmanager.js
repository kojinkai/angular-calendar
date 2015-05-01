'use strict';

/**
 * @ngdoc service
 * @name schedulerApp.slotAllocator
 * @description
 * # slotAllocator
 * Service in the schedulerApp.
 */
angular.module('schedulerApp')
  .service('eventManager', function() {

    // return an hour of the calendar
    var convertToSlot = function(num) {
      return Math.ceil(num / 60);
    };

    // return an array of slots that the
    // event touches
    var getAffectedSlots = function(start, end) {
      var affectedSlots = [];
      start = convertToSlot(start);
      end = convertToSlot(end);

      for (start; start <= end; start++) {
        affectedSlots.push(start);
      }

      return affectedSlots;
    };

    this.defs = {
      dayLength: 9,
      dayStart: 9
    };

    this.eventRegistry = [];

    this.createSlots = function(config) {
      // set up the hour axis and the calendar (event registry) model

      var slots = [],
        i = 0;
      for (i; i < config.dayLength; i++) {

        slots.push({time: config.dayStart + i});

        this.eventRegistry.push({
          slotId: i + 1,
          bookings: []
        });
      }

      console.log('event registry before: ', this.eventRegistry);
      return slots;
    };

    this.addEvent = function(event) {
      // push bookings to a slot's booking array

      var _this = this;

      getAffectedSlots(event.start, event.end).forEach(function(index) {
        _this.eventRegistry[index - 1].bookings.push(event);
      });
      console.log('event registry after: ', this.eventRegistry);
    };

    this.removeEvent = function() {
      console.log('removing event');
    };

    this.getScheduleConflicts = function(slot) {
      var slotLookupKey = convertToSlot(slot);
      return this.eventRegistry[slotLookupKey].bookings.length;
    };

    this.reCalcLayout = function(events) {
      events.forEach(function(event) {
        event.affectedSlots = getAffectedSlots(event.start, event.end);
      });
    };
  });
