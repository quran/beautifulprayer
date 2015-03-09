'use strict';

/**
 * @ngdoc overview
 * @name beautifulprayerApp
 * @description
 * # beautifulprayerApp
 *
 * Main module of the application.
 */
angular
  .module('beautifulprayerApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngCookies',
    'ngPrayTimes'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/api', {
        templateUrl: 'views/api.html',
        controller: 'ApiCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function (prayTimes){
    console.log(new prayTimes("ISNA").getTimes(new Date(), [43.5944, -79.6935], -5)  )
  })
