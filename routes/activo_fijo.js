const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los activos fijos
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM activo_fijo');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los activos fijos' });
    }
});

// Crear un nuevo activo fijo
router.post('/', async (req, res) => {
    const { descripcion, fecha_adquisicion, estado, ubicacion, marca, valor } = req.body;
    try {
        await db.query(
            'INSERT INTO activo_fijo (descripcion, fecha_adquisicion, estado, ubicacion, marca, valor) VALUES ($1, $2, $3, $4, $5, $6)',
            [descripcion, fecha_adquisicion, estado, ubicacion, marca, valor]
        );
        res.status(201).json({ message: 'Activo fijo creado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el activo fijo' });
    }
});

// Obtener un activo fijo por id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM activo_fijo WHERE id_activo = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Activo fijo no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al buscar el activo fijo' });
    }
});

// Actualizar un activo fijo
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { descripcion, fecha_adquisicion, estado, ubicacion, marca, valor } = req.body;
    try {
        await db.query(
            'UPDATE activo_fijo SET descripcion=$1, fecha_adquisicion=$2, estado=$3, ubicacion=$4, marca=$5, valor=$6 WHERE id_activo=$7',
            [descripcion, fecha_adquisicion, estado, ubicacion, marca, valor, id]
        );
        res.json({ message: 'Activo fijo actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el activo fijo' });
    }
});

// Eliminar un activo fijo
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM activo_fijo WHERE id_activo = $1', [id]);
        res.json({ message: 'Activo fijo eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el activo fijo' });
    }
});

module.exports = router;