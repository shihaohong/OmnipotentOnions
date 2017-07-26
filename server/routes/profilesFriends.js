'use strict';
const express = require('express');
const router = express.Router();
const ProfileFriendController = require('../controllers').ProfilesFriends;

router.route('/:id')
  .get(ProfileFriendController.getAllFriends)
;

router.route('/:id/:friendId')
  .post(ProfileFriendController.addFriend)
  .delete(ProfileFriendController.deleteFriend)
;

module.exports = router;
