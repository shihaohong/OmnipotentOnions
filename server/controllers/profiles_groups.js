const models = require('../../db/models');

module.exports.getAllGroups = (req, res) => {
  models.Profile_Group.where({ profile_id: req.params.id }).fetchAll({ withRelated: ['profiles.id'] })
  .then(groups => {
    res.status(200).send(groups);
  })
  .catch(err => {
    res.status(503).send(err);
  });
};

module.exports.joinGroup = (req, res) => {
  modules.Profile_Group.forge({ profile_id: req.params.id, group_id: req.body.group_id })
    .save()
    .then(result => {
      res.status(201).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};