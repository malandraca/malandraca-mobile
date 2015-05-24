'use strict';

/**
 * @ngdoc function
 * @name malandraca.controller:PlayerCtrl
 * @description
 * # PlayerCtrl
 * Controller for radio player
 */

angular.module('malandraca')

.controller('PlayerCtrl', ['$scope', '$ionicPopover', '$interval', '$http', 'radioPlayerService', function ($scope, $ionicPopover, $interval, $http, radioPlayerService) {

    $scope.player = { 
        volume:50,
        playing: false,
        programTitle: ''
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
    };
    
    $scope.refreshPlayingData = function() {
        
        var playingInfo = {};
        $http.jsonp('http://radio.pregonera.net:6366/stats?sid=1&json=1&callback=JSON_CALLBACK').
            success(function(data, status, headers, config) {
                playingInfo = data;
                var songTitle = playingInfo.songtitle;
                if(songTitle.indexOf('|') != -1){
                    var songPart = songTitle.split('|');
                    songTitle = songPart[0];
                }
                $scope.player.programTitle = songTitle;
            }).
            error(function(data, status, headers, config) {
                console.log("ERROR: Could not get data.");
            });
    }

    $interval( function(){ $scope.refreshPlayingData(); }, 1000);
    
    $ionicPopover.fromTemplateUrl('templates/volume-popover.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.volumePopover = popover;
    });

    $scope.openPopover = function($event) {
        $scope.volumePopover.show($event);
    };
    $scope.closePopover = function() {
        $scope.volumePopover.hide();
    };
    
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.volumePopover.remove();
    });
}]);