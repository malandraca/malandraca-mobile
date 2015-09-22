'use strict';

/**
 * @ngdoc function
 * @name malandraca.controller:ConfigCtrl
 * @description
 * # ConfigCtrl
 * Controller for configuration
 */

angular.module('malandraca')

.controller('ConfigCtrl', ['$scope', '$timeout', '$localStorage', 'loginService', function ($scope, $timeout, $localStorage, loginService) {

    $scope.$storage = $localStorage.$default({
        autoStartRadio: false
    });

    $scope.settingsChange = function () { 

         $timeout(function() {
            console.log($scope.autoStartRadio.checked);
            $scope.$storage.autoStartRadio = $scope.autoStartRadio.checked;
        }, 0);

    
    };
    
    $scope.logout = function () {
         loginService.logout();
    };
    
    $scope.showLogout = loginService.isLoggedIn();
    
    $scope.autoStartRadio = {checked: $scope.$storage.autoStartRadio};
    
}]);
