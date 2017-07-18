const models = require('../../db/models');

module.exports.postMessage = (req, res) => {
  models.Message.forge({ 
    text: req.body.text,
    profile_id: req.params.id,
    channel_id: req.body.channel_id
  }).save()
    .then(message => {
      res.status(201).send(message);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports.getMessages = (req, res) => {
  models.Profile.where({ channel_id: req.body.channel_id }).fetchAll()
    .then(messages => {
      res.status(200).send(profiles);
    })
    .catch(err => {
      res.status(503).send(err);
    });
};