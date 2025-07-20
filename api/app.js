require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');
const db = require('./src/models');
const errorHandler = require('./src/middlewares/errorHandler');
const logger = require('./src/utils/logger');
const app = express();



app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.use(errorHandler); //Middleware de manejo de errores

// Sincroniza modelos con la base de datos
db.sequelize.sync({ alter: true }) // o { force: true } para forzar borrado y recreación de tablas
  .then(() => {
    logger.info('Tablas sincronizadas con éxito');
    app.listen(process.env.APP_PORT, () => {
      logger.debug(`Servidor escuchando en puerto ${process.env.APP_PORT}`);
    });
  })
  .catch(err => {
    logger.error('Error al sincronizar la DB:', err);
  });


