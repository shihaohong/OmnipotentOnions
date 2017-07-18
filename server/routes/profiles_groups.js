'use strict';
const express = require('express');
const router = express.Router();
const Profile_GroupController = require('../controllers').Profiles_Groups;

router.route('/groups/:id')
  .get(Profile_GroupController.getAll)
  .post(Profile_GroupController.joinGroup)
;

module.exports = router;