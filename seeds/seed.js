const sequelize = require('../config/connection');
/* const { User, Blogs,Comments } = require('../models'); */

const seedUsers = require('./userData');
const seedBlogs = require('./blogsData');
/* const comments = require('./comments.json'); */

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUsers();

  console.log('\n----- user SEEDED -----\n');

  await seedBlogs();

  console.log('\n----- blog SEEDED-----\n');




  process.exit(0);
};

seedDatabase();
