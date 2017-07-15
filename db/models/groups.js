const db = require('../');

const Group = db.Model.extend({
  tableName: 'groups',
});

module.exports = db.Model('Group', Group);