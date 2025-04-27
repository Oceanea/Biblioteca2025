const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM usuarios');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
    const { nombre, apellido, email, telefono, fecha_registro, direccion, tipo_usuario } = req.body;
    try {
        await db.query(
            'INSERT INTO usuarios (nombre, apellido, email, telefono, fecha_registro, direccion, tipo_usuario) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [nombre, apellido, email, telefono, fecha_registro, direccion, tipo_usuario]
        );
        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;