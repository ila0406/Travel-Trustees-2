const sequelize = require('../config/connection');
const { User, Reviews, Airport, Country, Covid, Safety, Weather, Searches } = require('../models');

const userData = require('./userData.json');
const reviewData = require('./reviewData.json');
const airportData = require('./airportData.json');
const countryCodeData = require('./countryCodeData.json');
const covidData = require('./covidData.json');
const safetyData = require('./safetyData.json');
const weatherData = require('./weatherData.json');
const testSeed = require('./testUserSeed.json');


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
  await Covid.bulkCreate(covidData);
  await Safety.bulkCreate(safetyData);
  await Weather.bulkCreate(weatherData);
  await Searches.bulkCreate(testSeed);

  process.exit(0);
};

seedDatabase();
