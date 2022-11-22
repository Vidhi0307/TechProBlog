const router = require('express').Router();
const { Blogs, User, Comments } = require('../models');
const withAuth = require('../utils/auth');



//route for homepage
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogsData = await Blogs.findAll({
      include: { model: User }
    });
    // Serialize data so the template can read it
    const blogsInfo = blogsData.map((blogs) => blogs.get({ plain: true }));
    console.log(blogsInfo);
    // Pass serialized data and session flag into template
    console.log("session id on homedpage" + req.session.logged_in)

    var activeUser;
    console.log(req.session.user_id);
    if (req.session.user_id) {
      console.log("Hello")
      const userData = await User.findByPk(req.session.user_id);

      const user = userData.get({ plain: true });

      activeUser = user;
    }

    res.render('homepage', {
      blogsInfo,
      activeUser,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//route for dashboard
router.get('/dashboard', async (req, res) => {
  try {

    console.log(req.session.user_id);
    const myblogs = await Blogs.findAll({
      where: {
        author_Id: req.session.user_id
      }
    });
    const myblogsInfo = myblogs.map((blogs) => blogs.get({ plain: true }));
    var activeUser;
    console.log(req.session.user_id);
    if (req.session.user_id) {
      console.log("Hello")
      const userData = await User.findByPk(req.session.user_id);

      const user = userData.get({ plain: true });

      activeUser = user;
    }
    res.render('dashboard', {
      myblogsInfo,
      activeUser,
      logged_in: req.session.logged_in
    });


  } catch (err) {

    res.status(500).json(err);
  }
});


router.get('/postblog', async (req, res) => {
  try {

    res.render('createpost', {
      logged_in: req.session.logged_in
    });

  } catch (err) {

    res.status(500).json(err);
  }
});


router.get('/blogs/:id', async (req, res) => {
  try {

    const blogData = await Blogs.findByPk(req.params.id, {
      include: { model: User }
    });

    if (!blogData) {
      res.redirect('/404');
    }
    const blog = blogData.get({ plain: true });

    res.render('blogview', {
      blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/myblogs/:id', async (req, res) => {
  try {

    const blogData = await Blogs.findByPk(req.params.id, {
      include: { model: User }
    });

    if (!blogData) {
      res.redirect('/404');
    }
    const blog = blogData.get({ plain: true });

    res.render('modifyblog', {
      blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



/* router.get('/:id', async (req, res) => {
  try {
    console.log("HEYYYYYYYY Vidhi" + req.params.id)
    const blogData = await Blogs.findByPk(req.params.id, {
      include: { model: User }
    });

    if (!blogData) {
      res.redirect('/404');
    }
    const blog = blogData.get({ plain: true });

    res.render('modifyblog', {
      blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
}); */

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');

});


router.get('/signup', (req, res) => {


  res.render('signup');
});



module.exports = router;
