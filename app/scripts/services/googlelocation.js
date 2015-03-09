'use strict';

/**
 * @ngdoc service
 * @name beautifulprayerApp.googleLocation
 * @description
 * # googleLocation
 * Factory in the beautifulprayerApp.
 */
var api_key = "&key=AIzaSyC-cXe4qFed7ER7hYdPQZkkN5b_qIC57Ks"

angular.module('beautifulprayerApp')
  .factory('googleLocation', function ($http) {
    // Service logic
    // ...
    // Public API here
    return {
      search: function (query) {
        var searchcityurl = "http://maps.googleapis.com/maps/api/geocode/json?address=" + query + "&sensor=false";
        var theUrl = encodeURI(searchcityurl);
        return $http.get(theUrl)
      }
    };
  });
