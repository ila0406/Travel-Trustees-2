const User = require('./User');
const Reviews = require('./Reviews');
const Covid = require('./Covid');
const Airport = require('./Airport');
const Weather = require('./Weather');
const Safety = require('./Safety');
const Country = require('./Country');
const Searches = require('./Searches');

User.hasMany(Reviews, { foreignKey: 'user_id' });
User.hasMany(Searches, { foreignKey: 'user_id' });

Searches.belongsTo(Airport, { foreignKey: 'airport_id'});
Searches.belongsTo(Country, { foreignKey: 'country_id'});
Searches.belongsTo(Covid, { foreignKey: 'covid_id'});
Searches.belongsTo(Safety, { foreignKey: 'safety_id'});
Searches.belongsTo(Weather, { foreignKey: 'weather_id'});

Reviews.belongsTo(User, { foreignKey: 'user_id' });

Searches.belongsTo(User, { foreignKey: 'user_id' });

Airport.hasMany(Searches, { foreignKey: 'airport_id' });

Country.hasMany(Searches, { foreignKey: 'country_id' });

Covid.hasMany(Searches, { foreignKey: 'covid_id' });

Safety.hasMany(Searches, { foreignKey: 'safety_id' });

Weather.hasMany(Searches, { foreignKey: 'weather_id' });


module.exports = { User, Reviews, Covid, Airport, Weather, Safety, Country, Searches };