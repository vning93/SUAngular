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
