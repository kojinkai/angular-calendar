'use strict';

/**
 * @ngdoc function
 * @name schedulerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the schedulerApp
 */
angular.module('schedulerApp')
  .controller('MainCtrl', function($scope, eventManager, ScheduleCreator, dayConfig) {

    var Schedule = ScheduleCreator;

    $scope.scheduledItems = [];
    $scope.workingHours = eventManager.createSlots(dayConfig.defs);
    $scope.eventManager = eventManager;

    window.renderDay = function(schedule) {
      schedule.forEach(function(event) {

        // create new booking object and add it to the schedule
        var schedule = new Schedule(event);

        // add the event to the registry
        // @TODO make this into a promise, rather than calling two concurrent methods
        $scope.eventManager.addEvent(schedule);

        $scope.scheduledItems.push(schedule);

      });

      // plot the layouts
      $scope.scheduledItems = $scope.eventManager.calcLayout($scope.scheduledItems);

      // re-digest the UI
      $scope.$digest();

    };

  });
