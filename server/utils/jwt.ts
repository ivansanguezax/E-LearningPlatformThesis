/**
 * Este módulo proporciona una función para enviar tokens de acceso y actualización al cliente,
 * junto con la configuración de cookies y la integración con Redis para almacenar información del usuario.
 */

// Importa la librería dotenv para cargar variables de entorno desde el archivo .env
require("dotenv").config();

// Importa la interfaz Response de Express y el modelo IUser
import { Response } from "express";
import { IUser } from "../models/user.model";

// Importa el objeto 'redis' desde el módulo './redis'
import { redis } from "./redis";

/**
 * Interfaz para las opciones de configuración de cookies.
 */
interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "none" | "strict" | "lax" | undefined;
  secure?: boolean;
}

/**
 * Función para enviar tokens de acceso y actualización al cliente.
 * @param user Objeto IUser representando al usuario.
 * @param statusCode Código de estado HTTP para la respuesta.
 * @param res Objeto Response de Express.
 */

  // Parsea las variables de entorno para integrar valores predeterminados
  const accessTokenExpire = parseInt(
    process.env.ACCESS_TOKEN_EXPIRE! || "300",
    10
  );
  const refreshTokenExpire = parseInt(
    process.env.REFRESH_TOKEN_EXPIRE! || "1200",
    10
  );

  // Opciones para las cookies de tokens de acceso y actualización
  export const accessTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
    maxAge: accessTokenExpire * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
  };

  export const refreshTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 1000),
    maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
  };



export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  // Genera tokens de acceso y actualización utilizando métodos del modelo de usuario
  const accessToken = user.signAccessToken();
  const refreshToken = user.signRefreshToken();

  // Almacena la información del usuario en Redis usando su identificador único
  redis.set(user._id, JSON.stringify(user) as any);

  if(process.env.NODE_ENV === 'production'){
    accessTokenOptions.secure = true;
  }

  // Establece la cookie de token de acceso
  res.cookie("access_token", accessToken, accessTokenOptions);

  // Establece la cookie de token de actualización
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  // Respuesta con éxito que incluye el usuario y el token de acceso
  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
};
