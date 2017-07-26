const models = require('../../db/models');

module.exports.getAllPendingFriends = (req, res) => {
  models.PendingFriends.where({ friend_id: req.params.id }).fetchAll( { withRelated: ['user'] } )
    .then(requests => {
      // console.log('controllers/pendingFriends: ', requests);
      res.status(200).send(requests);
    })
    .catch(err => {
      // console.log('controllers/profileFriends ERRR: ', err);
      res.status(503).send(err);
    });
};

module.exports.getAllFriendRequests = (req, res) => {
  models.PendingFriends.where({ profile_id: req.params.id }).fetchAll( { withRelated: ['friend'] } )
    .then(requests => {
      // console.log('controllers/pendingFriends/getAllFriendRequests: ', requests);
      res.status(200).send(requests);
    })
    .catch(err => {
      // console.log('controllers/pendingFriends/getAllFriendRequests ERRR: ', err);
      res.status(503).send(err);
    });
};

module.exports.sendFriendRequest = (req, res) => {
  // console.log('params:', req.params);
  // console.log('stuff', req.body.emailAddress);
  // first check profile page for the email

  models.Profile.where({ email: req.body.emailAddress }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      } 

      console.log(req.body.emailAddress, req.params.id);
      // check to see if user is already your friend
      models.ProfileFriends.where({ profile_id: req.params.id, friend_id: profile.id }).fetch()
        .then(result => {
          console.log('result: ', result.attributes.profile_id);
          console.log(typeof(req.params.id));
          if (result.attributes.profile_id === parseInt(req.params.id)) {
            throw { err: 'User is already your friend.'};
          } 
        })
        .catch(result => {
          models.PendingFriends.forge()
            .save({
              profile_id: req.params.id,
              friend_id: profile.id
            })
            .then(request => {
              res.status(201).send(request);
            })
            .catch(err => {
              res.status(500).send(err);
            });
        });
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports.cancelFriendRequest = (req, res) => {
  models.PendingFriends.where({ profile_id: req.params.id, friend_id: req.params.friendId }).destroy()
    .then(result => {
      console.log('has been deleted', result);
      res.status(204).send(result);
    })
    .catch(err => {
      console.log('failed delete', err);
      res.status(500).send(err);
    });
};