'use strict';

/**
 * @ngdoc function
 * @name malandraca.controller:ConfigCtrl
 * @description
 * # ConfigCtrl
 * Controller for configuration
 */

angular.module('malandraca')

.controller('ConfigCtrl', ['$scope', '$timeout', '$localStorage', function ($scope, $timeout, $localStorage) {

  
    
  /*$cordovaPreferences.get('autoStartRadio').then(function (autoStart) {
      $scope.autoStartRadio.checked = autoStart;
  })*/
    
    
/*$ionicPlatform.ready(function () {
      // if (window.ngCordova.plugins.prefs) {
            $cordovaPreferences.get('autoStartRadio', function(result) {
                    console.log("We got a setting: " + result);
                }, function(error) {
                    console.log("Failed to retrieve a setting: " + error);
                }
            );
            
            
    //    } 
    });
    
 

 $scope.settingsChange = function () { 
     
     $timeout(function() {
        console.log($scope.autoStartRadio.checked);
        $cordovaPreferences.set('autoStartRadio', $scope.autoStartRadio.checked).then(function () {
          console.log('successfully saved!');
        })
    }, 0);
     
    
  };
*/

    $scope.$storage = $localStorage.$default({
        autoStartRadio: false
    });

        $scope.settingsChange = function () { 

         $timeout(function() {
            console.log($scope.autoStartRadio.checked);
            $scope.$storage.autoStartRadio = $scope.autoStartRadio.checked;
        }, 0);
     
    
    };
    
    $scope.autoStartRadio = {checked: $scope.$storage.autoStartRadio};
    
}]);
