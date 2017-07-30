const models = require('../../db/models');

module.exports.createMessage = (req, res) => {
  models.Message.forge({ 
    text: req.params.id,
    profile_id: req.query.profile_id,
    channel_id: req.query.channel_id
  }).save()
    .then(() => {
      // res.status(201).send(message);
      models.Message.where({channel_id: req.query.channel_id}).fetchAll()
        .then(message => {
          // console.log(message, 'CREATE MESSAGE');
          res.status(201).send(message);
        });
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports.getMessages = (req, res) => {
  models.Message.where({ channel_id: req.params.id }).fetchAll({ withRelated: ['profile']})
    .then(messages => {
      res.status(200).send(messages);
    })
    .catch(err => {
      console.log('ERRRRRRRRRR: ', err);
      res.status(503).send(err);
    });
};