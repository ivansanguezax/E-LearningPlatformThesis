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
    const access_token = req.cookies.access_token as string;

    if(!access_token) {
      return next(new ErrorHandler(401, 'No autorizado'));
    }

    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as JwtPayload;

    if(!decoded) {
      return next(new ErrorHandler(401, 'Token no válido'));
    }

    const user = await redis.get(decoded.id as string);

    if(!user) {
      return next(new ErrorHandler(401, 'usuario no encontrado'));
    }

    req.user = JSON.parse(user);
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
