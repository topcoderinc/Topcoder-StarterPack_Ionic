/*
 * Copyright (C) 2016 TopCoder Inc., All Rights Reserved.
 */

/**
 * Represents the angular route,controller for Facebook page
 *
 * @author TCDEVELOPER
 * @version 1.0
 */

(function () {
  'use strict';

  angular.module('app')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.twitter', {
          url: '/twitter',
          views: {
            'menuContent': {
              templateUrl: 'components/twitter/index.html',
              controller: 'TwitterCtrl as vm'
            }
          }
        });
    })
    .factory('TwitterService', function($cordovaOauth, $q, $window, $twitterApi, TWITTER_CONFIG) {

      function getItem(key) {
        return JSON.parse($window.localStorage.getItem(key));
      }
      function setItem(key, value) {
        return $window.localStorage.setItem(key, JSON.stringify(value));
      }
      function removeItem(key) {
        return $window.localStorage.removeItem(key);
      }

      return {
        getSession: function() {
          var session = getItem('TWITTER_SESSION');
          return session;
        },

        login: function() {
          var deferred = $q.defer();
          var session = this.getSession();
          if (session) {
            deferred.resolve(session);
            return deferred.promise;
          }

          $cordovaOauth.twitter(TWITTER_CONFIG.consumerKey, TWITTER_CONFIG.consumerSecretKey, {}).then(function (result) {
            // save the twitter login session
            setItem('TWITTER_SESSION', result);
            // configure the api
            $twitterApi.configure(TWITTER_CONFIG.consumerKey, TWITTER_CONFIG.consumerSecretKey, result);

            deferred.resolve(result);
          }, function (error) {

            deferred.reject(error);
          });

          return deferred.promise;
        },

        tweet: function(message) {

          var deferred = $q.defer();
          var session = this.getSession();
          if (!session) {
            deferred.reject('should login first');
            return deferred.promise;
          }

          $twitterApi.configure(TWITTER_CONFIG.consumerKey, TWITTER_CONFIG.consumerSecretKey, session);

          $twitterApi.postStatusUpdate(message + ' ' + TWITTER_CONFIG.link).then(function(response) {

            deferred.resolve(response);
          }, function(err) {

            deferred.reject(err);
          });
          return deferred.promise;
        },

        reset: function() {
          removeItem('TWITTER_SESSION');
        }
      };
    })
    .controller("TwitterCtrl", function ($scope, TwitterService, $ionicPopup, TWITTER_CONFIG) {
      $scope.post = {
        text: TWITTER_CONFIG.description
      };
      $scope.authorized = !!TwitterService.getSession();

      var vm = this;
      vm.share = function() {
        $scope.showLoading();
        TwitterService.login().then(function () {
          $scope.hideLoading();
          $scope.authorized = true;
          $ionicPopup.show({
            templateUrl: 'twitter-post-popup.html',
            title: 'Share to Twitter',
            scope: $scope,
            buttons: [
              {text: 'Cancel'},
              {
                text: '<b>Tweet</b>',
                type: 'button-positive',
                onTap: function (e) {
                  if (!$scope.post.text) {
                    //don't allow the user to close unless he enters the post
                    e.preventDefault();
                  } else {
                    return $scope.post.text;
                  }
                }
              }
            ]
          }).then(function(res) {
            if (!res) {
              return;
            }
            $scope.showLoading();
            TwitterService.tweet($scope.post.text).then(function () {
              $scope.hideLoading();
              $scope.showInfo('Share to twitter successfully!');
            }, function(err) {
              $scope.hideLoading();
              if (err === 401 || err === 403) {
                vm.reset();
              } else if (!err) {
                $scope.showError('Failed to share to twitter, maybe your are posting the same tweet more than once. This is not allowed by twitter.');
              } else {
                $scope.showError('Failed to share to twitter!');
              }
            });
          });
        }, function (err) {
          $scope.hideLoading();
          if (err && err.toString().indexOf('sign in flow was canceled') >= 0) {
            // does nothing
          } else {
            $scope.showError('Failed to login to twitter!');
            vm.reset();
          }
        });
      };

      vm.reset = function() {
        $scope.authorized = false;
        TwitterService.reset();
      }
    });
})();
