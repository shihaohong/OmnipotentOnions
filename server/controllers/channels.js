const models = require('../../db/models');

module.exports.createChannel = (req, res) => {
  models.Channel.forge({
    name: req.params.id,
    group_id: req.query.group_id,
    shortID: req.query.shortID
  })
    .save()
    .then(() => {
      models.Channel.where({ group_id: req.query.group_id }).fetchAll()
        .then(channels => {
          res.status(201).send(channels);          
        })
        .catch(err => {
          res.status(500).send(err);
        });
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports.getGroupChannels = (req, res) => {
  models.Channel.where({ group_id: req.params.id }).fetchAll()
    .then(channels => {
      res.status(200).send(channels);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

// module.exports.getChannel = (req, res) => {
//   models.Channel.where({ channel_id: req.params.channelId }).fetch()
//     .then(channel => {
//       res.status(200).send(channel);
//     })
//     .catch(err => {
//       res.status(503).send(err);
//     });
// };