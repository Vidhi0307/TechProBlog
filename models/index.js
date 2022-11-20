const User = require('./User');
const Blogs = require('./Blogs');
const Comments = require('./Comments');

User.hasMany(Blogs, {
  foreignKey: 'author_id',
  onDelete: 'CASCADE'
});
Blogs.hasMany(Comments, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE'
});

Blogs.belongsTo(User, {
  foreignKey: 'author_id'
});

Comments.belongsTo(Blogs, {
  foreignKey: 'blog_id'
});

module.exports = { User, Blogs, Comments };
