'use strict';

/**
 * @ngdoc service
 * @name schedulerApp.dayConfig
 * @description
 * # dayConfig
 * Service in the schedulerApp.
 */
angular.module('schedulerApp')
  .service('dayConfig', function() {
    this.dayLength = 9;
    this.dayStart = 9;
  });
