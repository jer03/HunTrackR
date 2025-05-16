
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres'
  }
);

sequelize.authenticate()
  .then(() => console.log('DB connected!'))
  .catch(err => console.error('DB connection failed:', err));

module.exports = sequelize;
