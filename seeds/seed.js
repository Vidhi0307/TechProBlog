const sequelize = require('../config/connection');
/* const { User, Blogs,Comments } = require('../models'); */

const seedUsers = require('./userData');
const seedBlogs = require('./blogsData');
const seedComments = require('./commentData');
/* const comments = require('./comments.json'); */

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUsers();

  console.log('\n----- user SEEDED -----\n');

  await seedBlogs();

  console.log('\n----- blog SEEDED-----\n');

  // await seedComments()


  process.exit(0);
};

seedDatabase();
