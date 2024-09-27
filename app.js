const express = require('express');
const path = require('path');
const productRoutes = require('./routes/productRoutes');
const pool = require('./db'); // Importar la conexion a la base de datos
const app = express();
const PORT = 3000;

// Middleware para analizar solicitudes JSON
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/productos', productRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});