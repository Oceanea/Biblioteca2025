const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todas las ubicaciones
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM ubicaciones');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las ubicaciones' });
    }
});

// Crear una nueva ubicación
router.post('/', async (req, res) => {
    const { nombre_ubicaciones, piso, estante } = req.body;
    try {
        await db.query(
            'INSERT INTO ubicaciones (nombre_ubicaciones, piso, estante) VALUES ($1, $2, $3)',
            [nombre_ubicaciones, piso, estante]
        );
        res.status(201).json({ message: 'Ubicación creada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la ubicación' });
    }
});

// Obtener una ubicación por id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM ubicaciones WHERE id_ubicaciones = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Ubicación no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al buscar la ubicación' });
    }
});

// Actualizar una ubicación
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre_ubicaciones, piso, estante } = req.body;
    try {
        await db.query(
            'UPDATE ubicaciones SET nombre_ubicaciones=$1, piso=$2, estante=$3 WHERE id_ubicaciones=$4',
            [nombre_ubicaciones, piso, estante, id]
        );
        res.json({ message: 'Ubicación actualizada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la ubicación' });
    }
});

// Eliminar una ubicación
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM ubicaciones WHERE id_ubicaciones = $1', [id]);
        res.json({ message: 'Ubicación eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la ubicación' });
    }
});

module.exports = router;