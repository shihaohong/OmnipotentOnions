const models = require('../../db/models');

module.exports.createEvent = (req, res) => {
  // POST EVENT
  console.log(req.body);
  console.log(typeof req.params.groupId);
  models.Event.forge({
    eventName: req.body.eventName,
    location: req.body.location,
    group_id: req.params.groupId,
    creator: req.body.creator,
    startTime: req.body.startTime,
    startDate: req.body.startDate,
    endTime: req.body.endTime,
    endDate: req.body.endDate,
    detail: req.body.detail
  })
    .save()
    .then(event => {
      console.log('im inside events? ', event.id, event);
      models.Attendee.forge({
        event_id: event.id,
        profile_id: req.body.creator
      })
        .save()
        .then(attendee => {
          console.log('inside atttende ', attendee);
          models.Event.where({ group_id: req.params.groupId }).fetchAll()
            .then(events => {
              console.log('I GOT EVENTS WHERE GROUP ID MATCHES THE ONE GIVEN ', events);
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
//DELETE EVENT
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
  models.Event.where({ group_id: req.params.groupId }).fetchAll()
    .then(events => {
      res.status(200).send(events);
    })
    .error(err => {
      res.status(503).send(err);
    });
};

module.exports.fetchEvent = (req, res) => {
  models.Event.where ({ id: req.params.eventId }).fetch()
    .then(event => {
      res.status(200).send(event);
    })
    .error(err => {
      res.status(503).send(err);
    });
};