const { Sequelize } = require('sequelize');
require('dotenv').config();
//const errorHandler = require('./middlewares/errorHandler');
const logger = require('../utils/logger');


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

const Race = require('./race')(sequelize);

async function testConnection() {
  try {
    await sequelize.authenticate();
    logger.info('Conexión con la base de datos exitosa');
  } catch (error) {
    logger.error('No se pudo conectar a la base de datos:', error);
  }
}
testConnection();

module.exports = { sequelize, Race };