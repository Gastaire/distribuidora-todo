const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Rutas que sí existen y se van a utilizar
const productoRoutes = require('./src/routes/productos.routes');
const clienteRoutes = require('./src/routes/clientes.routes');
const authRoutes = require('./src/routes/auth.routes');
const pedidoRoutes = require('./src/routes/pedidos.routes');
const usuariosRoutes = require('./src/routes/usuarios.routes');
const dashboardRoutes = require('./src/routes/dashboard.routes');
const logRoutes = require('./src/routes/logs.routes');
const importRoutes = require('./src/routes/import.routes');


const app = express();
const PORT = process.env.API_PORT || 4000;

// --- Middlewares ---
// Se deja la configuración de CORS más simple, ya que Traefik se encarga del resto.
app.use(cors()); 
app.use(express.json());


// Ruta principal para verificar que la API está funcionando
app.get('/', (req, res) => {
  res.json({ message: "API de Distribuidora funcionando correctamente." });
});


// Usar todas las rutas de la API
app.use('/api', authRoutes);
app.use('/api', pedidoRoutes);
app.use('/api', productoRoutes);
app.use('/api', clienteRoutes);
app.use('/api', usuariosRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', logRoutes);
app.use('/api', importRoutes);


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
