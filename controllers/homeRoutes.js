const router = require('express').Router();
const { Blogs, User } = require('../models');
const withAuth = require('../utils/auth');



//route for homepage
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogsData = await Blogs.findAll({
      include: [
        {
          model: User,
          attributes: [
            'name',
          ],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogsInfo = blogsData.map((blogs) => blogs.get({ plain: true }));

    // Pass serialized data and session flag into template

    res.render('homepage', {
      blogsInfo,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(blogsInfo);
    res.status(500).json(err);
  }
});



router.get('/dashboard', async (req, res) => {
  try {
    console.log("hello");
    res.render('dashboard', {

      logged_in: req.session.logged_in
    });

  } catch (err) {
    console.log("hello");
    res.status(500).json(err);
  }
});


router.get('/postblog', async (req, res) => {
  try {
    console.log("hello");
    res.render('createpost', {

      logged_in: req.session.logged_in
    });

  } catch (err) {
    console.log("hello");
    res.status(500).json(err);
  }
});





router.get('/blogs/:id', async (req, res) => {
  try {
    console.log("hello");
    const blogData = await Blogs.findByPk(req.params.id, {
      include: [
        {
          model: Comments,
          attributes: ['comment', 'user_id'],
        },
      ],
    });


    if (!blogData) {
      res.redirect('/404');
    }
    const blog = blogData.get({ plain: true });
    const user_id = blog.Comments.user_id;
    var correctUser = false;

    if (req.session.user_id == user_id) {
      correctUser = true
    };

    res.render('blogview', {
      blog,
      correctUser,
      logged_in: req.session.logged_in
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


router.get('/signup', (req, res) => {


  res.render('signup');
});



module.exports = router;
