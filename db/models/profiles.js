const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths: function() {
    return this.hasMany('Auth');
  },
  friends: function() {
    return this.hasMany('ProfileFriends');
  }
});

module.exports = db.model('Profile', Profile);
