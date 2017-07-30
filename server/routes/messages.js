'use strict';
const express = require('express');
const router = express.Router();
const MessageController = require('../controllers').Messages;

router.route('/:id')
  .get(MessageController.getMessages)
  .post(MessageController.createMessage)
;

module.exports = router;