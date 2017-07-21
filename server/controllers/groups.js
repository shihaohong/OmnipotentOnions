const models = require('../../db/models');

module.exports.createGroup = (req, res) => {
  models.Group.forge()
    .save({ 
      name: req.params.id,
      shortID: req.query.shortID
    })
    .then(group => {
      models.ProfileGroup.forge()
        .save({
          profile_id: req.query.id,
          group_id: group.id
        })
        .then(() => {
          models.ProfileGroup.where({ profile_id: req.query.id })
            .fetchAll({ withRelated: ['groups'] })
            .then(groups => {
              console.log(groups);
              res.status(201).send(groups);
            });
        });
    })
    .catch(err => {
      if (err.constraint === 'groups_name_unique') {
        return res.status(403);
      }
      res.status(500).send(err);
    });
};

