/**
 * Middleware de autenticación para verificar la validez del token de acceso.
 */

import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";

// Definición de la función middleware para verificar la autenticación del usuario
export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    // Obtiene el token de acceso almacenado en las cookies de la solicitud
    const access_token = req.cookies.access_token as string;

    // Verifica si el token de acceso está presente en las cookies
    if (!access_token) {
      // Si no está presente, devuelve un error de no autorizado con código 401
      return next(new ErrorHandler(401, 'No autorizado'));
    }

    // Verifica y decodifica el token de acceso utilizando la clave secreta del servidor
    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as JwtPayload;

    // Verifica si la decodificación del token de acceso fue exitosa
    if (!decoded) {
      // Si la decodificación falla, devuelve un error de token no válido con código 401
      return next(new ErrorHandler(401, 'Token no válido'));
    }

    // Obtiene la información del usuario desde la base de datos (Redis) utilizando el ID del usuario
    const user = await redis.get(decoded.id as string);

    // Verifica si el usuario existe en la base de datos
    if (!user) {
      // Si el usuario no existe, devuelve un error de usuario no encontrado con código 401
      return next(new ErrorHandler(401, 'Usuario no encontrado'));
    }

    // Almacena la información del usuario en la propiedad user del objeto de solicitud
    req.user = JSON.parse(user);

    // Continúa con la ejecución del siguiente middleware
    next();
  }
);

/**
 * Middleware de autorización para verificar si el usuario tiene roles permitidos.
 *
 * @param {...string[]} roles - Roles permitidos para acceder a la ruta.
 * @returns {(req: Request, res: Response, next: NextFunction) => void}
 *
 * @throws {ErrorHandler} - Devuelve un error si el usuario no tiene los roles permitidos.
 */

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Verifica si el rol del usuario está permitido
    if (!roles.includes(req.user?.role || "")) {
      return next(
        new ErrorHandler(
          403,
          `Rol (${req.user?.role}) no permitido para acceder a esta ruta`
        )
      );
    }
    // Pasa la solicitud al siguiente middleware
    next();
  };
};
