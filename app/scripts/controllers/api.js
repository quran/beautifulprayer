'use strict';

/**
 * @ngdoc function
 * @name beautifulprayerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the beautifulprayerApp
 */
angular.module('beautifulprayerApp')
  .controller('ApiCtrl', function ($scope, $routeParams, prayTimes) {
    /**
     * Allow params:
     * lat, lng, date, from, to, dst, hanafi, method
     */
    
    if(!$routeParams.lat || !$routeParams.lng || !$routeParams.method){
    	return {message: "Missing some methods"}
    }
    $scope.prayTimes = new prayTimes();

    console.log("asdjaksdjakshdk")
		
  });
