'use strict';

/**
 * @ngdoc overview
 * @name suAngularApp
 * @description
 * # suAngularApp
 *
 * Main module of the application.
 */
angular
  .module('suAngularApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngStorage'
  ])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/current/:cityID', {
        templateUrl: 'views/current.html',
        controller: 'CurrentCtrl',
        controllerAs: 'current'
      })
      .when('/forecast/:cityID', {
        templateUrl: 'views/forecast.html',
        controller: 'ForecastCtrl',
        controllerAs: 'forecast'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name suAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the suAngularApp
 */
angular.module('suAngularApp')
  .controller('MainCtrl', ["$scope", "current", "citysearch", "$localStorage", function ($scope, current, citysearch, $localStorage) {
 //  	$scope.location = 'Seattle';
 //  	$scope.current = current.get({location: $scope.location});

 //  	$scope.refreshCurrent = function() {
 //  		$scope.current = current.get({
	// 		location: $scope.location
	// 	});
	// };

	$scope.citiesFound = citysearch.get();
	$scope.storage = $localStorage;

	$scope.findCities = function() {
		$scope.citiesFound = citysearch.get({
			location: $scope.location
		});
		$scope.searchQuery = $scope.location;
	};

	$scope.currentWeather = current.get({
		cityID: 1234567
	});

  }]);
'use strict';

/**
 * @ngdoc function
 * @name suAngularApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the suAngularApp
 */
angular.module('suAngularApp')
  .controller('AboutCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

'use strict';

/**
 * @ngdoc service
 * @name suAngularApp.current
 * @description
 * # current
 * Factory in the suAngularApp.
 */
angular.module('suAngularApp')
  .factory('current', ["$resource", function ($resource) {
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
  }]);
'use strict';

/**
 * @ngdoc service
 * @name suAngularApp.citysearch
 * @description
 * # citysearch
 * Factory in the suAngularApp.
 */
angular.module('suAngularApp')
  .factory('citysearch', ["$resource", function ($resource) {
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
  }]);
'use strict';

/**
 * @ngdoc function
 * @name suAngularApp.controller:CurrentCtrl
 * @description
 * # CurrentCtrl
 * Controller of the suAngularApp
 */
angular.module('suAngularApp')
  .controller('CurrentCtrl', ["$scope", "$routeParams", "current", "$localStorage", function ($scope, $routeParams, current, $localStorage) {
    
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

  }]);
'use strict';

/**
 * @ngdoc function
 * @name suAngularApp.controller:ForecastCtrl
 * @description
 * # ForecastCtrl
 * Controller of the suAngularApp
 */
angular.module('suAngularApp')
  .controller('ForecastCtrl', ["$scope", "$routeParams", "forecast", function ($scope, $routeParams, forecast) {

  	$scope.cityID = $routeParams.cityID;

  	$scope.forecastData = forecast.get({
  		cityID: $routeParams.cityID
  	});

  }]);

'use strict';

/**
 * @ngdoc service
 * @name suAngularApp.forecast
 * @description
 * # forecast
 * Factory in the suAngularApp.
 */
angular.module('suAngularApp')
  .factory('forecast', ["$resource", function ($resource) {
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

  }]);

angular.module('suAngularApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/about.html',
    "<p>This is the about view.</p> <p>Here, I'm adding some new stuff!</p> <div ng-app ng-init=\"firstnum=1;secondnum=2\"> <input type=\"number\" min=\"0\" ng-model=\"firstnum\"> plus <input type=\"number\" min=\"0\" ng-model=\"secondnum\"> equals <b>{{firstnum + secondnum}}</b> </div>"
  );


  $templateCache.put('views/current.html',
    "<h1>Current Weather for {{currentWeather.name}}</h1> <div ng-messages=\"citySaved\"> <p class=\"city-saved-alert bg-success text-success\" ng-message=\"success\"> {{currentWeather.name}} has been saved to your list of cities. </p> <p class=\"city-saved-alert bg-warning text-warning\" ng-message=\"duplicate\"> {{currentWeather.name}} has already been saved to your list of cities. </p> </div> <dl> <dt>Currently</dt> <dd>{{currentWeather.weather[0].main}}</dd> <dd>{{currentWeather.weather[0].description}}</dd> <dt>Temperature</dt> <dd>{{currentWeather.main.temp}} &deg;F</dd> <dt>Wind</dt> <dd>{{currentWeather.wind.speed}} mph at {{currentWeather.wind.deg}} &deg;</dd> <dt>Clouds</dt> <dd>{{currentWeather.clouds.all}}%</dd> </dl> <p><button class=\"btn btn-sm btn-primary\" ng-click=\"saveCity(currentWeather)\">Save City</button></p> <p><a ng-href=\"/#/forecast/{{cityID}}\" class=\"btn btn-lg btn-primary\">View 16-day Forecast</a></p>"
  );


  $templateCache.put('views/forecast.html',
    "<h1>16-day Forecast for {{forecastData.city.name}} {{forecastData.city.country}}</h1> <d1 ng-repeat=\"prediction in forecastData.list\" class=\"weather-forecast\"> <dt>Forecast for {{prediction.dt*1000 | date:\"MMM dd, yyyy\"}}</dt> <dd>{{prediction.weather[0].main}}</dd> <dd>{{prediction.weather[0].description}}</dd> <dt>Temperature</dt> <dd>Min: {{prediction.temp.min}} &deg;F Max: {{prediction.temp.max}} &deg;F</dd> </d1> <p><a ng-href=\"/#/current/{{cityID}}\" class=\"btn btn-lg btn-primary\">View Current Weather</a></p>"
  );


  $templateCache.put('views/main.html',
    "<div ng-app class=\"jumbotron\" ng-controller=\"MainCtrl\"> <h1>Select Your City</h1> <p class=\"lead\"> <!-- <img src=\"images/yeoman.png\" alt=\"I'm Yeoman\"><br>\n" +
    "    Always a pleasure scaffolding your apps. --> <div ng-init=\"location='Seattle'\"> <p> <label for=\"location\">Location: <input type=\"text\" name=\"location\" ng-model=\"location\"> </label> </p> <!-- <p>\n" +
    "        <button class=\"btn btn-lg btn-primary\" ng-click=\"refreshCurrent()\">Get Current Weather</button>\n" +
    "      </p> --> <p> <button class=\"btn btn-lg btn-primary\" ng-click=\"findCities()\">Find City</button> </p> </div> <div ng-if=\"searchQuery\"> <!-- <dl>\n" +
    "        <dt>Currently</dt>\n" +
    "        <dd>{{current.weather[0].main}}</dd>\n" +
    "        <dd>{{current.weather[0].description}}</dd>\n" +
    "        <dt>Temperature</dt>\n" +
    "        <dd>{{current.main.temp}}</dd>\n" +
    "        <dt>Wind</dt>\n" +
    "        <dd>{{current.wind.speed}} mph at {{current.wind.deg}} degrees</dd> <dt>Clouds</dt>\n" +
    "        <dd>{{current.clouds.all}}%</dd>\n" +
    "      </dl> --> <p class=\"lead\">{{citiesFound.count}} cities found matching the query: {{searchQuery}}.</p> <dl ng-repeat=\"city in citiesFound.list\"> <dt>{{city.name}}, {{city.sys.country}}</dt> <dd>{{city.weather[0].main}} - {{city.weather[0].description}}</dd> <dt>Temperature</dt> <dd>{{city.main.temp}} &deg;F</dd> <dd><a ng-href=\"/#/current/{{city.id}}\" class=\"btn btn-lg btn-primary\">View Weather</a></dd> </dl> </div> <div ng-if=\"storage.savedCities\"> <h2>Saved Cities</h2> <ul class=\"saved-cities-list\"> <li ng-repeat=\"city in storage.savedCities\"> <a ng-href=\"/#/current/{{city.id}}\" class=\"btn btn-lg btn-primary\">{{city.name}}</a> </li> </ul> </div> </p> <!-- <p><a class=\"btn btn-lg btn-success\" ng-href=\"#/\">Splendid!<span class=\"glyphicon glyphicon-ok\"></span></a></p> --> </div> <!-- <div class=\"row marketing\">\n" +
    "  <h4>HTML5 Boilerplate</h4>\n" +
    "  <p>\n" +
    "    HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.\n" +
    "  </p>\n" +
    "\n" +
    "  <h4>Angular</h4>\n" +
    "  <p>\n" +
    "    AngularJS is a toolset for building the framework most suited to your application development.\n" +
    "  </p>\n" +
    "\n" +
    "  <h4>Karma</h4>\n" +
    "  <p>Spectacular Test Runner for JavaScript.</p>\n" +
    "</div>\n" +
    " -->"
  );

}]);
