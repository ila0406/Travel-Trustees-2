const router = require('express').Router();
const userRoutes = require('./userRoutes');
const reviewsRoutes = require('./reviewsRoutes');
const searchRoutes = require('./searchRoutes')

router.use('/users', userRoutes);
router.use('/reviews', reviewsRoutes);
router.use('/search', searchRoutes);

module.exports = router;
