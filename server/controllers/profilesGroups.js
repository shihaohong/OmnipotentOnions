const models = require('../../db/models');

module.exports.getAllGroups = (req, res) => {
  models.ProfileGroup.where({ profile_id: req.params.id }).fetchAll({ withRelated: ['groups'] })
    .then(groups => {
      console.log('controllers/profileGroups: ', groups);
      res.status(200).send(groups);
    })
    .catch(err => {
      console.log('controllers/profileGroups ERRRR: ', err);
      res.status(503).send(err);
    });
};

module.exports.joinGroup = (req, res) => {
  models.Group.where({ shortID: req.params.id })
    .fetch()
    .then(group => {
      models.ProfileGroup.forge()
        .save({
          profile_id: req.query.id,
          group_id: group.id
        })
        .then((groups) => {      
          models.ProfileGroup.where({ profile_id: req.query.id })
            .fetchAll({ withRelated: ['groups'] })
            .then(groups => {
              console.log(groups);
              res.status(201).send(groups);
            });
        });
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(err => {
      res.status(404).send(err);
    });
};

module.exports.addProfileGroup = (req, res) => {
  models.ProfileGroup.forge()
    .save({ 
      profile_id: req.query.pid,
      group_id: req.query.gid
    })
    .then(result => {
      res.status(201).send(result);
    })
    .catch(err => {
      if (err.constraint === 'groups_name_unique') {
        return res.status(403);
      }
      res.status(500).send(err);
    });
};