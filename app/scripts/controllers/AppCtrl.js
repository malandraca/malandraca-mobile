'use strict';

/**
 * @ngdoc function
 * @name malandraca.controller:AppCtrl
 * @description
 * # AppCtrl
 * Main Controller
 */

angular.module('malandraca')


.controller('AppCtrl', ['$scope', '$state', '$location', '$ionicModal', '$timeout', '$ionicPopover', '$ionicHistory', 'loginService',
                        function ($scope, $state, $location, $ionicModal, $timeout, $ionicPopover, $ionicHistory, loginService) {
   /* // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };*/

    $ionicHistory.clearHistory();
                            
    $scope.login = function(authMethod) {
        loginService.login(authMethod);
    };
    
    $scope.$on('user.login', function(event, user) {
        $scope.user = user;
        //$location.path('/app/radio');
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('app.radio');
    });  
    $scope.$on('user.logout', function(event, user) {
        $scope.user = user;
        //$location.path('/app/radio');
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('app.login');
    }); 
                            
    
                            
    $scope.logout = function() {
        loginService.logout();
    };
                            
    $scope.showDialog = function() {
        
        /*facebookConnectPlugin.showDialog( { method: "feed" }, 
                    function (response) { alert(JSON.stringify(response)) },
                    function (response) { alert(JSON.stringify(response)) });*/
    };
    
    $scope.apiTest = function() {
    };

}]);