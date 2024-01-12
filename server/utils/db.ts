// Importación de Mongoose y configuración de variables de entorno
import mongoose from "mongoose";
require('dotenv').config();

// Obtención de la URL de la base de datos desde las variables de entorno
const dbUrl: string = process.env.DB_URL || '';

/**
 * Función asincrónica para conectar a la base de datos MongoDB.
 */
const connectDB = async () => {
    try {
        // Intenta conectar a la base de datos utilizando la URL proporcionada
        await mongoose.connect(dbUrl).then((data: any) => {
            console.log('DB connected');
        });
    } catch (error: any) {
        // Manejo de errores en caso de fallo de conexión
        console.log(error.message);
        // Intenta reconectar después de un intervalo de 5000 milisegundos (5 segundos)
        setTimeout(connectDB, 5000);
    }
};

// Exporta la función para su uso en otros módulos
export default connectDB;
