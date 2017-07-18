const db = require('../');

const Message = db.Model.extend({
  tableName: 'messages',
  profile: () => {
    return this.belongsTo('Profile');
  },
  channel: () => {
    return this.belongsTo('Channel');
  }
});

module.exports = db.model('Message', Message);