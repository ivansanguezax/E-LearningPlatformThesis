// Importación de módulos y configuración de variables de entorno
require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import notificationRouter from "./routes/notification.route";

// Configuración del middleware para parsear el cuerpo de las solicitudes en formato JSON con un límite de 50 MB
app.use(express.json({ limit: "50mb" }));

// Configuración del middleware para analizar las cookies en las solicitudes
app.use(cookieParser());

// Configuración del middleware CORS para permitir solicitudes desde el origen especificado en las variables de entorno
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

// Rutas de la API
app.use(
  "/api/v1",
  userRouter,
  orderRouter,
  courseRouter,
  notificationRouter,
  // analyticsRouter,
  // layoutRouter
);

// Ruta de prueba para verificar si la API está funcionando correctamente
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API working",
  });
});

// Middleware para manejar rutas desconocidas
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server`);
  next(err);
});

// Middleware de manejo de errores personalizado
app.use(ErrorMiddleware);
