/*
 * Copyright (C) 2016 TopCoder Inc., All Rights Reserved.
 */

/**
 * Represents the configurations for database page
 *
 * @author TCDEVELOPER
 * @version 1.0
 */
(function () {
  'use strict';
  angular.module('app')
    .constant('GAME_SIZE', 10)// show top 10 games.
    .constant('GAME_FIELDS', {
      gameId: {
        type: 'number'
      },
      name: {
        type: 'string'
      },
      image: {
        type: 'image'
      },
      thumbnail: {
        type: 'image'
      },
      minPlayers: {
        type: 'number'
      },
      maxPlayers: {
        type: 'number'
      },
      playingTime: {
        type: 'number'
      },
      isExpansion: {
        type: 'boolean'
      },
      yearPublished: {
        type: 'number'
      },
      bggRating: {
        type: 'number'
      },
      averageRating: {
        type: 'number'
      },
      rank: {
        type: 'number'
      },
      numPlays: {
        type: 'number'
      },
      rating: {
        type: 'number'
      },
      owned: {
        type: 'boolean'
      },
      preOrdered: {
        type: 'boolean'
      },
      forTrade: {
        type: 'boolean'
      },
      previousOwned: {
        type: 'boolean'
      },
      want: {
        type: 'boolean'
      },
      wantToPlay: {
        type: 'boolean'
      },
      wantToBuy: {
        type: 'boolean'
      },
      wishList: {
        type: 'boolean'
      },
      userComment: {
        type: 'string'
      }
    });
})();
