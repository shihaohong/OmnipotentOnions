'use strict';
const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers').Profiles;

router.route('/')
  .get(ProfileController.getAll)
  // .post(ProfileController.create)
;

router.route('/:id')
  .get(ProfileController.getOne)
  .post(ProfileController.updateBio)
  // .delete(ProfileController.deleteOne)
;

// router.route('/:id/);

module.exports = router;
