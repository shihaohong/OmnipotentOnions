const db = require('../');

const Channel = db.Model.extend({
  tableName: 'channels',
  group: () => {
    return this.belongsTo('Group');
  }
});

module.exports = db.model('Channel', Channel);