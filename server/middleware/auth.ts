/**
 * Middleware de autenticación para verificar la validez del token de acceso.
 */

import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";
import { updateAccessToken } from "../controllers/user.controller";

export const isAutheticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token as string;

    if (!access_token) {
      return next(
        new ErrorHandler("Por favor, inicia sesión para acceder a este recurso", 400)
      );
    }

    const decoded = jwt.decode(access_token) as JwtPayload;

    if (!decoded) {
      return next(new ErrorHandler("El token de acceso no es válido", 400));
    }

    // check if the access token is expired
    if (decoded.exp && decoded.exp <= Date.now() / 1000) {
      try {
        await updateAccessToken(req, res, next);
      } catch (error) {
        return next(error);
      }
    } else {
      const user = await redis.get(decoded.id);

      if (!user) {
        return next(
          new ErrorHandler("Por favor, inicia sesión para acceder a este recurso", 400)
        );
      }

      req.user = JSON.parse(user);

      next();
    }
  }
);

// validate user role
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(
        new ErrorHandler(
          `Rol: ${req.user?.role} no tiene permiso para acceder a este recurso`,
          403
        )
      );
    }
    next();
  };
};