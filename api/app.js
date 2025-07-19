require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');
const db = require('./src/models');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api', routes);


// Sincroniza modelos con la base de datos
db.sequelize.sync({ alter: true }) // o { force: true } para forzar el borrado y recreación
  .then(() => console.log('Tablas sincronizadas con éxito'))
  .catch(err => console.error('Error al sincronizar la DB:', err));

//   app.get('/races', async (req, res) => {
//   try {
//     const races = await db.Race.findAll();
//     res.json(races);
//   } catch (error) {
//     console.error('Error al obtener races:', error);
//     res.status(500).json({ error: 'Error al obtener races' });
//   }
// });


  

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
