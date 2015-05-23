'use strict';

/**
 * @ngdoc service
 * @name malandracaSiteApp.soundPlayer
 * @description
 * # soundPlayer
 * Service in the malandracaSiteApp.
 */
angular.module('malandraca')
  .factory('radioPlayerService', ['$cordovaMedia', '$window', '$ionicLoading', 'MAIN_STREAM', function ($cordovaMedia, $window,$ionicLoading, MAIN_STREAM) {
        var volume = 50,
            media,
            isPlaying = false;
      
        var soundPlayerContext = {
            me: this,
            play: function () {

                $ionicLoading.show();
                
                try{

                if(angular.isDefined(media)){
                    if(ionic.Platform.isIOS()){
                        var iOSPlayOptions = {
                            //numberOfLoops: 2,
                            playAudioWhenScreenIsLocked : false
                        };
                        media.play(iOSPlayOptions);
                    }else{
                        media.play();             
                    }
                    isPlaying = true;
                }else{
                   
                    media = $cordovaMedia.newMedia(MAIN_STREAM.url);
                    media.then(function(r) {

                        console.log('success');
                        console.log(r);
                        isPlaying = true;
                    }, function (r) {
                        console.log('error');
                        console.log(r);
                        isPlaying = false;
                    },
                       function (status){
                            if( status==Media.MEDIA_RUNNING ) {
                                isPlaying = true;
                            }else{
                                isPlaying = false;
                            }
                        }          
                    );
                    if(ionic.Platform.isIOS()){
                        var iOSPlayOptions = {
                            //numberOfLoops: 2,
                            playAudioWhenScreenIsLocked : false
                        };
                        media.play(iOSPlayOptions);
                    }else{
                        media.play();             
                    }
                    isPlaying = true;
                }
                    
                } catch (e){
                    console.log(e);
                }
                $ionicLoading.hide();
            },
            internalPlay: function(){
                if(ionic.Platform.isIOS()){
                    var iOSPlayOptions = {
                        numberOfLoops: 2,
                        playAudioWhenScreenIsLocked : false
                    };
                    media.play(iOSPlayOptions);
                }else{
                    media.play();             
                }
            },
            getVolume: function(){
                return volume;
            },
            setVolume: function(changedValue){
                
                var newVolume = changedValue / 100;
                if(angular.isDefined(media)){
                    media.setVolume(newVolume);
                }
                volume = newVolume;
            },
            stop: function(){
                if(angular.isDefined(media)){
                    media.stop();
                    isPlaying = false;
                }
                isPlaying = false;
            },
            isPlaying: function(){
                 return isPlaying;
            }
        }
        return soundPlayerContext;
    }
]);
