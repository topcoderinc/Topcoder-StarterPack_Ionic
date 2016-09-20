/*
 * Copyright (C) 2016 TopCoder Inc., All Rights Reserved.
 */

/**
 * Represents the angular route,controller for push page
 *
 * @author TCDEVELOPER
 * @version 1.0
 */

(function () {
  'use strict';

  angular.module('app')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.push', {
          url: '/push',
          views: {
            'menuContent': {
              templateUrl: 'components/push/index.html',
              controller: 'PushCtrl as vm'
            }
          }
        });
    })
    .controller("PushCtrl", function ($scope, PUSH_CONFIG, $ionicPlatform, $cordovaDatePicker, $http) {
      var vm = this;
      vm.notificationMessage = "";
      vm.pickedDate = new Date();
      vm.pickedTime = new Date();
      vm.pickDate = function () {
        $ionicPlatform.ready(function () { 
          var options = {
            date: vm.pickedDate,
            mode: 'date',
            allowOldDates: false,
            allowFutureDates: true,
            doneButtonLabel: 'DONE',
            doneButtonColor: '#387ef5',
            cancelButtonLabel: 'CANCEL',
            cancelButtonColor: '#000000'
          };
          $cordovaDatePicker.show(options).then(function(date){
            if (date instanceof Date) {
              vm.pickedDate = date;
            }
          });
        });
      };
      vm.pickTime = function () {
        $ionicPlatform.ready(function () { 
          var options = {
            date: vm.pickedTime,
            mode: 'time',
            allowOldDates: true,
            allowFutureDates: true,
            doneButtonLabel: 'DONE',
            doneButtonColor: '#387ef5',
            cancelButtonLabel: 'CANCEL',
            cancelButtonColor: '#000000'
          };
          $cordovaDatePicker.show(options).then(function(time){
            if (time instanceof Date) {
              vm.pickedTime = time;
            }
          });
        });
      };
      vm.schedulePushNotification = function () {
        var dateNow = new Date();
        var scheduledDateTime = new Date(vm.pickedDate.getFullYear(), vm.pickedDate.getMonth(), vm.pickedDate.getDate(), vm.pickedTime.getHours(), vm.pickedTime.getMinutes(), 0, 0);
        var currentDateTime = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), dateNow.getHours(), dateNow.getMinutes(), 0, 0);
        // If notification message is blank or date is previous to Date now then show error else schedule the notification
        if (vm.notificationMessage.trim().length == 0) {
          $scope.showError("Please input valid notification message for push notification!");
        } else if (scheduledDateTime.getTime() < currentDateTime.getTime()) {
          $scope.showError("Please input valid scheduled date for push notification!");
        } else {
          // Define relevant info
          var jwt = PUSH_CONFIG.authorizationToken;
          var tokens = [PUSH_CONFIG.token];
          var profile = PUSH_CONFIG.profileTag;
          // Build the request object
          var req = {
            method: 'POST',
            url: PUSH_CONFIG.url,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + jwt
            },
            data: {
              "tokens": tokens,
              "profile": profile,
              "notification": {
                "message": vm.notificationMessage
              }
            }
          };
          // Set scheduled datetime if it is scheduled for a future date
          if (scheduledDateTime.getTime() > currentDateTime.getTime()) {
            req.data.scheduled = scheduledDateTime.toISOString();
          }
          // Make the API call
          $scope.showLoading();
          $http(req).then(function(resp){
            $scope.showInfo("Succeed to schedule push notification to device. Response with status: "+resp.statusText+" and status code: "+resp.status);
          }).finally(function () {
            $scope.hideLoading();
          });
        } 
      };
    });
})();
