'use strict';
const express = require('express');
const router = express.Router();
const ChannelController = require('../controllers').Channels;

router.route('/')
  .post(ChannelController.createChannel)
;

router.route('/:id')
  .get(ChannelController.getGroupChannels)
;

router.route('/:id/:channelId')
  .get(ChannelController.getChannel)
;

module.exports = router;