'use strict';
const express = require('express');
const router = express.Router();
const ProfileGroupController = require('../controllers').ProfilesGroups;

router.route('/groups/:id')
  .get(ProfileGroupController.getAllGroups)
  .post(ProfileGroupController.joinGroup)
;

module.exports = router;