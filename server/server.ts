// Importaciones necesarias
import { app } from './app';
import connectDB from './utils/db';
import {v2 as cloudinary} from 'cloudinary';
require('dotenv').config();

// Configura Cloudinary con las credenciales proporcionadas en las variables de entorno
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRECT_KEY
});



// Puerto obtenido de las variables de entorno o uso del puerto 3000 por defecto
const PORT = process.env.PORT || 3000;

// Creación del servidor y conexión a la base de datos
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});
