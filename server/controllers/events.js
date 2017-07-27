const models = require('../../db/models');

module.exports.createEvent = (req, res) => {
  // POST EVENT
  models.Event.forge({
    date: req.body.date,
    address: req.body.address,
    group_id: req.params.groupId,
    creator: req.bodhy.profileId,
    time: req.body.time
  })
  .save()
  .then(event => {
    modles.Attendee.forge({
      event_id: event.id,
      profile_id: event.creator
    })
    .save()
    .then(attendee => {
      models.Event.where({ group_id: req.params.groupId }).fetchAll()
      .then(events => {
        res.status(201).send(events);
      })
      .error(err => {
        res.status(500).send(err);
      });
    });
  })
  .error(err => {
    res.status(500).send(err);
  });
};

module.exports.deleteEvent = (req, res) => {
  // DELETE EVENT
  models.Event.where({ id: req.body.eventId }).fetch()
    .then(event => {
      if (!event) {
        throw event;
      }
      event.destroy();
      models.Event.where({ group_id: req.params.groupId }).fetchAll()
      .then(events => {
        res.status(200).send(events);
      })
      .error(err => {
        res.state(503).send(err);
      });
    })
    .error(err => {
      res.status(503).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.fetchEvents = (req, res) => {
  models.Events.where({ group_id: req.params.groupId }).fetchAll()
  .then(events => {
    res.status(200).send(events);
  })
  .error(err => {
    res.status(503).send(err);
  });
};

module.exports.fetchEvent = (req, res) => {
  models.Events.where ({ id: req.params.eventId }).fetch()
  .then(event => {
    res.status(200).send(event);
  })
  .error(err => {
    res.status(503).send(err);
  });
};