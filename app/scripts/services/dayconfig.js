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
    this.defs = {
      dayLength: 9,
      dayBase: 9
    };

  });
