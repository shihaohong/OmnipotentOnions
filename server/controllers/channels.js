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

module.exports.getGroupChannels = (req, res) => {
  console.log('controllers/channel REQ.PARAMS: ', req.params.id);
  models.Channel.where({ group_id: req.params.id }).fetchAll()
    .then(channels => {
      res.status(200).send(channels);
    })
    .catch(err => {
      res.status(503).send(err);
    });
};

module.exports.getChannel = (req, res) => {
  models.Channel.where({ channel_id: req.params.channelId }).fetch()
    .then(channel => {
      res.status(200).send(channel);
    })
    .catch(err => {
      res.status(503).send(err);
    });
};