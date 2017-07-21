const models = require('../../db/models');

module.exports.postMessage = (req, res) => {
  models.Message.forge({ 
    text: req.body.text,
    profile_id: req.body.profileId,
    channel_id: req.params.id,
  }).save()
    .then(message => {
      models.Message.where({channel_id: message.channel_id}).fetchAll()
      .then(messages => res.status(201).send(messages));
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports.getMessages = (req, res) => {
  models.Message.where({ channel_id: req.params.id }).fetchAll()
    .then(messages => {
      res.status(200).send(messages);
    })
    .catch(err => {
      res.status(503).send(err);
    });
};