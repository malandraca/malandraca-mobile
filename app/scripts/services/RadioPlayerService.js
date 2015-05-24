'use strict';

/**
 * @ngdoc service
 * @name malandracaSiteApp.soundPlayer
 * @description
 * # soundPlayer
 * Service in the malandracaSiteApp.
 */
angular.module('malandraca')
  .factory('radioPlayerService', ['$rootScope', '$cordovaMedia', '$window', '$ionicLoading', '$http', 'MAIN_STREAM', function ($rootScope, $cordovaMedia, $window,$ionicLoading, $http, MAIN_STREAM) {
        var volume = 50,
            media,
            isPlaying = false;
      
        var soundPlayerContext = {
            me: this,
            play: function () {

                $ionicLoading.show();
                
                try{

                if(angular.isDefined(media) && media != null){
                    if(ionic.Platform.isIOS()){
                        var iOSPlayOptions = {
                            //numberOfLoops: 2,
                            playAudioWhenScreenIsLocked : false
                        };
                        media.play(iOSPlayOptions);
                    }else{
                        media.play();             
                    }
                }else{
                   
                    media = new Media(MAIN_STREAM.url,
                        // success callback
                        function() {
                            console.log("strartRadio():Audio Success");
                        },

                        // error callback
                        function(err) {
                            console.log("strartRadio():Audio Error: "+ err.code);
                        },
                                             
                        // status callback
                        function(status) {
                            $rootScope.$broadcast('radio-state-change', status);
                        
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
                }
                    
                } catch (e){
                    console.log(e);
                }
                $ionicLoading.hide();
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
                if(angular.isDefined(media) && media !== null){
                    media.stop();
                    media.release();
                    media = null;
                }
            },
            isPlaying: function(){
                 return isPlaying;
            }
        }
        return soundPlayerContext;
    }
]);
