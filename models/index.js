const User = require('./User');
const Reviews = require('./Reviews');
const Covid = require('./Covid');
const Airport = require('./Airport');
const Weather = require('./Weather');
const Safety = require('./Safety');

User.hasMany(Reviews, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Reviews.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Reviews, Covid, Airport, Weather, Safety };