'use strict';

/**
 * @ngdoc function
 * @name suAngularApp.controller:ForecastCtrl
 * @description
 * # ForecastCtrl
 * Controller of the suAngularApp
 */
angular.module('suAngularApp')
  .controller('ForecastCtrl', function ($scope, $routeParams, forecast) {

  	$scope.cityID = $routeParams.cityID;

  	$scope.forecastData = forecast.get({
  		cityID: $routeParams.cityID
  	});

  });
