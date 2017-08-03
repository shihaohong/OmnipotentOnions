const models = require('../models');

exports.seed = function (knex, Promise) {
  return Promise.join(knex('groups').del(),
  //notice id was not placed in here because it creates its own id
    knex('groups').insert({
      name: 'Omnipotent Room',
      shortID: 'OMNI1234'
    })
  );
};