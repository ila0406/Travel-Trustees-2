const User = require('./User');
const Reviews = require('./Reviews');
const Covid = require('./Covid');
const Airport = require('./Airport');
const Weather = require('./Weather');
const Safety = require('./Safety');

User.hasMany(Reviews, { foreignKey: 'user_id' });

User.hasMany(Covid, { foreignKey: 'user_id' });

User.hasMany(Airport, { foreignKey: 'user_id' });

User.hasMany(Weather, { foreignKey: 'user_id' });

User.hasMany(Safety, { foreignKey: 'user_id' });

Reviews.belongsTo(User, { foreignKey: 'user_id' });

Covid.belongsTo(User, { foreignKey: 'user_id' });

Airport.belongsTo(User, { foreignKey: 'user_id' });

Weather.belongsTo(User, { foreignKey: 'user_id' });

Safety.belongsTo(User, { foreignKey: 'user_id' });

module.exports = { User, Reviews, Covid, Airport, Weather, Safety };