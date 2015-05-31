'use strict';

angular.module('malandraca')

.factory('artistImageService', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var images = [
        {
            keywords: ['Di Sarli','Rufino'],
            images: [
                'http://1.bp.blogspot.com/-kV7oFxBmC9I/VLZcXmBJ2JI/AAAAAAAAPOA/DdmSijuTQvM/s1600/Di%2Bsarli-Rufino.jpg'
            ]
        },
        {
            keywords: ['Troilo'],
            images: [
                'http://upload.wikimedia.org/wikipedia/commons/3/3c/Anibal_Troilo_1971.png'
            ]
        }
    ];
    
    var matchWords = function(artistName, keywords) {
        var regexMetachars = /[(){[*+?.\\^$|]/g;

        for (var i = 0; i < keywords.length; i++) {
            keywords[i] = keywords[i].replace(regexMetachars, "\\$&");
        }

        var regex = new RegExp("\\b(?:" + keywords.join("|") + ")\\b", "gi");
        var matches = artistName.match(regex) || [];
        
        return matches.length >0;
    };
    
    var getDefaultImage = function(){
            return 'https://scontent-gru1-1.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/10996177_1424059727888610_8674157038219131055_n.png?oh=473fb275dd17df8610623d0f15981b6e&oe=55C1A724';
    };

    return {
        getDefaultImage: getDefaultImage,
        get: function (artistName) {
            var imageSrc = getDefaultImage();
            
            for (var i = 0; i < images.length; i++) {
                if(matchWords(artistName, images[i].keywords) === true){
                   imageSrc = images[i].images[0];
                }
            }
            return imageSrc;
        }
    };
});