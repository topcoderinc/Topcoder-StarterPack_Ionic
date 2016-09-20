/*
 * Copyright (C) 2016 TopCoder Inc., All Rights Reserved.
 */

/**
 * Represents the configurations for email page
 *
 * @author TCDEVELOPER
 * @version 1.0
 */

(function () {
  'use strict';
  angular.module('app')
    .run(function ($ionicPlatform) {
      $ionicPlatform.ready(function () {
        // Ionic Push code. Create Push service and register app
        var push = new Ionic.Push({
          "debug": true,
          "onNotification": function (notification) {
            alert(notification._raw.message);
          }
        });
        push.register(function(token) {
          console.log("Device token:", token.token);
          push.saveToken(token);  // persist the token in the Ionic Platform
        });
      });
    })
  	.constant('PUSH_CONFIG', {
  		profileTag: 'ionic_starter_pack_push_profile',
  		authorizationToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxMzYxZDIzOC1iMTE0LTRiMTUtYmUxMC01OWI5ZmI3YWQwNWIifQ.zQ26qCjZBt-bDxN_2V02jnzoa0cPhnMUZ4dROCH2m4U',
      token: 'cca1d1cb3dd88ed13201e1553a03bee648441e15661bff9bc00550042131d5b4',
  		url: 'https://api.ionic.io/push/notifications'
    });
})();
