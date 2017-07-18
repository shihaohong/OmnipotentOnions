'use strict';
const express = require('express');
const router = express.Router();
const GroupController = require('../controllers').Groups;

router.route('/groups')
  // .get(GroupController.getAll)
  .post(GroupController.create)
;

module.exports = router;