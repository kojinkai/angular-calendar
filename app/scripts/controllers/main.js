'use strict';

/**
 * @ngdoc function
 * @name schedulerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the schedulerApp
 */
angular.module('schedulerApp')
  .controller('MainCtrl', function($scope, eventAllocator, ScheduleCreator, dayConfig) {
    var Schedule = ScheduleCreator;

    var createSlots = function(config) {
      var slots = [],
        i = 0;
      for (i; i < config.dayLength; i++) {
        slots.push({time: config.dayStart + i});
      }
      return slots;
    };

    $scope.scheduledItems = [];

    $scope.workingHours = createSlots(dayConfig);

    $scope.eventAllocator = eventAllocator;

    window.renderDay = function(schedule) {
      schedule.forEach(function(event) {

        var schedule = new Schedule(event).getDuration();
        $scope.scheduledItems.push(schedule);
      });

      $scope.$digest();
    };

  });
