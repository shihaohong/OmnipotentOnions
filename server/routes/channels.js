'use strict';
const express = require('express');
const router = express.Router();
const ChannelController = require('../controllers').Channels;

// router.route('/')
//   .post(ChannelController.createChannel)
// ;

router.route('/:groupId')
  .get(ChannelController.getGroupChannels)
  .post(ChannelController.createChannel)
;

// router.route('/:id/:channelId')
//   .get(ChannelController.getChannel)
// ;

module.exports = router;