'use strict';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('malandraca', ['ionic', 'ngCordova', 'ngStorage', 'gettext', 'firebase'])

.run(function ($ionicPlatform, $cordovaSplashscreen, $timeout) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.splashscreen) {
            $timeout(function() {
                $cordovaSplashscreen.hide()
              }, 5000);
        }
})
})

.constant('MAIN_STREAM', {url:'http://stream.malandraca.com:6366/1/;'})
.constant('IMAGE_CONFIG', {artistBaseUrl:'http://www.malandraca.com/images/artist-pictures/'})
.constant('FIRE_BASE_PATH', 'https://malandraca.firebaseio.com/')

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
        
    })

    .state('app.posts', {
        url: "/posts",
        views: {
            'menuContent': {
                templateUrl: "templates/posts.html",
                controller: 'PostsCtrl'
            }
        }
    })
    
    .state('app.post', {
      url: "/posts/:postId",
      views: {
        'menuContent': {
          templateUrl: "templates/post.html",
          controller: 'PostCtrl'
        }
      }
    })
    
    .state('app.radio', {
        url: "/radio",
        views: {
            'menuContent': {
                templateUrl: "templates/radio.html",
                controller: 'RadioCtrl'
            }
        }
    })
    .state('app.config', {
        url: "/config",
        views: {
            'menuContent': {
                templateUrl: "templates/config.html",
                controller: 'ConfigCtrl'
            }
        }
    })
    
    .state('app.login', {
        url: "/login",
        views: {
            'menuContent': {
                templateUrl: "templates/login.html"
                //controller: 'LoginCtrl'
            }
        }
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});