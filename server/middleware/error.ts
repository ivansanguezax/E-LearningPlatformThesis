// Importación de módulos de Express y ErrorHandler
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";

/**
 * Middleware para el manejo centralizado de errores.
 * @param err Objeto de error.
 * @param req Objeto de solicitud de Express.
 * @param res Objeto de respuesta de Express.
 * @param next Función para pasar el control al siguiente middleware.
 */

export const ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Configuración predeterminada para el código de estado y mensaje de error
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Manejo de errores específicos

  // Error de tipo CastError (id incorrecto de MongoDB)
  if (err.name === "CastError") {
    const message: any = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Error de código duplicado (por ejemplo, clave única duplicada en MongoDB)
  if (err.code === 11000) {
    const message: any = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // Error de token JWT no válido
  if (err.name === "JsonWebTokenError") {
    const message: any = `Json Web Token is invalid. Try Again!!!`;
    err = new ErrorHandler(message, 400);
  }

  // Error de expiración de token JWT
  if (err.name === "TokenExpiredError") {
    const message: any = `Json Web Token is expired. Try Again!!!`;
    err = new ErrorHandler(message, 400);
  }

  // Respuesta al cliente con el código de estado, mensaje de error y pila de llamadas
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
};
