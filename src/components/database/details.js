/*
 * Copyright (C) 2016 TopCoder Inc., All Rights Reserved.
 */

/**
 * Represents the angular route,controller for details page of database
 *
 * @author TCDEVELOPER
 * @version 1.0
 */

(function () {
  'use strict';

  angular.module('app')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.gameDetails', {
          url: '/games/:id',
          views: {
            'menuContent': {
              templateUrl: 'components/database/details.html',
              controller: 'GameDetailsCtrl as vm'
            }
          }
        });
    })
    .controller("GameDetailsCtrl", function ($state, $stateParams, $scope, $ionicModal, Games, GAME_FIELDS) {
      var vm = this;
      vm.gameFields = GAME_FIELDS;
      var id = $stateParams.id;
      if (isNaN(id)) {
        $state.go('app.home');
      } else {
        // show image in fullscreen modal.
        $ionicModal.fromTemplateUrl('image-modal.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function (modal) {
          vm.modal = modal;
        });

        vm.openModal = function () {
          vm.modal.show();
        };

        vm.closeModal = function () {
          vm.modal.hide();
        };

        vm.showImage = function (url) {
          vm.imageSrc = url;
          vm.openModal();
        };

        $scope.showLoading();
        // call get api to read details
        Games.get({id: id}).$promise.then(function (data) {
          var fields = [];
          angular.forEach(data, function (field) {
            field.parsedFieldValue = JSON.parse(field.fieldValue);
            if (field.fieldName != 'id') {
              fields.push(field);
            }
          });
          vm.fields = fields;
          vm.id = id;
        }).catch($scope.showError)
          .finally(function () {
            $scope.hideLoading();
          });
        //Cleanup the modal
        $scope.$on('$destroy', function () {
          vm.modal.remove();
        });
      }
    });
})();
