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

        // add the event to the registry
        $scope.eventManager.addEvent(event);

        // create new booking object and add it to the schedule
        var schedule = new Schedule(event)
          .getDuration();
        $scope.scheduledItems.push(schedule);

      });

      // plot the layouts
      $scope.eventManager.reCalcLayout($scope.scheduledItems);
      console.log('scheduledItems is now: ', $scope.scheduledItems);

      // re-digest the UI
      $scope.$digest();
    };

  });
