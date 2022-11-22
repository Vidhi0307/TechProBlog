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

router.get('/blogs/:id', async (req, res) => {
    try {
        const blogData = await Blogs.findByPk(req.params.id, {
            include: { model: User }
        });
        if (!blogData) {
            res.redirect('/404');
        }
        const blog = blogData.get({ plain: true });

        /*   var correctUser = false;
     
         if (req.session.user_id == user_id) {
           correctUser = true
         };  */

        res.render('modifyblog', {
            blog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {

        console.log("BLLLLLLLLLLLLLOOOOG id" + req.params.id)
        const blog = await Blogs.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!blog) {
            res.status(404).json({ message: 'No blog found with this id!' });
            return;
        }

        res.status(200).json("success");
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {

        console.log("PUT REQUEST" + req.body);
        const blog = await Blogs.update(req.body,
            /*  post_name: req.body.post_name,
             post_desc: req.body.post_desc */
            {
                where: {
                    id: req.params.id,
                },

            });

        if (!blog) {
            res.status(404).json({ message: 'No ads found with this id!' });
            return;
        }

        res.status(200).json(blog);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;