const db = require('../');

const User = db.Model.extend({
  tableName: 'users',
});

module.exports = db.Model('User', User);