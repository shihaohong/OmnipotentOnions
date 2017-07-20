const db = require('../');
const ProfileGroup = db.Model.extend({
  tableName: 'profiles_groups',
  // profiles: () => {
  //   return this.belongsTo('Profile');
  // },
  groups: function() {
    console.log('models/profilesGroup: ', this.belongsTo);
    return this.belongsTo('Group');
  }
});

module.exports = db.model('ProfileGroup', ProfileGroup);