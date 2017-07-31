const db = require('../');

const Event = db.Model.extend({
  tableName: 'events',
  group: function() {
    return this.belongsTo('Group');
  },
  creator: function() {
    return this.belongsTo('Profile');
  }
});

module.exports = db.model('Event', Event);
