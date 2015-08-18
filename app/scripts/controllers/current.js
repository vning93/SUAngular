'use strict';

/**
 * @ngdoc function
 * @name suAngularApp.controller:CurrentCtrl
 * @description
 * # CurrentCtrl
 * Controller of the suAngularApp
 */
angular.module('suAngularApp')
  .controller('CurrentCtrl', function ($scope, $routeParams, current, $localStorage) {
    
  	$scope.cityID = $routeParams.cityID;

  	$scope.currentWeather = current.get({
  		cityID: $routeParams.cityID
  	});

  	$scope.saveCity = function(city) {
  		var cityData = {
  			'name': city.name,
  			'id': city.id
  		};
  		if (!$localStorage.savedCities) {
  			$localStorage.savedCities = [cityData];
  		}
  		else {
  			var save = true;

  			for (var i = 0; i < $localStorage.savedCities.length; i++) {
  				if ($localStorage.savedCities[i].id === cityData.id) {
  					save = false;
  				}
  			}

  			if (save === true) {
  				$localStorage.savedCities.push(cityData);

  				$scope.citySaved = {
  					'success': true
  				};
  			}
  			else {
  				console.log("City already saved.");

  				$scope.citySaved = {
  					'duplicate': true
  				};
  			}
  		}
  	};

  });