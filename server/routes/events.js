'use strict';
const express = require('express');
const router = express.Router();
const EventController = require('../controllers').Events;

router.route('/:groupId')
  .post(EventController.createEvent)
  .delete(EventController.deleteEvent)
  .get(EventController.fetchEvents)
;

router.route('/:groupId/:eventId')
  .get(EventController.fetchEvent)
;

module.exports = router;