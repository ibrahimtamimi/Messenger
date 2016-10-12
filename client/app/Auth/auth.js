angular.module('Messenger.auth', [])
.controller('AuthController', function ($scope, $window, $location) {
	$scope.fbLogin = function () {
        FB.login(function (response) {
            if (response.authResponse) {
                if(response.status === "connected"){
                    getUserInfo();
                    $scope.facebookUser.fb_ID = response.authResponse.userID
                }
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'email,user_photos,user_birthday,user_location,user_hometown'});

        function getUserInfo() {
            // get basic info
            FB.api('/me',{ locale: 'en_US', fields: 'name, location, email' }, function (response) {
                $scope.facebookUser.username = response.email;
                $scope.facebookUser.firstName = response.name.split(" ")[0]
                $scope.facebookUser.lastName = response.name.split(" ")[1]
                $scope.facebookUser.password = response.email;
                $scope.facebookUser.email = response.email;
                
                // get profile picture
                FB.api('/me/picture?type=normal', function (picResponse) {
                    $scope.facebookUser.picture = picResponse.data.url;                 
                });

                // to get friends
                FB.api("/me/friends", function (response) {
                      if (response && !response.error) {
                        $scope.facebookUser.friends = response.data
                      }
                    }
                );
                UserAuth.fbSignin({fb_ID:$scope.facebookUser.fb_ID})
                .then(function(user){
                    if(!user){
                        $scope.signup($scope.facebookUser); 
                    }else{
                        $scope.wrong=false;
                        $window.localStorage['userInfo'] = JSON.stringify(user);
                        $window.localStorage['token'] = user.token;
                        $window.localStorage['userId'] = user['user']._id;
                        $window.localStorage['isLogin'] = true;
                        $location.path('/home');
                        $window.location.reload();                      
                    }   
                })
                .then(function () {
                    $scope.islogin();
                    $location.path('/');
                })
                .catch(function (error) {
                    console.error(error)
                })

            });
        }
    };
})