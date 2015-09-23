'use strict';

angular.module('malandraca')

.factory('loginService', ['$rootScope', '$firebaseAuth', '$timeout', 'FIRE_BASE_PATH', function ($rootScope, $firebaseAuth, $timeout, FIRE_BASE_PATH) {

    var usersRef = new Firebase(FIRE_BASE_PATH),
        fbAuth = $firebaseAuth(usersRef),
        userAuthenticatedData = null;
    
    var login = function(authMethod) {
        fbAuth.$authWithOAuthRedirect(authMethod).then(function(authData) {
            onSuccessLogin(authData);
        }).catch(function(error) {
          if (error.code === 'TRANSPORT_UNAVAILABLE') {
            fbAuth.$authWithOAuthPopup(authMethod).then(function(authData) {
                onSuccessLogin(authData);
            });
          } else {
            //TODO notify user
            console.log(error);
          }
        });
    };
    
    var onSuccessLogin = function(authData){
        userAuthenticatedData = authData;
        if (authData === null) {
          console.log('Not logged in yet');
        } else {
          console.log('Logged in as', authData.uid);
          $rootScope.$broadcast('user.login', getCurrentUser());
        }
    };
    
    var getCurrentUser = function(){
        var user ={
            name: ''
        }
        if(userAuthenticatedData != null){
            user.name = userAuthenticatedData.facebook.displayName;
        }
        return user;
    };
    
    var logout = function() {
        userAuthenticatedData = null;
        fbAuth.$unauth();
        $rootScope.$broadcast('user.logout', getCurrentUser());
    };
    
    fbAuth.$onAuth(function(authData) {
        onSuccessLogin(authData);
    });
    
    return {
        getCurrentUser: getCurrentUser,
        login: login,
        logout: logout,
        isLoggedIn: function(){
            return userAuthenticatedData!=null;
        }
    };
}]);