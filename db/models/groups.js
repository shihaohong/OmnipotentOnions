const db = require('../');

const Group = db.Model.extend({
  tableName: 'groups',
  profile: () => {
    return this.belongsTo('Profile');
  }
});

module.exports = db.model('Group', Group);

// 


