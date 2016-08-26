angular.module('Massenger', [
  'Massenger.services',
  'Massenger.auth',
  'TeamUp.profile',
  'ngRoute',
  'ngMap'
]);
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'index.html',
      controller: 'gamesController'
    })
    .when('/signin', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    // .when('/profile/:id', {
    //   templateUrl: 'app/profile/profile.html',
    //   controller: 'profileController',
    // })
    // .otherwise({
    //   redirectTo: '/'
    // });
    
});

//======================================================================================
/*                                     facebook Auth                                  */
//======================================================================================
//var secret = '7ba8efed3d619c30658079c513ff2f4f';
//var ID = '1563637017279611';

window.fbAsyncInit = function() {
    FB.init({ 
      appId: '1264355366938127',
      status: true, 
      cookie: true, 
      xfbml: true,
      version: 'v2.7'
    });
};


(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "//connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));