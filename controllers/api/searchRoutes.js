const router = require('express').Router();
const { Airport, Country, Covid, Safety, Weather, Searches } = require('../../models');
const withAuth = require('../../utils/auth');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/country', async (req, res) => {
    try {
        const airportData = await Country.findAll()
        res.status(200).json(airportData);
    } catch (err) { res.status(500).json(err) }
});

router.get('/iata/:Country/:city', async (req, res) => {
    try {
        const iataData = await Airport.findAll({
            where: {
                Country: req.params.Country,
                city: {
                    [Op.like]: '%' + req.params.city + '%'
                }
            }
        });
        if (!iataData) {
            res.status(404).json({ message: 'No matching airports found' });
            return;
        }

        res.json(iataData);

    } catch (err) { res.status(500).json(err) }
});

router.get('/countryCode/:Country', async (req,res)=>{
    try {
        console.log('getting country code')
        const countryCode = await Country.findAll({where: {Country: req.params.Country}})



        if (!countryCode){
            res.status(404).json({message: 'No matching country found'});
            return;
        }

        res.json(countryCode)
    } catch (err) {res.status(500).json(err)}
});

router.get('/', withAuth, async (req, res) => {
    try {
        const airportData = await Airport.findAll()
        const countryData = await Country.findAll()
        const covidData = await Covid.findAll()
        const safetyData = await Safety.findAll()
        const weatherData = await Weather.findAll()
        const allData = [airportData && countryData && covidData && safetyData && weatherData]

        res.status(200).json(allData);
    } catch (err) { res.status(500).json(err) }
});

router.post('/search', withAuth, async (req, res) => {

    try {
        const newAirportData = await Airport.Create({
            ...req.body
        })
        const newCountryData = await Country.Create({
            ...req.body
        })
        const newCovidData = await Covid.Create({
            ...req.body
        })
        const newSafetyData = await Safety.Create({
            ...req.body
        })
        const newWeatherData = await Weather.Create({
            ...req.body
        })
        const allNewData = [newAirportData && newCountryData && newCovidData && newSafetyData && newWeatherData]

        res.status(200).json(allNewData);
    } catch (err) { res.status(500).json(err) }
});

router.get('/search/:id', withAuth, async (req, res) => {
    try {
        const searchData = await Searches.findByPk({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!searchData) {
            res.status(404).json({ message: 'No Previous Searches found with this id!' });
            return;
        }

        res.status(200).json(searchData);
    } catch (err) { res.status(500).json(err) }
});

router.put('/search/:id', withAuth, async (req, res) => {
    try {

    } catch (err) { res.status(500).json(err) }
});

router.delete('/search/:id', withAuth, async (req, res) => {
    try {
        const searchData = await Searches.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!searchData) {
            res.status(404).json({ message: 'No Previous Searches found with this id!' });
            return;
        }

        res.status(200).json(searchData);

    } catch (err) { res.status(500).json(err) }
});



module.exports = router;