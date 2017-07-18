const models = require('../../db/models');

module.exports.createChannel = (req, res) => {
  models.Channel.forge({
    name: req.body.name,
    group_id: req.body.group_id
  })
    .save()
    .then(result => {
      res.status(201).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};