const db = require('../');
const ProfileGroup = db.Model.extend({
  tableName: 'profiles_groups',
  groups: function() {
    return this.belongsTo('Group');
  }
});

module.exports = db.model('ProfileGroup', ProfileGroup);