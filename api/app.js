require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

const db = require('./src/models');

// Sincroniza modelos con la base de datos
db.sequelize.sync({ alter: true }) // o { force: true } para forzar el borrado y recreación
  .then(() => console.log('Tablas sincronizadas con éxito'))
  .catch(err => console.error('Error al sincronizar la DB:', err));
  

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
