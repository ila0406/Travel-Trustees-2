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

Searches.hasMany(Airport, { foreignKey: 'airport_id'});
Searches.hasMany(Country, { foreignKey: 'country_id'});
Searches.hasMany(Covid, { foreignKey: 'covid_id'});
Searches.hasMany(Safety, { foreignKey: 'safety_id'});
Searches.hasMany(Weather, { foreignKey: 'weather_id'});

Reviews.belongsTo(User, { foreignKey: 'user_id' });

Searches.belongsTo(User, { foreignKey: 'user_id' });

Airport.belongsTo(Searches, { foreignKey: 'airport_id' });

Country.belongsTo(Searches, { foreignKey: 'country_id' });

Covid.belongsTo(Searches, { foreignKey: 'covid_id' });

Safety.belongsTo(Searches, { foreignKey: 'safety_id' });

Weather.belongsTo(Searches, { foreignKey: 'weather_id' });


module.exports = { User, Reviews, Covid, Airport, Weather, Safety, Country, Searches };