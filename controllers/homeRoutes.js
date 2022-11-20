const router = require('express').Router();
const { Blogs, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogsData = await Blogs.findAll({
      include: { model: User }
    });

    // Serialize data so the template can read it
    const blogsInfo = blogsData.map((blogs) => blogs.get({ plain: true }));

    // Pass serialized data and session flag into template

    res.render('homepage', {
      blogsInfo,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    /*     const projectData = await Blogs.findByPk(req.params.id, {
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        });
    
        const project = projectData.get({ plain: true });
    
        res.render('project', {
          ...project,
          logged_in: req.session.logged_in
        }); */
    req.sessionID("Hello");
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


router.get('/signup', (req, res) => {


  res.render('signup');
});



module.exports = router;
