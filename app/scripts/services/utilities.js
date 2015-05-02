'use strict';

/**
* @ngdoc service
* @name schedulerApp.utilities
* @description
* # utilities
* Service in the schedulerApp.
*/
angular.module('schedulerApp')
.service('utilities', function() {

  /**
  * @param {number} a number to be divided by 60 and rounded up to return an hour slot
  */
  var convertToSlot = function(num) {
    return Math.ceil(num / 60);
  };

  /**
  * @param {number} a number representing the start point
  * @param {number} a number representing the end point
  */
  this.getAffectedSlots = function(start, end) {
    var affectedSlots = [];
    start = convertToSlot(start);
    end = convertToSlot(end);

    for (start; start <= end; start++) {
      affectedSlots.push(start);
    }

    return affectedSlots;
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

  /**
  * @param {Array} an Array of numbers from which the greatest will be returned
  */
  this.getBiggestNumber = function(arr) {
    var biggestNumber = Math.max.apply(Math, arr);
    return biggestNumber;
  };

  this.colorTrace = function(msg, color) {
    console.log('%c' + msg, 'color:' + color + ';font-weight:bold;');
  };

});
