const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Race = sequelize.define('Race', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT
  }
});