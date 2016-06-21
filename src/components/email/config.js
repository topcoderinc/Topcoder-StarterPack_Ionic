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
    .constant('TEST_EMAIL', {
      subject:'Test email from Ionic StarterPack',
      body:'Hello World!',
      from:'IBP-email@topcoder.com'
    });
})();
