const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los autores
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM autores');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los autores' });
    }
});

// Crear un nuevo autor
router.post('/', async (req, res) => {
    const { nombre_autores, apellido_autores, fecha_de_nacimiento, nacionalidad } = req.body;
    try {
        await db.query(
            'INSERT INTO autores (nombre_autores, apellido_autores, fecha_de_nacimiento, nacionalidad) VALUES ($1, $2, $3, $4)',
            [nombre_autores, apellido_autores, fecha_de_nacimiento, nacionalidad]
        );
        res.status(201).json({ message: 'Autor creado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el autor' });
    }
});

// Obtener un autor por id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM autores WHERE id_autores = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Autor no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al buscar el autor' });
    }
});

// Actualizar un autor
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre_autores, apellido_autores, fecha_de_nacimiento, nacionalidad } = req.body;
    try {
        await db.query(
            'UPDATE autores SET nombre_autores=$1, apellido_autores=$2, fecha_de_nacimiento=$3, nacionalidad=$4 WHERE id_autores=$5',
            [nombre_autores, apellido_autores, fecha_de_nacimiento, nacionalidad, id]
        );
        res.json({ message: 'Autor actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el autor' });
    }
});

// Eliminar un autor
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM autores WHERE id_autores = $1', [id]);
        res.json({ message: 'Autor eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el autor' });
    }
});

module.exports = router;