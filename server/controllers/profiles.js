const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.Profile.fetchAll()
    .then(profiles => {
      res.status(200).send(profiles);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

// module.exports.create = (req, res) => {
//   models.Profile.forge({ username: req.body.username, password: req.body.password })
//     .save()
//     .then(result => {
//       res.status(201).send(result.omit('password'));
//     })
//     .catch(err => {
//       if (err.constraint === 'users_username_unique') {
//         return res.status(403);
//       }
//       res.status(500).send(err);
//     });
// };

module.exports.getOne = (req, res) => {
  models.Profile.where({ id: req.params.id }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      res.status(200).send(profile);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.updateBio = (req, res) => {
  models.Profile.where({ id: req.params.id }).fetch()
    .then(profile => {
      var aboutMe = req.query.bio ? req.query.bio : profile.attributes.aboutMe;
      var nickname = req.query.nickname ? req.query.nickname : profile.attributes.nickname;
      let profileInfo = {
        first: profile.attributes.first,
        last: profile.attributes.last,
        display: profile.attributes.display,
        email: profile.attributes.email,
        profilePic: profile.attributes.profilePic,
        aboutMe: aboutMe,
        nickname: nickname
      };
        //update profile with info with bio
      profile.save(profileInfo, { method: 'update' })
        .then(() => {
          models.Profile.where({ id: req.params.id}).fetch()
            .then(profile => {
              res.status(201).send(profile);
            }); 
        })
        .catch(err => {
          res.status(500).send(err);
        });  
      // res.status(201).send(profile);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => res.sendStatus(404));
};

// module.exports.deleteOne = (req, res) => {
//   models.Profile.where({ id: req.params.id }).fetch()
//     .then(profile => {
//       if (!profile) {
//         throw profile;
//       }
//       return profile.destroy();
//     })
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .error(err => {
//       res.status(503).send(err);
//     })
//     .catch(() => {
//       res.sendStatus(404);
//     });