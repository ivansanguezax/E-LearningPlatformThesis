// Importaciones necesarias
import { app } from './app';
import connectDB from './utils/db';
require('dotenv').config();

// Puerto obtenido de las variables de entorno o uso del puerto 3000 por defecto
const PORT = process.env.PORT || 3000;

// Creación del servidor y conexión a la base de datos
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});
