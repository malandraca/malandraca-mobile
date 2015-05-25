'use strict';

/**
 * @ngdoc function
 * @name malandraca.controller:PlayerCtrl
 * @description
 * # PlayerCtrl
 * Controller for radio player
 */

angular.module('malandraca')

.controller('PlayerCtrl', ['$rootScope','$scope', '$ionicPopover', '$interval', '$http', 'radioPlayerService', function ($rootScope, $scope, $ionicPopover, $interval, $http, radioPlayerService) {

    $scope.player = { 
        volume:50,
        playing: false,
        playButtonClass: 'ion-play play',
        programTitle: 'DJ Furia',
        currentSong: {
            title: 'Tinta Roja',
            artist: 'Anibal Troilo',
            image: 'http://upload.wikimedia.org/wikipedia/commons/3/3c/Anibal_Troilo_1971.png',
            year: '1942',
            signer: 'Francisco Fiorentino',
            gender: 'Tango'
        }
    };
    
    $scope.$watch('player.volume', function() {
        radioPlayerService.setVolume($scope.player.volume);
    });
    
    $scope.play = function(){
        $scope.player.playButtonClass = 'ion-android-more-horizontal';
        radioPlayerService.play();
        $scope.refreshPlayerStatus();
    };
    
    $scope.stop = function(){
        $scope.player.playButtonClass = 'ion-play play';
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
        
        /*$rootScope.$broadcast('radio-song-change', $scope.player.currentSong);
        
        
        var playingInfo = {};
        $http.jsonp('http://radio.pregonera.net:6366/stats?sid=1&json=1&callback=JSON_CALLBACK').
            success(function(data, status, headers, config) {
                playingInfo = data;
                var songTitle = playingInfo.songtitle;
                if(songTitle.indexOf('|') != -1){
                    var songPart = songTitle.split('|');
                    songTitle = songPart[0];
                }
            
                if(songTitle.indexOf('-') != -1){
                    var artistTitlePart = songTitle.split('-');
                    $scope.player.currentSong.artist = artistTitlePart[0];
                    $scope.player.currentSong.title = songPart[1];
                }
                $rootScope.$broadcast('radio-song-change', $scope.player.currentSong);
            }).
            error(function(data, status, headers, config) {
                console.log("ERROR: Could not get data.");
            });*/
    };
    
    $scope.$on('radio-state-change', function(event, status) {
        
        if( status==Media.MEDIA_RUNNING ) {
            $scope.player.playButtonClass = 'ion-stop';
        } else if( status==Media.MEDIA_STARTING ) {
             $scope.player.playButtonClass = 'ion-android-more-horizontal';
        } else{
            $scope.player.playButtonClass = 'ion-play';  
        }
        $scope.refreshPlayerStatus();
    });

    $interval( function(){ $scope.refreshPlayingData(); }, 3000);
    
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
    $rootScope.$broadcast('radio-song-change', $scope.player.currentSong);
}]);