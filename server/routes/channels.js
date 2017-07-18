'use strict';
const express = require('express');
const router = express.Router();
const ChannelController = require('../controllers').Channels;

router.route('/channels')
  .post(ChannelController.createChannel)
;

module.exports = router;