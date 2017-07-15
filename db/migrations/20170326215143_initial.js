
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('profiles', function (table) {
      table.increments('id').unsigned().primary();
      table.string('first', 100).nullable();
      table.string('last', 100).nullable();
      table.string('display', 100).nullable();
      table.string('email', 100).nullable().unique();
      table.string('phone', 100).nullable();
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
    knex.schema.createTableIfNotExists('users', (t) => {
      t.increments('id').unsigned().primary();
      t.string('name').notNullable();
      t.string('token', 100).notNullable();
      t.string('salt', 100).nullable();
    }),
    knex.schema.createTableIfNotExists('groups', (t) => {
      t.increments('id').unsigned().primary();
      t.string('name').notNullable();
    }),
    knex.schema.createTableIfNotExists('users_groups', (t) => {
      t.integer('user_id').references('users.id').onDelete('CASCADE');
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
      t.integer('user_id').references('users.id').onDelete('CASCADE');
      t.integer('channel_id').references('channels.id').onDelete('CASCADE');
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('auths'),
    knex.schema.dropTable('profiles'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('groups'),
    knex.schema.dropTable('users_groups'),
    knex.schema.dropTable('channels'),
    knex.schema.dropTable('messages')
  ]);
};

