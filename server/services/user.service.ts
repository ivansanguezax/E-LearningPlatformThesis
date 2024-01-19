// Importa las dependencias necesarias
import { Response } from "express";
import UserModel from "../models/user.model"; // Importa el modelo de usuario
import { redis } from "../utils/redis";

// Función para obtener un usuario por ID
export const getUserById = async (id: string, res: Response) => {
  try {
    // Busca el usuario en la caché de Redis utilizando su ID
    const userJson = await redis.get(id);

    // Verifica si el usuario está presente en la caché de Redis
    if (userJson) {
      // Si está presente, convierte el JSON almacenado en la caché en un objeto de usuario
      const user = JSON.parse(userJson);

      // Responde con un código 200 y el usuario encontrado en la caché
      return res.status(200).json({
        status: "success",
        user,
      });
    }

    // Si el usuario no está en la caché, busca el usuario en la base de datos por su ID
    const user = await UserModel.findById(id);

    // Verifica si el usuario no fue encontrado en la base de datos
    if (!user) {
      // Si no se encuentra el usuario, responde con un código 404 y un mensaje de error
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado",
      });
    }

    // Si se encuentra el usuario en la base de datos, almacena la información en la caché de Redis
    await redis.set(id, JSON.stringify(user));

    // Responde con un código 200 y el usuario encontrado en la base de datos
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    // Manejo de errores en caso de fallo durante la búsqueda del usuario
    res.status(500).json({
      status: "error",
      message: "Error al buscar el usuario",
    });
  }
};
