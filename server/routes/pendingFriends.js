'use strict';
const express = require('express');
const router = express.Router();
const PendingFriendsController = require('../controllers').PendingFriends;

router.route('/pending/:id')
  .get(PendingFriendsController.getAllPendingFriends)
;

router.route('/requests/:id')
  .get(PendingFriendsController.getAllFriendRequests)
;

router.route('/sendRequest/:id')
  .post(PendingFriendsController.sendFriendRequest)
;

router.route('/cancelrequest/:id/:friendId')
  .delete(PendingFriendsController.cancelFriendRequest)
;

module.exports = router;