const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todas las categorías
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM categorias');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las categorías' });
    }
});

// Crear una nueva categoría
router.post('/', async (req, res) => {
    const { nombre_categoria, descripcion } = req.body;
    try {
        await db.query(
            'INSERT INTO categorias (nombre_categoria, descripcion) VALUES ($1, $2)',
            [nombre_categoria, descripcion]
        );
        res.status(201).json({ message: 'Categoría creada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la categoría' });
    }
});

// Obtener una categoría por id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM categorias WHERE id_categoria = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al buscar la categoría' });
    }
});

// Actualizar una categoría
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre_categoria, descripcion } = req.body;
    try {
        await db.query(
            'UPDATE categorias SET nombre_categoria=$1, descripcion=$2 WHERE id_categoria=$3',
            [nombre_categoria, descripcion, id]
        );
        res.json({ message: 'Categoría actualizada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la categoría' });
    }
});

// Eliminar una categoría
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM categorias WHERE id_categoria = $1', [id]);
        res.json({ message: 'Categoría eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la categoría' });
    }
});

module.exports = router;