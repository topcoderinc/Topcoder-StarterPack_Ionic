/*
 * Copyright (C) 2016 TopCoder Inc., All Rights Reserved.
 */

/**
 * Represents the angular route,controller for email page
 *
 * @author TCDEVELOPER
 * @version 1.0
 */

(function () {
  'use strict';

  angular.module('app')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.email', {
          url: '/email',
          views: {
            'menuContent': {
              templateUrl: 'components/email/index.html',
              controller: 'EmailCtrl as vm'
            }
          }
        });
    })
    .controller("EmailCtrl", function ($scope, $window,EmailService, TEST_EMAIL) {
      var vm = this;
      var idKey ='mailId';
      vm.toEmail ='';
      vm.sendEmail = function(emailForm){
        if (emailForm && emailForm.$valid) {
          $scope.showLoading();
          EmailService.send({
            email: {
              sender: TEST_EMAIL.from,
              recipients: [vm.toEmail],
              subject: TEST_EMAIL.subject,
              text_body: TEST_EMAIL.body
            }
          }).$promise.then(function (data) {
            $window.localStorage[idKey] = data.id;
            $scope.showInfo('Succeed to send email to '+vm.toEmail+' with ID '+data.id+' !');
          }).catch($scope.showError)
            .finally(function () {
              $scope.hideLoading();
            });
        }else{
          $scope.showError('Please input valid email address for destination email!');
        }
      };
      vm.getDeliveryStatus = function(){
        var id = $window.localStorage[idKey];
        if(!id){
          $scope.showError('Please first send email!');
          return;
        }
        $scope.showLoading();
        EmailService.getDeliveryStatus({id:id}).$promise.then(function (data) {
          $scope.showInfo('ID:'+id+', status:'+(data.delivered ? ' Delivered at '+data.delivery_time:data.delivery_status)+'!');
        }).catch($scope.showError)
          .finally(function () {
            $scope.hideLoading();
          });
      };
    });
})();
