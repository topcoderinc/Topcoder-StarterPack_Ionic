/*
 * Copyright (C) 2016 TopCoder Inc., All Rights Reserved.
 */

/**
 * Represents the angular route,controller for about page
 *
 * @author TCDEVELOPER
 * @version 1.0
 */

(function () {
  'use strict';

  angular.module('app')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.about', {
          url: '/about',
          views: {
            'menuContent': {
              templateUrl: 'components/about/index.html',
              controller: 'AboutCtrl as vm'
            }
          }
        });
    })
    .controller("AboutCtrl", function (APP_VERSION,API_TITLE) {
      var vm = this;
      vm.appVersion = APP_VERSION;
      vm.appTitle = API_TITLE;
    });
})();
