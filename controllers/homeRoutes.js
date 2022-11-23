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

    // Pass serialized data and session flag into template


    var activeUser;

    if (req.session.user_id) {

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
router.get('/dashboard', withAuth, async (req, res) => {
  try {

    console.log(req.session.user_id);
    const myblogs = await Blogs.findAll({
      where: {
        author_Id: req.session.user_id
      }
    });
    const myblogsInfo = myblogs.map((blogs) => blogs.get({ plain: true }));

    var activeUser;

    if (req.session.user_id) {

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
    res.status(200).json("success");
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/blogs/:id', async (req, res) => {
  try {

    const blogData = await Blogs.findByPk(req.params.id, {
      include: { model: User }
    });
    //console.log(blogData);
    if (!blogData) {
      res.redirect('/404');
    }
    const blog = blogData.get({ plain: true });


    const commentData = await Comments.findAll({
      include: { model: User },
      where: {
        blog_id: req.params.id,
      }
    });
    const commentsData = commentData.map((comments) => comments.get({ plain: true }));


    console.log("Comment data" + commentsData);
    res.render('blogview', {
      blog,
      commentsData,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err)
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
