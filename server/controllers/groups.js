const models = require('../../db/models');

// module.exports.getAll = (req, res) => {
//   models.Group.fetchAll()
//     .then(groups => {
//       res.status(200).send(profiles);
//     })
//     .catch(err => {
//       res.status(503).send(err);
//     });
// };

module.exports.create = (req, res) => {
  models.Group.forge({ name: req.body.name })
  .save()
  .then(result => {
    res.status(201).send(result);
  })
  .catch(err => {
    if (err.constraint === 'groups_name_unique') {
      return res.status(403);
    }
    res.status(500).send(err);
  });
};