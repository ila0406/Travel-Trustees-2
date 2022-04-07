const sequelize = require('../config/connection');
const { User, Reviews, Airport, Country, Covid, Safety, Weather } = require('../models');

const userData = require('./userData.json');
const reviewData = require('./reviewData.json');
const airportData = require('./airportData.json');
const countryCodeData = require('./countryCodeData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const reviews of reviewData) {
    await Reviews.create({
      ...reviews,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  await Airport.bulkCreate(airportData);
  await Country.bulkCreate(countryCodeData);


  process.exit(0);
};

seedDatabase();
