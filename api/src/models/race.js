const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
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

  return Race;
};