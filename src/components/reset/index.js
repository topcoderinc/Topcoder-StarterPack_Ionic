/*
 * Copyright (C) 2016 TopCoder Inc., All Rights Reserved.
 */

/**
 * Represents the angular route,controller for reset page
 *
 * @author TCDEVELOPER
 * @version 1.0
 */

(function () {
  'use strict';

  angular.module('app')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.reset', {
          url: '/reset',
          views: {
            'menuContent': {
              templateUrl: 'components/reset/index.html',
              controller: 'ResetCtrl as vm'
            }
          }
        });
    })
    .controller("ResetCtrl", function ($scope, $http) {
      var vm = this;
      vm.reset = function(){
        $scope.showLoading();
        $http({
          method: 'POST',
          url: '/reset'
        }).then(function () {
          $scope.showInfo('Succeed to reset database!');
        }).catch($scope.showError)
            .finally(function () {
              $scope.hideLoading();
            });
      }
    });
})();
