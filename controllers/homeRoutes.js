const router = require('express').Router();
const { Reviews, User, Results, Airport } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all reviews and JOIN with user data
    const reviewData = await Reviews.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const reviews = reviewData.map((review) => review.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      reviews, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/reviews/:id', async (req, res) => {
  try {
    const reviewData = await Reviews.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const review = reviewData.get({ plain: true });

    res.render('reviews', {
      ...review,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Reviews }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});


// route to go to a logged in user create review page
router.get('/review', withAuth, async (req, res)=> {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Reviews }],
    });

    const review = reviewData.get({ plain: true});

    res.render('review', {
      ...review,
      logged_in: true
    });

} catch (err){
  res.status(500).json(err);
}

});

router.get('/search', withAuth, async (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    const airportData = await Airport.findAll()
    const airports = airportData.map((data)=>data.get({plain: true}))
    res.render('search',{airports, logged_in: true})
    return;
  }

  res.render('login');
});




router.get('/results',  withAuth, async (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.render('results',{
    })
    return;
  }

  res.render('login');
});



module.exports = router;
