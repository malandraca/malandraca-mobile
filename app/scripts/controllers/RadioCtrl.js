'use strict';

/**
 * @ngdoc function
 * @name malandraca.controller:RadioCtrl
 * @description
 * # RadioCtrl
 * Controller for radio
 */

angular.module('malandraca')

.controller('RadioCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {
    
    $scope.$on('radio-song-change', function(event, song) {
        $scope.currentSong = song;
    });
    
}]);