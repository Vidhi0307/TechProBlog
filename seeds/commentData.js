
const { Comments } = require('../models');

const blogsArray =
    [
        {
            "comment": "Very nice",
            "blog_id": 1,
            "user_id": 1,
        },

    ];
const seedComments = () => Blogs.bulkCreate(blogsArray, {
    individualHooks: true,
});

module.exports = seedComments;