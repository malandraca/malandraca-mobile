'use strict';

/**
 * @ngdoc function
 * @name malandraca.controller:PlayerCtrl
 * @description
 * # PlayerCtrl
 * Controller for radio player
 */

angular.module('malandraca')

.controller('PlayerCtrl', ['$scope', 'radioPlayerService', function ($scope, radioPlayerService) {

    $scope.player = { 
        volume:50,
        playing: false,
        classToButton: 'ion-play play'
    };
    
    $scope.$watch('player.volume', function() {
        radioPlayerService.setVolume($scope.player.volume);
    });
    
    $scope.play = function(){
        radioPlayerService.play();
        $scope.refreshPlayerStatus();
    };
    
    $scope.stop = function(){
        radioPlayerService.stop();
        $scope.refreshPlayerStatus();
    };

    $scope.togglePlay = function () {
        if(radioPlayerService.isPlaying() === false){
            $scope.play();
        }else{
            $scope.stop();
        }
    };
    
    $scope.refreshPlayerStatus = function(){
        $scope.player.playing = radioPlayerService.isPlaying();
        $scope.player.classToButton = $scope.player.playing ? "ion-play play" : "ion-stop stop";
    };
}]);