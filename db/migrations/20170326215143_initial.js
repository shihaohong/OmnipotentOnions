
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('profiles', function (table) {
      table.increments('id').unsigned().primary();
      table.string('first', 100).nullable();
      table.string('last', 100).nullable();
      table.string('display', 100).nullable();
      table.string('email', 100).nullable().unique();
      table.string('phone', 100).nullable();
      table.string('profilePic').nullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('auths', function(table) {
      table.increments('id').unsigned().primary();
      table.string('type', 8).notNullable();
      table.string('oauth_id', 30).nullable();
      table.string('password', 100).nullable();
      table.string('salt', 100).nullable();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
    }),
    knex.schema.createTableIfNotExists('groups', (t) => {
      t.increments('id').unsigned().primary();
      t.string('name').notNullable().unsigned();
      t.string('shortID').nullable().unique();
    }),
    knex.schema.createTableIfNotExists('profiles_groups', (t) => {
      t.increments('id').unsigned().primary();
      t.integer('profile_id').references('profiles.id').onDelete('CASCADE');
      t.integer('group_id').references('groups.id').onDelete('CASCADE');
    }),
    knex.schema.createTableIfNotExists('channels', (t) => {
      t.increments('id').unsigned().primary();
      t.string('name').notNullable();
      t.integer('group_id').references('groups.id').onDelete('CASCADE');
    }),
    knex.schema.createTableIfNotExists('messages', (t) => {
      t.increments('id').unsigned().primary();
      t.text('text').notNullable();
      t.timestamp('create_at').defaultTo(knex.fn.now());
      t.integer('profile_id').references('profiles.id').onDelete('CASCADE');
      t.integer('channel_id').references('channels.id').onDelete('CASCADE');
    })
  ]);
};

exports.down = function (knex, Promise) {
  // return Promise.all([
  //   knex.schema.dropTable('auths'),
  //   knex.schema.dropTable('profiles'),
  //   knex.schema.dropTable('groups'),
  //   knex.schema.dropTable('profiles_groups'),
  //   knex.schema.dropTable('channels'),
  //   knex.schema.dropTable('messages')
  // ]);
  return Promise.all([
    knex.raw('DROP TABLE if exists auths CASCADE'),
    knex.raw('DROP TABLE if exists profiles CASCADE'),
    knex.raw('DROP TABLE if exists groups CASCADE'),
    knex.raw('DROP TABLE if exists profiles_groups CASCADE'),
    knex.raw('DROP TABLE if exists channels CASCADE'),
    knex.raw('DROP TABLE if exists messages CASCADE')
  ]);

};

