const url = require('url');
let knex;

// make updates based on config
if (process.env.DATABASE_URL) {
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  config = {
    client: 'postgresql',
    connection: {
      database: params.pathname.split('/')[1],
      user: auth[0],
      password: auth[1],
      host: params.hostname, 
      port: params.port,
      ssl: true
    },
    pool: {
      min: 1,
      max: 2
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'db/migrations'
    },
    seeds: {
      directory: 'db/seeds'
    }
  };

  knex = require('knex')(config);
} else {
  knex = require('knex')(require('../knexfile'));
}



const db = require('bookshelf')(knex);

db.plugin('registry');

module.exports = db;
