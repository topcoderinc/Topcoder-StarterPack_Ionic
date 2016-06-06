/*
 * Copyright (C) 2016 TopCoder Inc., All Rights Reserved.
 */

/**
 * Represents the rest api service for database
 *
 * @author TCDEVELOPER
 * @version 1.0
 */

(function () {
  'use strict';

  angular.module('app')
    .factory("Games", function ($resource) {
      return $resource('/objects/games/:id',{id: "@id"}, {
        search: {
          method: "GET",
          url: '/objects/games'
        },
        update: {
          method: "PUT"
        },
        create: {
          method: "POST",
          transformResponse: function (data) {
            return {id: data};
          }
        },
        get: {
          isArray: true
        }
      });
    })
})();
