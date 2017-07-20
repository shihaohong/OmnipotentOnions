const models = require('../../db/models');

module.exports.getAllGroups = (req, res) => {
  models.ProfileGroup.where({ profile_id: req.params.id }).fetchAll({ withRelated: ['groups'] })
  .then(groups => {
    res.status(200).send(groups);
  })
  .catch(err => {
    console.log('controllers/profileGroups ERRRR: ', err);
    res.status(503).send(err);
  });
};

module.exports.joinGroup = (req, res) => {
  modules.ProfileGroup.forge({ profile_id: req.params.id, group_id: req.body.group_id })
    .save()
    .then(result => {
      res.status(201).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};