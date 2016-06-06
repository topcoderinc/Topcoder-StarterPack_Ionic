/*
 * Copyright (C) 2016 TopCoder Inc., All Rights Reserved.
 */

/**
 * Represents the angular route,controller for search page of database
 *
 * @author TCDEVELOPER
 * @version 1.0
 */

(function () {
  'use strict';
  angular.module('app')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.searchGames', {
          url: '/searchGames',
          views: {
            'menuContent': {
              templateUrl: 'components/database/search.html',
              controller: 'SearchGameCtrl as vm'
            }
          }
        });
    })
    .controller("SearchGameCtrl", function ($state,$stateParams, $timeout,$scope) {
      var vm = this;
      // range options
      vm.rangeOptions = {
        start: [0, 10],
        range: {min: 0, max: 10}
      };

      // options for playing time
      vm.options = [{
        name:'0 minute',
        value:0
      }];

      //range for playing time is 0-6 hours, step is 15 minutes
      for(var i=15;i<=6*60;i+=15){
        var hours = parseInt(i/60);
        var minutes = i- 60 * hours;
        var label = [];
        if(hours>0){
          label.push(hours + ' hour');
          if(hours>1){
            label.push('s');
          }
        }
        if(minutes>0){
          if(hours>0){
            label.push(' ');
          }
          label.push(minutes + ' minute');
          if(minutes>1){
            label.push('s');
          }
        }
        vm.options.push({
          name:label.join(''),
          value:i
        });
      }
      vm.filter ={};
      // pass filter params to home state
      vm.searchGames = function(){
        vm.filter.averageRating = vm.rangeOptions.start;
        $state.go('app.home', vm.filter);
      };
    });
})();
