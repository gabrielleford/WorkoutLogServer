const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'postgres://postgres:IS~SG&04*26;15@localhost:5432/workout-server'
);

module.exports = sequelize;