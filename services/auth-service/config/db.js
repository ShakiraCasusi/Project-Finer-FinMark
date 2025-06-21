const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('finmark', 'postgres', 'password', {
  host: 'finer-db',       
  dialect: 'postgres',
});

module.exports = sequelize;
