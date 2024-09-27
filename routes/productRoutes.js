const express = require('express');
const router = express.Router();

// Ejemplo de lista de productos (esto se puede obtener de una base de datos)
let productos = [
    { id: 1, nombre: 'Celular XYZ', precio: 299},
    { id: 2, nombre: 'Laptop ABC', precio: 799},
];

// Obtener todos los productos
router.get('/', (req, res) => {
    res.json(productos);
});

// Agregar un nuevo producto
router.post('/', (req, res) => {
    const nuevoProducto = req.body;

    // Validaciones
    const errors = [];

    // Validar ID
    if (typeof nuevoProducto.id !== 'number' || nuevoProducto.id <= 0) {
        error.push('El ID debe de ser un número positivo.');
    }

    // Validar Nombre
    if (!nuevoProducto.nombre || typeof nuevoProducto.nombre !== 'string') {
        error.push('El nombre es oblogatorio y debe ser una cadena.');
    }

    // Validar Precio
    if (typeof nuevoProducto.precio !== 'number' || nuevoProducto.precio <= 0) {
        error.push('El precio debe ser un número positivo.');
    }

    // Si hay errores, responder con un estado 400 y el mensaje errores
    if (errors.length > 0) {
        return res.status(400).json({ errores });
    }

    // Si no hay errores, agregar el producto
    productos.push(nuevoProducto);
    console.log('Producto recibido:', nuevoProducto);
    res.status(201).json(nuevoProducto);
});

module.exports = router;