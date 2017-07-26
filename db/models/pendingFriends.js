const db = require('../');
const PendingFriends = db.Model.extend({
  tableName: 'pending_friend_requests',
  user: function() {
    return this.belongsTo('Profile', 'profile_id', 'id');
  },
  friend: function() {
    return this.belongsTo('Profile', 'friend_id', 'id');
  }
});

module.exports = db.model('PendingFriends', PendingFriends);