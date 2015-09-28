'use strict';

angular.module('malandraca')

.factory('loginService', ['$rootScope', '$firebaseAuth', '$timeout', 'FIRE_BASE_PATH', function ($rootScope, $firebaseAuth, $timeout, FIRE_BASE_PATH) {

    var rootRef = new Firebase(FIRE_BASE_PATH),
        fbAuth = $firebaseAuth(rootRef),
        userAuthenticatedData = null,
        _uid;
    
    var login = function(authMethod) {
        fbAuth.$authWithOAuthRedirect(authMethod).then(function(authData) {
            onSuccessAuth(authData);
        }).catch(function(error) {
          if (error.code === 'TRANSPORT_UNAVAILABLE') {
            fbAuth.$authWithOAuthPopup(authMethod).then(function(authData) {
                onSuccessAuth(authData);
            });
          } else {
            //TODO notify user
            console.log(error);
          }
        });
    };
    
    var onSuccessAuth = function(authData){
        
        userAuthenticatedData = authData;
        //_uid = authData.uid;
        if (authData === null) {
            console.log('Not logged in yet');
        } else {

            var user = rootRef.getAuth();
            var userRef = rootRef.child('users').child(user.uid);

            userRef.once('value', function (snap) {
                var user = snap.val();
                if (!user) {
                        createUserAndLogin(authData);
                    }else{
                        console.log('Logged in as', authData.uid);
                        $rootScope.$broadcast('user.loggedin', user);
                    }
                });
            }
    };
    
    function createUser(uid, user, people, onSuccess){
        rootRef.child("users").child(uid).set(user, function(error){
            if (error) {
                console.log("users could not be saved." + error);
            } else {
                createPeople(uid, people, onSuccess);
            }
        });
    };
    
    function createPeople(uid, people, onSuccess){
        rootRef.child("people").child(uid).set(people, function(error){
            if (error) {
                console.log("people " + people.uid + " could not be saved." + error);
            } else {
                onSuccess();
            }
        });
    };
    
    function createUserAndLogin(authData){
        //TODO populate with default values
        var user = {
                        milonguero: true
                    };
        var people = {
                        name: authData.facebook.displayName
                    };
    
        var onSuccess = function(){
            console.log('Logged in as', authData.uid);
            $rootScope.$broadcast('user.loggedin', user);
        };
        createUser(authData.uid, user, people, onSuccess);
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
        
        //if(_uid){
            // Set presence to offline, reset all instance variables, and return!
            //var peopleRef = this._firebase.child("people").child(_uid);
            //peopleRef.child("presence").set("offline");
        //}      
        userAuthenticatedData = null;
        fbAuth.$unauth();
        $rootScope.$broadcast('user.logout', getCurrentUser());
    };
    
    
    
    fbAuth.$onAuth(function(authData) {
        onSuccessAuth(authData);
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