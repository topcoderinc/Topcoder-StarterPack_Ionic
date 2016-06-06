/*
 * Copyright (C) 2016 TopCoder Inc., All Rights Reserved.
 */

/**
 * Represents the angular route,controller for index page of database
 *
 * @author TCDEVELOPER
 * @version 1.0
 */

(function () {
  'use strict';

  angular.module('app')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.home', {
          url: '/home?name&playingTime&averageRating',
          views: {
            'menuContent': {
              templateUrl: 'components/database/index.html',
              controller: 'HomeCtrl as vm'
            }
          }
        });
    })
    .controller("HomeCtrl", function ($state, $stateParams, $scope, $ionicPopup, $ionicListDelegate, Games, GAME_SIZE) {
      var vm = this;
      vm.items = [];
      vm.end = false;
      vm.filters = [];
      vm.loaded = false;
      // load more data for infinite scroll
      vm.loadMore = function () {
        if (vm.end) {
          return;
        }
        var params = {
          sortBy: 'averageRating',
          sortOrder: 'Descending',
          pageSize: GAME_SIZE
        };
        var matchIndex = 0;
        vm.filters = [];
        if ($stateParams.name) {
          vm.filters.push("name:" + $stateParams.name);
          params['matchCriteria[' + matchIndex + '][fieldName]'] = "name";
          params['matchCriteria[' + matchIndex + '][value]'] = JSON.stringify($stateParams.name);
          params['matchCriteria[' + matchIndex + '][matchType]'] = "PartialMatching";
          matchIndex++;
        }
        if ($stateParams.playingTime) {
          vm.filters.push("playingTime:" + $stateParams.playingTime);
          params['matchCriteria[' + matchIndex + '][fieldName]'] = "playingTime";
          params['matchCriteria[' + matchIndex + '][value]'] = JSON.stringify(Number($stateParams.playingTime));
          params['matchCriteria[' + matchIndex + '][matchType]'] = "LessOrEqual";
          matchIndex++;
        }
        if (Array.isArray($stateParams.averageRating)) {
          vm.filters.push("averageRating:" + $stateParams.averageRating);
          params['matchCriteria[' + matchIndex + '][fieldName]'] = "averageRating";
          params['matchCriteria[' + matchIndex + '][value]'] = JSON.stringify(Number($stateParams.averageRating[0]));
          params['matchCriteria[' + matchIndex + '][matchType]'] = "GreaterOrEqual";
          matchIndex++;
          params['matchCriteria[' + matchIndex + '][fieldName]'] = "averageRating";
          params['matchCriteria[' + matchIndex + '][value]'] = JSON.stringify(Number($stateParams.averageRating[1]));
          params['matchCriteria[' + matchIndex + '][matchType]'] = "LessOrEqual";
        }
        params.pageNumber = Math.ceil((vm.items.length + params.pageSize - 1) / params.pageSize);
        $scope.showLoading();
        // call search api
        Games.search(params).$promise.then(function (data) {
          vm.totalRecords = data.totalRecords;
          vm.loaded = true;
          if (data.items.length) {
            angular.forEach(data.items, function (item) {
              angular.forEach(item.fields, function (field) {
                item[field.fieldName] = JSON.parse(field.fieldValue);
              });
            });
            Array.prototype.push.apply(vm.items, data.items);
          }
          else {
            vm.end = true;
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }).catch($scope.showError)
          .finally(function () {
            $scope.hideLoading();
          });
      };

      // call delete api
      vm.confirmDelete = function (item, index) {
        $ionicPopup.confirm({
          title: 'Confirm',
          template: 'Are you sure you want to delete this?'
        }).then(function (res) {
          if (res) {
            $scope.showLoading();
            Games.delete({id: item.id}).$promise.then(function () {
              vm.items.splice(index, 1);
              vm.totalRecords--;
              $ionicListDelegate.closeOptionButtons();
            }).catch($scope.showError)
              .finally(function () {
                $scope.hideLoading();
              });
          }
        });
      };
      $scope.$on('$ionicView.enter', function () {
        vm.loadMore();
      });
    });
})();
