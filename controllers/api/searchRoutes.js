const router = require('express').Router();



router.get('/search',async (req,res)=>{
  try {
      const airportData = await Airport.findAll()
      res.status(200).json(airportData);
  } catch (err) {res.status(500).json(err)}
});

module.exports = router;
