const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const autoresRoutes = require('./routes/autores');
const editorialesRoutes = require('./routes/editoriales');
const categoriasRoutes = require('./routes/categorias');
const ubicacionesRoutes = require('./routes/ubicaciones');
const librosRoutes = require('./routes/libros');
const prestamosRoutes = require('./routes/prestamos');
const activoFijoRoutes = require('./routes/activo_fijo');
const atencionesRoutes = require('./routes/atenciones');  // Importa la nueva ruta

app.use(cors());
app.use(bodyParser.json());

app.use('/api/autores', autoresRoutes);
app.use('/api/editoriales', editorialesRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/ubicaciones', ubicacionesRoutes);
app.use('/api/libros', librosRoutes);
app.use('/api/prestamos', prestamosRoutes);
app.use('/api/activo_fijo', activoFijoRoutes);
app.use('/api/atenciones', atencionesRoutes);  // Usa la ruta de atenciones

const port = 3000;
app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});