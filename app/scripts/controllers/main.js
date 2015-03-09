'use strict';

/**
 * @ngdoc function
 * @name beautifulprayerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the beautifulprayerApp
 */

 // list of prayers
 var list = ['fajr', 'sunrise',  'dhuhr', 'asr', 'maghrib', 'isha'];

angular.module('beautifulprayerApp')
  .controller('MainCtrl', function ($scope, $http, $cookies, $cookieStore, googleLocation) {

    var location, prayers;

    // checking cookies
    if ($cookies.cookiedMethod || $cookies.asrMethod){
        $scope.methodSelected = $cookies.cookiedMethod.replace(/\"/g, "")

        $scope.hanafi = JSON.parse($cookies.asrMethod)
    }else{
        $scope.methodSelected = "MWL";
        $scope.hanafi = false;
    }
    freegeoip()
    checkFinishedLocation()

    function checkFinishedLocation(){
        setTimeout(function(){
            // console.log($scope.currentPrayer)
            if($scope.currentPrayer){
                getLocation()
            }else{
                checkFinishedLocation()
            }
                
        }, 100)
    }
    
    

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log( "Geolocation is not supported by this browser." );
        }
    }
    function showPosition(position) {
        var prayers = displayPrayers(position.coords.latitude, position.coords.longitude)
        // $scope.typedLocation =
        googleLocation.search(position.coords.latitude + ", " + position.coords.longitude).then(function(response){
            $scope.typedLocation = response.data.results[0].formatted_address
            // console.log(response.data.results[0].formatted_address);
        })

        $scope.currentPrayer = {

            prayer_name: prayers[0].next_prayer_name,
            prayer_time: prayers[0].next_prayer_time,
            prayerBg: prayers[0].next_prayer_name.toLowerCase(),
            currentDate: new Date().toDateString()

        }
        
        

        lowerPrayers(prayers);
    }
    


    
    // fetch the location
    function freegeoip(){
        $http.jsonp('http://freegeoip.net/json/?callback=JSON_CALLBACK').then(function(response){

            $scope.location = {
                latitude: response.data["latitude"],
                longitude: response.data["longitude"]
            }
            

            $scope.typedLocation = response.data["city"] + ", " + response.data["region_code"]

            var prayers = displayPrayers(response.data["latitude"], response.data["longitude"])
            

            $scope.currentPrayer = {

                prayer_name: prayers[0].next_prayer_name,
                prayer_time: prayers[0].next_prayer_time,
                prayerBg: prayers[0].next_prayer_name.toLowerCase(),
                currentDate: new Date().toDateString()

            }
            
            

            lowerPrayers(prayers);

        });
    }

    
    $scope.methodChanged = function(){
                            
            $cookieStore.put("asrMethod", $scope.hanafi)


            prayTimes.setMethod($scope.methodSelected);

            $cookieStore.put("cookiedMethod", $scope.methodSelected)
            console.log($cookies.cookiedMethod)
                
            
            prayers = displayPrayers($scope.location.latitude, $scope.location.longitude)
            
            $scope.currentPrayer.prayer_name = prayers[0].next_prayer_name
            $scope.currentPrayer.prayer_time = prayers[0].next_prayer_time
            // console.log($scope.prayer_time)
            lowerPrayers(prayers);
    }
    $scope.searchLocation = function(){
        $scope.typedLocation = ""
    }
    $scope.returnLocation = function(event){
        if(event.which == 13){
            googleLocation.search($scope.typedLocation).then(function(response){
                
                prayers = displayPrayers(response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng)

                $scope.typedLocation = response.data.results[0].address_components[0].long_name + ", " + response.data.results[0].address_components[2].short_name
                $scope.currentPrayer.prayer_name = prayers[0].next_prayer_name
                $scope.currentPrayer.prayer_time = prayers[0].next_prayer_time
                $scope.currentPrayer.currentDate = new Date().toDateString()

                lowerPrayers(prayers);
            })
        }
    }



    function displayPrayers(latitude, longitude){
        
        if($scope.hanafi == true){

            prayTimes.adjust( { asr: 'Hanafi'} );
        }
        else{
            prayTimes.adjust( { asr: 'Standard'});

        }

        prayTimes.setMethod($scope.methodSelected);

        var date = new Date();
        // var date = new Date("January 13, 2014 16:13:00");
        var times = prayTimes.getTimes(date, [latitude, longitude]);
        // console.log(times)
        if(date.getHours()+ ":" + date.getMinutes() >= times['isha'])
        {
            date.setDate(date.getDate() + 1);
            date.setHours(2)
            var times = prayTimes.getTimes(date, [latitude, longitude]);
            // var times = prayTimes.getTimes(date, [43, -80], -8);

            // console.log(date);
            // console.log(date.getTimezoneOffset());
        }
        var list = ['Fajr', 'Sunrise',  'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
        function remainingTimes(list){
            var remainingPrayers = []
            for(var i in list){
                if (times[list[i].toLowerCase()]> date.toTimeString()){
                    remainingPrayers.push([list[i], times[list[i].toLowerCase()]]);
                }
            }
            return remainingPrayers[0];
        };
        var prayersData = []
        var nextPrayer =    {"next_prayer_name": remainingTimes(list)[0],
                "next_prayer_time": tConvert(remainingTimes(list)[1])
                }
        var allPrayers = {}
        for(var i in list){
            allPrayers[list[i].toLowerCase()] = tConvert(times[list[i].toLowerCase()])
        }
        prayersData = [nextPrayer, allPrayers]
        // console.log(prayersData)
        return prayersData
    }




})



function lowerPrayers(prayers){
for(var i in list){
    var id = "#"+list[i].toLowerCase();
    angular.element( document.querySelector(id) ).text(tConvert(prayers[1][list[i].toLowerCase()]));
    var c = ".prayers_lower " + "."+list[i].toLowerCase();
    
    angular.element(document.querySelector(c) ).bind("mouseover",function(){
        
        $('#next_prayer').removeClass().addClass(this.className.split(' ')[1]);
        $('#prayer_name').text(this.className.split(' ')[1].charAt(0).toUpperCase() + this.className.split(' ')[1].slice(1) )
        $('#prayer_time').text(tConvert(prayers[1][this.className.split(' ')[1]]))
        // console.log(this.className.split(' ')[1])
    });
        
    };
}
function tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice (1);  // Remove full string match value
        time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
}
// for(var i in list){
//  app.directive(list[i], function() {
//      return function(scope, element) {
//          element.bind("mouseenter", function() {
//              // $('#next_prayer').removeClass().addClass(this.className.split(' ')[1]);
//              scope.prayer_name = "hello"
//              console.log(scope.prayer_name)
                
//          })
//      }
//  })

// };




  
