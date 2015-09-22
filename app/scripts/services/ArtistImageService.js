'use strict';

angular.module('malandraca')

.factory('artistImageService', ['IMAGE_CONFIG', function (IMAGE_CONFIG) {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var images = [
        {
            keywords: ['Di Sarli','Rufino'],
            images: [
                'disarli-rufino.jpg'
            ]
        },
        {
            keywords: ['Troilo'],
            images: [
                'troilo1.png'
            ]
        },
        {
            keywords: ['Demare'],
            images: [
                'demare1.jpg'
            ]
        },
        {
            keywords: ['Carabelli'],
            images: [
                'carabelli1.jpg'
            ]
        },
        {
            keywords: ['D\'Arienzo'],
            images: [
                'darienzo1.jpg'
            ]
        },
        {
            keywords: ['Laurenz'],
            images: [
                'laurenz1.jpg'
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
            return IMAGE_CONFIG.artistBaseUrl + 'default.png';
    };

    return {
        getDefaultImage: getDefaultImage,
        get: function (artistName) {
            var imageSrc = getDefaultImage();
            
            for (var i = 0; i < images.length; i++) {
                if(matchWords(artistName, images[i].keywords) === true){
                   imageSrc = IMAGE_CONFIG.artistBaseUrl + images[i].images[0];
                }
            }
            return imageSrc;
        }
    };
}]);