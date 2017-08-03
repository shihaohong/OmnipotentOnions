const models = require('../../db/models');

module.exports.createGroup = (req, res) => {
  console.log('Im in create Groups ', req.query);
  console.log('Im in create Groups ', req.params.id);
  models.Group.forge()
    .save({ 
      name: req.params.id,
      shortID: req.query.shortID
    })
    .then(group => {
      console.log('this is groups ', group);
      models.ProfileGroup.forge()
        .save({
          profile_id: req.query.id,
          group_id: group.id
        })
        .then(() => {
          models.ProfileGroup.where({ profile_id: req.query.id })
            .fetchAll({ withRelated: ['groups'] })
            .then(groups => {
              res.status(201).send(groups);
            });
        });
    })
    .catch(err => {
      if (err.constraint === 'groups_name_unique') {
        return res.status(403);
      }
      res.status(404).send(err);
    });
};

module.exports.fetchOneGroup = (req, res) => {
  models.Group.where({ id: req.params.id }).fetch()
    .then(oneGroup => {
      console.log('oneGroup ', oneGroup);
      if (oneGroup === null) {
        throw oneGroup;
      }
      res.status(200).send(oneGroup);
    })
    .catch(err => {
      res.status(404).send(err);
    });
};

