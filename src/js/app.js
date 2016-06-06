/*
 * Copyright (C) 2016 TopCoder Inc., All Rights Reserved.
 */

/**
 * Represents the entrance for ionic application
 *
 * @author TCDEVELOPER
 * @version 1.0
 */
(function () {
  'use strict';

  angular.module('app', ['<!--replace modules-->'])

    .run(function ($ionicPlatform) {
      $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
      });
    })
    .config(function ($httpProvider, API_URL, API_TOKEN) {
    //disable IE ajax request caching
    $httpProvider.interceptors.push(function ($q) {
      return {
        request: function (reqConfig) {
          if (reqConfig.url.indexOf("html") === -1) {
            reqConfig.headers['Authorization'] = 'Bearer ' + API_TOKEN;
            if (reqConfig.url.indexOf("http") !== 0) {
              reqConfig.url = API_URL + reqConfig.url;
            }
          }
          return reqConfig;
        },
        responseError: function (rejection) {
          if(rejection.status === 401) {
            // actually should redirect to login page when exists.
            location.reload();
          }
          return $q.reject(rejection.data && rejection.data.message? rejection.data.message:'Server error!' );
        }
      };
    });
  })
    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: function($scope, $ionicPopup, $ionicLoading){
            // show loading
            $scope.showLoading =  function() {
              $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>.'
              });
            };
            // hide loading
            $scope.hideLoading =  function() {
              $ionicLoading.hide();
            };
            // show error with ionic popup
            $scope.showError =  function(message) {
              $ionicPopup.alert({
                title: 'Error',
                template: message
              });
            };
            // show info with ionic popup
            $scope.showInfo =  function(message) {
              $ionicPopup.alert({
                title: 'Info',
                template: message
              });
            }
          }
        });
      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/app/home');
    });
})();
