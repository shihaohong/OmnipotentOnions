const db = require('../');

const Attendee = db.Model.extend({
  tableName: 'attendees',
  profile: function() {
    return this.belongsTo('Profile');
  },
  event: function() {
    return this.belongsTo('Event');
  }
});

module.exports = db.model('Attendee', Attendee);