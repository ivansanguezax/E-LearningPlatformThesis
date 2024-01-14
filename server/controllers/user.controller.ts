// Importa la librería dotenv para cargar variables de entorno desde el archivo .env
require("dotenv").config();

// Importa las librerías express, ejs, path y jsonwebtoken
import { Request, Response, NextFunction } from "express";
import UserModel, { IUser } from "../models/user.model";
import ErrorHandler from "../utils/errorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import jwt, { Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import { sendToken } from "../utils/jwt";

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


/**
 * Interfaz para la solicitud de activación que se espera en el cuerpo de la solicitud HTTP.
 */
interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}
export const activateUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extrae las propiedades de la solicitud de activación
    const { activation_token, activation_code } = req.body as IActivationRequest;

    // Verifica el token de activación y obtiene los datos del usuario y el código de activación
    const newUser: { user: IUser; activationCode: string } = jwt.verify(
      activation_token,
      process.env.ACTIVATION_SECRET as string
    ) as { user: IUser; activationCode: string };

    // Compara el código de activación proporcionado con el código del token
    if (newUser.activationCode !== activation_code) {
      return next(new ErrorHandler(400, "Código de activación incorrecto"));
    }

    // Extrae datos del usuario
    const { name, email, password } = newUser.user;

    // Verifica si el correo electrónico ya está registrado en la base de datos
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler(400, "El correo electrónico ya está registrado"));
    }

    // Crea un nuevo usuario en la base de datos
    const user = await UserModel.create({
      name,
      email,
      password,
    });

    // Respuesta exitosa
    res.status(201).json({
      success: true,
      message: "Cuenta activada con éxito",
    });
  } catch (error: any) {
    // Manejo de errores en caso de fallo durante la activación del usuario
    return next(new ErrorHandler(error.message, 500));
  }
});

/**
 * Interfaz para la solicitud de inicio de sesión que se espera en el cuerpo de la solicitud HTTP.
 */
interface ILoginRequest {
  email: string;
  password: string;
}

export const loginUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extrae las propiedades de la solicitud de inicio de sesión
    const { email, password } = req.body as ILoginRequest;

    // Verifica si se proporcionaron tanto el correo electrónico como la contraseña
    if (!email || !password) {
      return next(new ErrorHandler(400, "Por favor ingrese su correo electrónico y contraseña"));
    }

    // Busca al usuario en la base de datos por su correo electrónico y recupera la contraseña
    const user = await UserModel.findOne({ email }).select("+password");

    // Verifica si se encontró al usuario
    if (!user) {
      return next(new ErrorHandler(401, "Credenciales inválidas"));
    }

    // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
    const isPasswordMatched = await user.comparePassword(password);

    // Verifica si las contraseñas coinciden
    if (!isPasswordMatched) {
      return next(new ErrorHandler(401, "Credenciales inválidas"));
    }

    // Envía el token al cliente y responde con éxito
    sendToken(user, 200, res);

  } catch (error: any) {
    // Manejo de errores en caso de fallo durante el inicio de sesión
    return next(new ErrorHandler(error.message, 500));
  }
});

//Controlador para cerrar la sesión de un usuario.
export const logoutUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Borra las cookies de acceso y actualización para cerrar la sesión
    res.cookie("accessToken", "", { maxAge: 1 });
    res.cookie("refreshToken", "", { maxAge: 1 });

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: "Desconectado con éxito",
    });

  } catch (error: any) {
    // Manejo de errores en caso de fallo durante la desconexión
    return next(new ErrorHandler(error.message, 500));
  }
});
