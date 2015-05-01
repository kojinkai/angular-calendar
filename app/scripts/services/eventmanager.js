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


    /**
     * @param {Array} target array containing objects
     * @param {Array} indices of above array containing values
     * @param {String} keys in objects containing numbers on a given object
     */
    this.getLongestFromSlots = function(arr, targets, key) {
      // accepts an array to iterate,
      // array indices to target,
      // object key to lookup inside those indices

      var highestValue = 0;
      targets.forEach(function(index) {
        if (arr[index][key].length > highestValue) {
          highestValue = arr[index][key].length;
        }
      });

      return highestValue;
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

      var _this = this;

      // Add a field to the object detailing which slots it touches
      event.affectedSlots = getAffectedSlots(event.start, event.end);

      // loop over the slots each object touches and push the event to that slot's bookings array
      event.affectedSlots.forEach(function(index) {
        _this.eventRegistry[index - 1].bookings.push(event);
      });

    };

    this.removeEvent = function() {
      console.log('removing event');
    };
    //
    // this.getScheduleConflicts = function(slot) {
    //   var slotLookupKey = convertToSlot(slot);
    //   return this.eventRegistry[slotLookupKey].bookings.length;
    // };

    this.reCalcLayout = function(events) {
      var _this = this,
        recalculatedEvents = [];

      // iterate each slot..
      events.forEach(function(event) {

        // iterate each slot's bookings - object,indices, key.
        // Of all of the slots that this event touches, return the maximum
        // number of events that a given slot that this objects touches contains
        event.widthFactor = _this.getLongestFromSlots(_this.eventRegistry, event.affectedSlots, 'bookings');
        recalculatedEvents.push(event);

      });

      return recalculatedEvents;
    };
  });
