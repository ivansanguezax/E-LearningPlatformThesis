// Importación de Redis desde 'ioredis' y configuración de variables de entorno
import { Redis } from 'ioredis';
require('dotenv').config();

/**
 * Función para obtener la configuración de conexión a Redis.
 * @returns Configuración de conexión a Redis o lanza un error si no está configurado.
 */
const getRedisConfig = (): string => {
    if (process.env.REDIS_URL) {
        console.log('Redis connected');
        return process.env.REDIS_URL;
    }
    // Lanza un error si no se proporciona la URL de conexión a Redis
    throw new Error('Redis not connected');
};

// Creación de la instancia de Redis utilizando la configuración obtenida
export const redis = new Redis(getRedisConfig());
