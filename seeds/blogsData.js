
const { Blogs } = require('../models');

const blogsArray =
  [
    {
      "post_name": "Why MVC is so important",
      "post_desc": "A mobile app that will send you notifications whenever a concert is playing in your area.",
      "author_id": 1,
    },
    {
      "post_name": "Why MVC is so important",
      "post_desc": "A mobile app that will send you notifications whenever a concert is playing in your area.",
      "author_id": 2,
    },
    {
      "post_name": "Why MVC is so important",
      "post_desc": "A mobile app that will send you notifications whenever a concert is playing in your area.",
      "author_id": 3,
    }
  ];
const seedBlogs = () => Blogs.bulkCreate(blogsArray, {
  individualHooks: true,
});

module.exports = seedBlogs;