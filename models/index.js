const User = require('./User');
const Reviews = require('./Reviews');
const Covid = require('./Covid');
const Airport = require('./Airport');
const Weather = require('./Weather');
const Safety = require('./Safety');
const Country = require('./Country');
const Searches = require('./Searches');

User.hasMany(Reviews, { foreignKey: 'user_id' });

Reviews.belongsTo(User, { foreignKey: 'user_id' });


module.exports = { User, Reviews, Covid, Airport, Weather, Safety, Country, Searches };