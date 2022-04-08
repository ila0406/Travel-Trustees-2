const router = require('express').Router();
const {Airport} = require('../../models/Airport');


router.get('/search',async (req,res)=>{
    try {
        const airportData = await Airport.findAll()
        res.status(200).json(airportData);
        renderAirportData(airportData)
    } catch (err) {res.status(500).json(err)}
});


function renderAirportData(airportData) {

}