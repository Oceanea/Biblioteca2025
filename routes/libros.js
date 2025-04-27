const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todas las editoriales
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM editoriales');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las editoriales' });
    }
});

// Crear una nueva editorial
router.post('/', async (req, res) => {
    const { nombre_editorial, fecha_de_fundacion, pais } = req.body;
    try {
        await db.query(
            'INSERT INTO editoriales (nombre_editorial, fecha_de_fundacion, pais) VALUES ($1, $2, $3)',
            [nombre_editorial, fecha_de_fundacion, pais]
        );
        res.status(201).json({ message: 'Editorial creada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la editorial' });
    }
});

// Obtener una editorial por id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM editoriales WHERE id_editorial = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Editorial no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al buscar la editorial' });
    }
});

// Actualizar una editorial
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre_editorial, fecha_de_fundacion, pais } = req.body;
    try {
        await db.query(
            'UPDATE editoriales SET nombre_editorial=$1, fecha_de_fundacion=$2, pais=$3 WHERE id_editorial=$4',
            [nombre_editorial, fecha_de_fundacion, pais, id]
        );
        res.json({ message: 'Editorial actualizada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la editorial' });
    }
});

// Eliminar una editorial
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM editoriales WHERE id_editorial = $1', [id]);
        res.json({ message: 'Editorial eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la editorial' });
    }
});

module.exports = router;