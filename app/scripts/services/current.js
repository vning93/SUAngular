'use strict';

/**
 * @ngdoc service
 * @name suAngularApp.current
 * @description
 * # current
 * Factory in the suAngularApp.
 */
angular.module('suAngularApp')
  .factory('current', function ($resource) {
    // Service logic
    // ...

    // var meaningOfLife = 42;

    // Public API here
    // return $resource('http://api.openweathermap.org/data/2.5/weather?q=:location&units=imperial&APPID=142a34471cec46c99800c3a11b7d7e0c', {
    //   get: {
    //     method:'GET',
    //     params: {
    //       location: 'Seattle,us'
    //     }
    //   }
    // });

    return $resource('http://api.openweathermap.org/data/2.5/weather?id=:cityID&units=imperial&APPID=142a34471cec46c99800c3a11b7d7e0c', {
      get: {
        method:'GET',
        params: {
          id: '4717560'
        }
      }
    });
  });