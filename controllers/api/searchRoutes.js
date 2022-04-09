const {Airport, Country} = require('../../models/')
const router = require('express').Router();

router.get('/',async (req,res)=>{
  try {
      const airportData = await Country.findAll()
      res.status(200).json(airportData);
  } catch (err) {res.status(500).json(err)}
});

module.exports = router;
