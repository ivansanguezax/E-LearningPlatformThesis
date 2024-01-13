// Importa la librería dotenv para cargar variables de entorno desde el archivo .env
require("dotenv").config();

// Importa las librerías express, ejs, path y jsonwebtoken
import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user.model";
import ErrorHandler from "../utils/errorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import jwt, { Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";

// Interfaz para los datos del cuerpo de la solicitud de registro
interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

// Controlador para el registro de usuarios con manejo de errores asíncrono
export const registerUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extrae los datos del cuerpo de la solicitud
      const { name, email, password } = req.body;

      // Verifica si el correo electrónico ya está registrado en la base de datos
      const isEmailExist = await UserModel.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler(400, "Email ya registrado"));
      }

      // Crea un objeto con los datos del usuario
      const user: IRegistrationBody = {
        name,
        email,
        password,
      };

      // Crea un token de activación
      const activationToken = createActivationToken(user);

      // Extrae el código de activación del token
      const activationCode = activationToken.activationCode;

      // Datos a ser enviados en el correo electrónico
      const data = {
        user: { name: user.name },
        activationCode: activationCode,
      };

      // Renderiza el contenido HTML del correo electrónico utilizando EJS
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activation-mail.ejs"),
        data
      );

      try {
        // Envía el correo electrónico con el token de activación
        await sendMail({
          email: user.email,
          subject: "Activación de cuenta",
          template: "activation-mail.ejs",
          data,
        });

        // Respuesta exitosa
        res.status(201).json({
          success: true,
          message: `Se ha enviado un correo de activación a ${user.email}`,
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        // Manejo de errores en caso de fallo al enviar el correo electrónico
        return next(new ErrorHandler(error.message, 500));
      }
    } catch (error: any) {
      // Manejo de errores generales
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Interfaz para el objeto de token de activación
interface IActivationToken {
  token: string;
  activationCode: string;
}

// Función para crear un token de activación
export const createActivationToken = (user: any): IActivationToken => {
  // Genera un código de activación aleatorio
  const activationCode = Math.floor(100000 + Math.random() * 900000).toString();

  // Crea un token JWT con el usuario y el código de activación
  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET as Secret,
    {
      expiresIn: "5m",
    }
  );
  return { token, activationCode };
};
