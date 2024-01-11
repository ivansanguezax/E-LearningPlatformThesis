import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";

export const ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  // id erroneo mongoDB
  if (err.name === "CastError") {
    const message: any = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // duplicar cualquier error
  if (err.code === 11000) {
    const message: any = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  //jwt error
  if (err.name === "JsonWebTokenError") {
    const message: any = `Json Web Token is invalid. Try Again!!!`;
    err = new ErrorHandler(message, 400);
  }

  //jwt expirado error
  if (err.name === "TokenExpiredError") {
    const message: any = `Json Web Token is expired. Try Again!!!`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
};
