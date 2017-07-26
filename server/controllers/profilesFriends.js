const models = require('../../db/models');

module.exports.getAllFriends = (req, res) => {
  models.ProfileFriends.where({ profile_id: req.params.id }).fetchAll( { withRelated: ['friend'] } )
    .then(friends => {
      // console.log('controllers/profileFriends: ', friends);
      res.status(200).send(friends);
    })
    .catch(err => {
      // console.log('controllers/profileFriends ERRRR: ', err);
      res.status(503).send(err);
    });
};

module.exports.addFriend = (req, res) => {
  models.ProfileFriends.forge()
    .save({
      profile_id: req.params.id,
      friend_id: req.params.friendId
    })
    .then(result => {
      models.ProfileFriends.forge()
        .save({
          profile_id: req.params.friendId,
          friend_id: req.params.id
        })
        .then(result => {
          models.PendingFriends.where({ profile_id: req.params.friendId, friend_id: req.params.id }).destroy()
            .then(result => {
              console.log('deleted from pending friends', result);
              res.status(200).send(result);
            })
            .catch(err => {
              console.log('fail delete from pending friends', err);
              res.status(500).send(err);
            });
        })
        .catch(err => {
          console.log('fail add to profile friends', err);
          res.status(500).send(err);
        });
    })
    .catch(err => {
      console.log('fail add to profile friends', err);
      res.status(500).send(err);
    });
};

module.exports.deleteFriend = (req, res) => {
  console.log('req params', req.params);
  models.ProfileFriends.where({ profile_id: req.params.id, friend_id: req.params.friendId }).destroy()
    .then(result => {
      models.ProfileFriends.where({ profile_id: req.params.friendId, friend_id: req.params.id }).destroy()
        .then(result => {
          res.status(200).send(result);
        })
        .catch(err => {
          res.status(500).send(err);
        });
    })
    .catch(err => {
      res.status(500).send(err);
    });
};