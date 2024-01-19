// get user by id
import { Response } from "express"
import UserModel from "../models/user.model"

export const gerUserById = async (id: string, res: Response) => {
    try {
      const user = await UserModel.findById(id);
  
      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "Usuario no encontrado",
        });
      }
  
      res.status(200).json({
        status: "success",
        user,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al buscar el usuario",
      });
    }
  };