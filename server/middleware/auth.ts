/**
 * Middleware de autenticación para verificar la validez del token de acceso.
 */

import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";

export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Imprime el encabezado de autorización para depuración
      console.log(req.headers.authorization);

      // Obtiene el token de acceso del encabezado de autorización
      const access_token = req.headers.authorization;

      // Verifica si el token de acceso está presente
      if (!access_token) {
        return next(
          new ErrorHandler(400, "No estás autorizado para acceder a esta ruta")
        );
      }

      // Verifica la validez del token de acceso utilizando la clave secreta
      const decoded = jwt.verify(
        access_token,
        process.env.ACCESS_TOKEN as string
      ) as JwtPayload;

      // Verifica si el token se decodificó correctamente
      if (!decoded) {
        return next(
          new ErrorHandler(400, "No estás autorizado para acceder a esta ruta")
        );
      }

      // Recupera los datos del usuario desde la caché (por ejemplo, Redis)
      const user = await redis.get(decoded.id);

      // Verifica si el usuario existe en la caché
      if (!user) {
        return next(new ErrorHandler(400, "Usuario no encontrado"));
      }

      // Asigna los datos del usuario a la solicitud para su uso posterior
      req.user = JSON.parse(user);

      // Pasa la solicitud al siguiente middleware
      next();
    } catch (error: any) {
      // Captura y maneja errores de autenticación
      return next(
        new ErrorHandler(500, `Error de autenticación: ${error.message}`)
      );
    }
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
