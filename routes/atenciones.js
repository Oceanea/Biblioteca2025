const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todas las atenciones
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM atenciones');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las atenciones' });
    }
});

// Crear una nueva atencion
router.post('/', async (req, res) => {
    const { id_usuarios, fecha_atencion, tipo_atencion, descripcion, resultado } = req.body;
    try {
        await db.query(
            'INSERT INTO atenciones (id_usuarios, fecha_atencion, tipo_atencion, descripcion, resultado) VALUES ($1, $2, $3, $4, $5)',
            [id_usuarios, fecha_atencion, tipo_atencion, descripcion, resultado]
        );
        res.status(201).json({ message: 'Atención creada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la atención' });
    }
});

// Obtener una atención por id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM atenciones WHERE id_atencion = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Atención no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al buscar la atención' });
    }
});

// Actualizar una atención
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { id_usuarios, fecha_atencion, tipo_atencion, descripcion, resultado } = req.body;
    try {
        await db.query(
            'UPDATE atenciones SET id_usuarios=$1, fecha_atencion=$2, tipo_atencion=$3, descripcion=$4, resultado=$5 WHERE id_atencion=$6',
            [id_usuarios, fecha_atencion, tipo_atencion, descripcion, resultado, id]
        );
        res.json({ message: 'Atención actualizada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la atención' });
    }
});

// Eliminar una atención
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM atenciones WHERE id_atencion = $1', [id]);
        res.json({ message: 'Atención eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la atención' });
    }
});

module.exports = router;