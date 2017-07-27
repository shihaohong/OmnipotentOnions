const db = require('../');

const Message = db.Model.extend({
  tableName: 'messages',
  profile: function() {
    return this.belongsTo('Profile');
  },
  channel: function() {
    return this.belongsTo('Channel');
  }
});

module.exports = db.model('Message', Message);


