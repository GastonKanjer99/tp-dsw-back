const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Background = sequelize.define('Background', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT
    }
  });

  return Background;
};