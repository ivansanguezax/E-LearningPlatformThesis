// Importa la librería express
import express from "express";

// Importa la función de controlador para el registro de usuarios
import {
  activateUser,
  registerUser,
  loginUser,
  logoutUser,
  updateAccessToken,
  getUserInfo,
  socialAuth,
  updateUserInfo,
  updatePassword,
  updateProfilePicture,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/auth";

// Crea un enrutador utilizando express.Router()
const userRouter = express.Router();

// Define una ruta para manejar las solicitudes POST relacionadas con el registro de usuarios
userRouter.post("/registration", registerUser);

// Define una ruta para manejar las solicitudes POST relacionadas con la activacion de usuarios
userRouter.post("/activate-user", activateUser);

// Define una ruta para manejar las solicitudes POST relacionadas con el inicio de sesión de usuarios
userRouter.post("/login", loginUser);

// Define una ruta para manejar las solicitudes POST relacionadas con el logout de usuarios
userRouter.get("/logout", isAuthenticated, logoutUser);

// Define una ruta para refrescar el token de acceso

userRouter.get("/refresh", updateAccessToken);

// Define una ruta para tomar la información del usuario
userRouter.get("/me", isAuthenticated, getUserInfo);

// Define una ruta para Social Login
userRouter.post("/social-auth", socialAuth);

// Define una ruta para actualizar la información del usuario
userRouter.put("/update-user-info", isAuthenticated, updateUserInfo);

// Define una ruta para actualiza la contraseña del usuario
userRouter.put("/update-user-password", isAuthenticated, updatePassword);

// Define una ruta para actualizar el avatar del usuario
userRouter.put("/update-user-avatar", isAuthenticated, updateProfilePicture);

// Exporta el enrutador para su uso en otros módulos
export default userRouter;
