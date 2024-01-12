// Importación de módulos de Express
import { NextFunction, Request, Response } from "express";

/**
 * Middleware para capturar y manejar asincronamente los errores en funciones asíncronas.
 * @param theFunc Función asíncrona a la que se le aplicará el manejo de errores.
 * @returns Middleware Express para capturar errores asíncronos.
 */

export const CatchAsyncError =
  (theFunc: any) => (req: Request, res: Response, next: NextFunction) => {
    // Resuelve la función asíncrona y maneja cualquier error que pueda surgir
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };
