// db.js

const { Pool } = require('pg');

const pool = new Pool({
    user: 'Dardro', // Cambiar a usuario de postgress
    host: 'localhost',
    database: 'sist_venta', // Nombre de la base de datos
    password: 'AleCarpio11.', // Cambiar por la contraseña
    port: 5432,
});

module.exports = pool;