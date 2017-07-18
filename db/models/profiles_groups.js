const db = require('../');

const Profile_Group = db.Model.extend({
  tableName: 'users_groups',
});

module.exports = db.model('Profile_Group', Profile_Group);