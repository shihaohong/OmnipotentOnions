'use strict';
const express = require('express');
const router = express.Router();
const AttendeeController = require('../controllers').Attendees;

router.route('/:eventId')
  .post(AttendeeController.join)
  .delete(AttendeeController.unjoin)
  .get(AttendeeController.getAll)
;

module.exports = router;