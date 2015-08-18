'use strict';

/**
 * @ngdoc service
 * @name suAngularApp.forecast
 * @description
 * # forecast
 * Factory in the suAngularApp.
 */
angular.module('suAngularApp')
  .factory('forecast', function ($resource) {
    // Service logic
    // ...

    return $resource("http://api.openweathermap.org/data/2.5/forecast/daily?id=:cityID&cnt=16&units=imperial&APPID=142a34471cec46c99800c3a11b7d7e0c", {
      get: {
        method: 'GET',
        params: {
          cityID: '4717560'
        }
      }
    });

  });
