const router = require('express').Router();
const userRoutes = require('./userRoutes');
const reviewsRoutes = require('./reviewsRoutes');
const resultsRoutes = require('./resultsRoutes')


// Full Route /api/...
router.use('/users', userRoutes);
router.use('/reviews', reviewsRoutes);
router.use('/results', resultsRoutes);

module.exports = router;
