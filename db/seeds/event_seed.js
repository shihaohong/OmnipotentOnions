const models = require('../models');

exports.seed = function (knex, Promise) {
  return Promise.join(knex('events').del(),
	
    knex('events').insert({
      eventName: 'OmniChat Party',
      location: '944 Market St. San Francisco',
      startTime: '16:00',
      startDate: '2017-07-30',
      endTime: '22:00',
      endDate: '2017-07-30',
      detail: 'Ogres are like onions',
    })
  );
};