const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los préstamos
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM prestamos');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los préstamos' });
    }
});

// Crear un nuevo préstamo
router.post('/', async (req, res) => {
    const { id_libro, id_usuarios, fecha_prestamo, fecha_devulucion, estado, fecha_retorno_estimada, dias_retardo } = req.body;
    try {
        await db.query(
            `INSERT INTO prestamos 
            (id_libro, id_usuarios, fecha_prestamo, fecha_devulucion, estado, fecha_retorno_estimada, dias_retardo)
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [id_libro, id_usuarios, fecha_prestamo, fecha_devulucion, estado, fecha_retorno_estimada, dias_retardo]
        );
        res.status(201).json({ message: 'Préstamo registrado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el préstamo' });
    }
});

// Actualizar estado de un préstamo
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { estado, fecha_devulucion, dias_retardo } = req.body;
    try {
        await db.query(
            `UPDATE prestamos 
            SET estado = $1, fecha_devulucion = $2, dias_retardo = $3
            WHERE id_prestamo = $4`,
            [estado, fecha_devulucion, dias_retardo, id]
        );
        res.json({ message: 'Préstamo actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el préstamo' });
    }
});

// Eliminar un préstamo
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM prestamos WHERE id_prestamo = $1', [id]);
        res.json({ message: 'Préstamo eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el préstamo' });
    }
});

module.exports = router;