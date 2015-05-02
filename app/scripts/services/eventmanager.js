'use strict';

/**
 * @ngdoc service
 * @name schedulerApp.slotAllocator
 * @description
 * # slotAllocator
 * Service in the schedulerApp.
 */
angular.module('schedulerApp')
  .service('eventManager', function(utilities) {

    var eventStart = function(startingOffset, appliedOffset) {

      // reset the object to start at 9am
      var startPoint = new Date();
      startPoint.setHours(startingOffset);
      startPoint.setMinutes(0);
      startPoint.setSeconds(0);

      // now increment time via passed minutes
      startPoint.setMinutes(appliedOffset);
      return startPoint;
    };

    // partially applied function generator
    // binding first argument
    function bindFirstArg(fn, a) {
      return function(b) {
        return fn(a, b);
      };
    }

    // this.timeGenerator = function(Base, offset) {
    //   var startsAt = new Date();
    //   startsAt.setMinutes(offset);
    //   return startsAt;
    // };

    /**
     * @param {Number} takes a number specifying the minutes elapsed since start
     */
    var getTime = bindFirstArg(eventStart, 9);

    this.eventRegistry = [];

    this.createSlots = function(config) {
      // set up the hour axis and the calendar (event registry) model

      var slots = [],
        i = 0;
      for (i; i < config.dayLength; i++) {

        slots.push({time: config.dayBase + i});

        this.eventRegistry.push({
          bookings: []
        });
      }

      return slots;
    };

    this.addEvent = function(event) {

      var _this = this;

      utilities.colorTrace('creating event... ', 'green');

      // Get start time
      event.startTime = moment(getTime(event.start)).format('h:mma');

      window.someTime = getTime(event.start);

      // get end time
      event.endTime = moment(getTime(event.end)).format('h:mma');

      // Add a field to the object detailing which slots it touches
      event.affectedSlots = utilities.getAffectedSlots(event.start, event.end);

      // make a calc layout call to see if it needs a left offset
      event.offset = this.calcOffset(event);

      // apply the event's duration
      event.duration = event.end - event.start;

      // apply the event's height
      event.height = event.duration + 'px';

      // apply the event's offsetTop
      event.offsetTop = event.start + 'px';

      // loop over the slots each object touches and push the event to that slot's bookings array
      event.affectedSlots.forEach(function(index) {
        _this.eventRegistry[index].bookings.push(event);
      });
    };

    this.removeEvent = function() {
      // @TODO add a remove event method
      console.log('removing event');
    };

    /**
     * @param {Object} an event object from which we pull the slots it touches
     * and use them to query the eventRegistry object to see if any given slot it touches
     * has a booking and if so return an offset number based upon the number of event scheduled
     * in the slot with the maximum number of bookings
     */
    this.calcOffset = function(event) {
      var _this = this,
        affectedSlotsLengthValues = [];

      event.affectedSlots.forEach(function(index) {
        affectedSlotsLengthValues.push(_this.eventRegistry[index].bookings.length);
      });

      return utilities.getBiggestNumber(affectedSlotsLengthValues);

    };

    /**
     * @param {Object} an event object from which we pull the slots it touches
     * and use them to query the eventRegistry object to see if any given slot it touches
     * has a booking and if so return an offset number based upon the number of event scheduled
     * in the slot with the maximum number of bookings
     */
    this.calcLayout = function(events) {
      var _this = this,
        eventLayouts = [];

      // // iterate each slot..
      events.forEach(function(event) {

        // iterate each slot's bookings - object,indices, key.
        // Of all of the slots that this event touches, return the maximum
        // number of events that a given slot that this objects touches contains
        event.width = (100 / utilities.getLongestFromSlots(_this.eventRegistry, event.affectedSlots, 'bookings')) + '%';
        event.overlaps = _this.calcOffset(event);
        event.offsetLeft = (100 / event.overlaps) * event.offset + '%';
        eventLayouts.push(event);

      });

      return eventLayouts;

    };
  });
