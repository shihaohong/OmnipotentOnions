'use strict';
const express = require('express');
const router = express.Router();
const GroupController = require('../controllers').Groups;

router.route('/createGroup/:id')
  .post(GroupController.createGroup)
;

module.exports = router;