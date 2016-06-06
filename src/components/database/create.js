/*
 * Copyright (C) 2016 TopCoder Inc., All Rights Reserved.
 */

/**
 * Represents the angular route,controller for new page of database
 *
 * @author TCDEVELOPER
 * @version 1.0
 */

(function () {
  'use strict';

  angular.module('app')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.newGame', {
          url: '/newGame',
          views: {
            'menuContent': {
              templateUrl: 'components/database/create.html',
              controller: 'NewGameCtrl as vm'
            }
          }
        });
    })
    .controller("NewGameCtrl", function ($scope,$state, Games, GAME_FIELDS) {
      var vm = this;
      vm.entity = {};
      // init boolean fields with false
      angular.forEach(GAME_FIELDS, function (v, k) {
        if (v.type == 'boolean') {
          vm.entity[k] = false;
        }
      });
      // call create api
      vm.newGame = function (newForm) {
        if (newForm && newForm.$valid) {
          var fields = [];
          angular.forEach(vm.entity, function (v, k) {
            fields.push({
              fieldName: k,
              fieldValue: JSON.stringify(v)
            });
          });
          $scope.showLoading();
          Games.create(fields).$promise.then(function (data) {
            $state.go('app.gameDetails', {id: data.id});
          }).catch($scope.showError)
            .finally(function () {
              $scope.hideLoading();
            });
        } else {
          $scope.showInfo('Please input valid value for fields!');
        }
      };
    });
})();
