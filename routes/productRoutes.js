const express = require('express');
const router = express.Router();
const pool = require('../db'); // Importar la conexión a la base de datos

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM productos');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

// Agregar un nuevo producto
router.post('/', async (req, res) => {
    const nuevoProducto = req.body;

    // Validaciones
    const errors = [];

    // Validar ID
    if (typeof nuevoProducto.id !== 'number' || nuevoProducto.id <= 0) {
        errors.push('El ID debe de ser un número positivo.');
    }

    // Validar Nombre
    if (!nuevoProducto.nombre || typeof nuevoProducto.nombre !== 'string') {
        errors.push('El nombre es obligatorio y debe ser una cadena.');
    }

    // Validar Precio
    if (typeof nuevoProducto.precio !== 'number' || nuevoProducto.precio <= 0) {
        errors.push('El precio debe ser un número positivo.');
    }

    // Si hay errores, responder con un estado 400 y el mensaje de errores
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // Si no hay errores, agregar el producto a la base de datos
    try {
        const result = await pool.query('INSERT INTO productos (nombre, precio) VALUES ($1, $2) RETURNING *', [nuevoProducto.nombre, nuevoProducto.precio]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar producto' });
    }
});

module.exports = router;