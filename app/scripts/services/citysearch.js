'use strict';

/**
 * @ngdoc service
 * @name suAngularApp.citysearch
 * @description
 * # citysearch
 * Factory in the suAngularApp.
 */
angular.module('suAngularApp')
  .factory('citysearch', function ($resource) {
    // Service logic
    // ...

    // Public API here
    return $resource("http://api.openweathermap.org/data/2.5/find?q=:location&type=like&mode=json&APPID=142a34471cec46c99800c3a11b7d7e0c", {
      get: {
        method:'GET',
        params: {
          location: 'Seattle'
        }
      }
    });
  });