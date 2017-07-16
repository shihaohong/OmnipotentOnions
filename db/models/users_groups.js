const db = require('../');

const User_Group = db.Model.extend({
  tableName: 'users_groups',
});

module.exports = db.model('User_Group', User_Group);