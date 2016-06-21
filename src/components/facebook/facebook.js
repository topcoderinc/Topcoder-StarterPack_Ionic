/*
 * Copyright (C) 2016 TopCoder Inc., All Rights Reserved.
 */

/**
 * Represents the angular route,controller for facebook page
 *
 * @author TCDEVELOPER
 * @version 1.0
 */

(function () {
  'use strict';


   var app = angular.module('app');
   app.requires.push('ngCordovaOauth'); //use ng cordova oauth library for login


   angular.module('app')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.facebook', {
          url: '/facebook',
          views: {
            'menuContent': {
              templateUrl: 'components/facebook/index.html',
              controller: 'FacebookCtrl as fb'
            }
          }
        })
        .state('app.facebooktimeline', {
          url: '/facebooktimeline',
          views: {
            'menuContent': {
              templateUrl: 'components/facebook/timeline.html',
              controller: 'FacebookPostCtrl'
            }
          }
        })
    })

    


    //facebook config
    .constant('FB_CONFIG', {
		  APP_ID: '888218901283961',
		  APP_SECRET: '8fc9750c427ea1900c06d9b87246544e',
		  API_ENDPOINT:'https://graph.facebook.com/v2.6',
		  DEFAULT_MESSAGE :'I just tried the Topcoder Ionic StarterPack!',
		  LINK : 'https://github.com/topcoderinc/Topcoder-StarterPack_API',
		  IMAGE_URL:'https://www.topcoder.com/wp-content/uploads/2014/01/New-Logo-Stacked-Square-158x154.png'
	})
	

	//defination of controller
    .controller("FacebookCtrl", function ($scope,$state, $http,$window,$timeout,$cordovaOauth,FB_CONFIG) {

    		/* this controller controls the login flow */

			var vm = this;

			/*
				perform the oauth
			*/
			vm.login = function() {
		        $cordovaOauth.facebook(FB_CONFIG.APP_ID, ["email", "public_profile", "user_website", "user_location", "user_relationships","user_posts","user_photos","publish_actions"]).then(function(result) {
		            $window.localStorage['fb_access_token'] = result.access_token; //store the access token
		            $scope.showInfo('Login Success');

		            //change the state
		            $state.go('app.facebooktimeline');

		        }, function(error) {
		            $scope.showError('There was problem in login.')		         
		        });
    		};

    		//if logged in in start from the timeline page where user can post the data to the timeline
    		if($window.localStorage['fb_access_token'] && $window.localStorage['fb_access_token']!=''){
    			$state.go('app.facebooktimeline');
    		}
				  
    })

    .controller("FacebookPostCtrl", function ($scope,$state, $http,$window,$ionicModal,FB_CONFIG) {

    		/*
				THIS controller is used in timeline page contains 2 methods one post to facebook feed/timeline & seconfdmentod logs out from the facebook session
    		*/

			$scope.post=FB_CONFIG.DEFAULT_MESSAGE;
			console.log(FB_CONFIG.DEFAULT_MESSAGE);

			/*
			check if we are logged in else go back to page to ask the user to login */

			if(!$window.localStorage['fb_access_token'] ||  $window.localStorage['fb_access_token']==''){
				$state.go('app.facebook');
			}

			
			/*
				Post the message to facebook
			*/
			$scope.postFeed = function(form) {
		      	
		      	if($window.localStorage['fb_access_token'] && $window.localStorage['fb_access_token']!='') {
		            $scope.showLoading();
		            
		            //construct the post request
		            var req = {
					 	method: 'POST',
					 	url: FB_CONFIG.API_ENDPOINT+'/me/feed',
					 	data: {'message':$scope.post,'link':FB_CONFIG.LINK,'picture':FB_CONFIG.IMAGE_URL,'access_token':$window.localStorage['fb_access_token']}
					}

		            $http(req).then(function(result) {
		               
		            	$scope.showInfo('Message Posted Successfully');

		            }).catch($scope.showError)
			        .finally(function () {
			              $scope.hideLoading();
			        });
		        } else {
		           $scope.showError("Oops looks like the sesssion has expired.");
		           //clean up the token
		           $scope.reset();
		        } 
    		};

    		/*
				clean the facebook token & so that the user needs to login again
    		*/
    		$scope.reset=function(){
    			$window.localStorage['fb_access_token']='';
    			$scope.showInfo('Reset Successfull done');	

    			$state.go('app.facebook'); 
    		}

    		
    })
	
	
	
})();
