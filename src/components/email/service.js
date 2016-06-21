/*
 * Copyright (C) 2016 TopCoder Inc., All Rights Reserved.
 */

/**
 * Represents the rest api service for email page
 *
 * @author TCDEVELOPER
 * @version 1.0
 */

(function () {
  'use strict';

  angular.module('app')
    .factory("EmailService", function ($resource) {
      return $resource('/emails/:id',{id: "@id"}, {
        send: {
          method: "POST",
          url: '/emails'
        },
        getDeliveryStatus: {
          method: "GET",
          url: '/emails/:id/deliveryStatus'
        }
      });
    })
})();
