const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ResetToken = sequelize.define('ResetToken', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = ResetToken;
