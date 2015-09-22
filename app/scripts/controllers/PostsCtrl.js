'use strict';

/**
 * @ngdoc function
 * @name malandraca.controller:PostsCtrl
 * @description
 * # NewsCtrl
 * Controller for news
 */

angular.module('malandraca')

.controller('PostsCtrl', ['$scope', '$http', function ($scope, $http) {

    // You can change this url to experiment with other endpoints
  var postsApi = 'http://127.0.0.1:8080/wordpress/wp-json/wp/v2/notas?_jsonp=JSON_CALLBACK&post_type=nota';

  // This should go in a service so we can reuse it
  $http.jsonp( postsApi ).
    success(function(data, status, headers, config) {
      $scope.posts = data;
      console.log( data );
    }).
    error(function(data, status, headers, config) {
      console.log( 'Post load error.' );
    });
    
}])

.controller('PostCtrl', ['$scope', '$stateParams', '$sce', '$http', function ($scope, $stateParams, $sce, $http) {

  // we get the postID from $stateParams.postId, the query the api for that post
  var singlePostApi = 'http://127.0.0.1:8080/wordpress/wp-json/wp/v2/notas/' + $stateParams.postId + '?_jsonp=JSON_CALLBACK';

  console.log( $stateParams.postId );

  $http.jsonp( singlePostApi ).
    success(function(data, status, headers, config) {
      $scope.post = data;

      // must use trustAsHtml to get raw HTML from WordPress
      $scope.content = $sce.trustAsHtml(data.content.rendered);

      console.log(data);

    }).
    error(function(data, status, headers, config) {
      console.log( 'Single post load error.' );
    });
    
}]);

