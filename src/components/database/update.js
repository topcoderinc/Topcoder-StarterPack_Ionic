/*
 * Copyright (C) 2016 TopCoder Inc., All Rights Reserved.
 */

/**
 * Represents the angular route,controller for update page of database
 *
 * @author TCDEVELOPER
 * @version 1.0
 */

(function () {
  'use strict';

  angular.module('app')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.updateGame', {
          url: '/updateGames/:id?fieldName&fieldValue',
          views: {
            'menuContent': {
              templateUrl: 'components/database/update.html',
              controller: 'UpdateGameCtrl as vm'
            }
          }
        });
    })
    .controller("UpdateGameCtrl", function ($state,$stateParams, $scope,Games,GAME_FIELDS) {
      var vm = this;
      var id = $stateParams.id;
      if(isNaN(id)){
        $state.go('app.home');
      }else{
        vm.gameFields = GAME_FIELDS;
        vm.id = id;
        var field = $stateParams;
        angular.extend(field,GAME_FIELDS[$stateParams.fieldName]);
        try{
          field.fieldValue = JSON.parse(field.fieldValue);
        }catch (e){
          // ignore
        }
        vm.field = field;
        // call update api
        vm.updateField = function(updateForm){
          if(updateForm && updateForm.$valid){
            $scope.showLoading();
            Games.update({id: id},[
              {
                fieldName: vm.field.fieldName,
                fieldValue: JSON.stringify(vm.field.fieldValue)
              }
            ]).$promise.then(function() {
                $state.go('app.gameDetails', {id:id});
            }).catch($scope.showError)
              .finally(function(){
                $scope.hideLoading();
              });
          }else{
            $scope.showInfo('Please input valid value!');
          }
        };
      }
    });
})();
