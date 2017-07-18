const db = require('../');

const Profile_Group = db.Model.extend({
  tableName: 'profiles_groups',
  profile: () => {
    return this.belongTo('Profile');
  },
  group: () => {
    return this.belongTo('Group');
  }
});

module.exports = db.model('Profile_Group', Profile_Group);