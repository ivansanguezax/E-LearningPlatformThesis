// Importa las dependencias necesarias
import { Response } from "express";
import UserModel from "../models/user.model"; // Importa el modelo de usuario

// Función para obtener un usuario por ID
export const getUserById = async (id: string, res: Response) => {
  try {
    // Busca un usuario en la base de datos por su ID
    const user = await UserModel.findById(id);

    // Verifica si el usuario no fue encontrado en la base de datos
    if (!user) {
      // Si no se encuentra el usuario, responde con un código 404 y un mensaje de error
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado",
      });
    }

    // Si se encuentra el usuario, responde con un código 200 y el usuario encontrado
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
