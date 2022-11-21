const router = require('express').Router();
const { Blogs } = require('../../models');

router.post('/newblog', async (req, res) => {
    try {
        console.log(req.body.post_name);
        const userBlogData = await Blogs.create({
            ...req.body,
            author_id: req.session.user_id
        });


        res.redirect('/dashboard');
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;