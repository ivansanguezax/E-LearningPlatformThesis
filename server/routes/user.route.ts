// Importa la librería express
import express from 'express';

// Importa la función de controlador para el registro de usuarios
import { activateUser, registerUser, loginUser, logoutUser } from '../controllers/user.controller';

// Crea un enrutador utilizando express.Router()
const userRouter = express.Router();

// Define una ruta para manejar las solicitudes POST relacionadas con el registro de usuarios
userRouter.post('/registration', registerUser);

// Define una ruta para manejar las solicitudes POST relacionadas con la activacion de usuarios
userRouter.post('/activate-user', activateUser);

// Define una ruta para manejar las solicitudes POST relacionadas con el inicio de sesión de usuarios
userRouter.post('/login', loginUser);

// Define una ruta para manejar las solicitudes POST relacionadas con el logout de usuarios
userRouter.get('/logout', logoutUser);


// Exporta el enrutador para su uso en otros módulos
export default userRouter;
