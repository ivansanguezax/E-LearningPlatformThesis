// Importa la librería express
import express from 'express';

// Importa la función de controlador para el registro de usuarios
import { activateUser, registerUser } from '../controllers/user.controller';

// Crea un enrutador utilizando express.Router()
const userRouter = express.Router();

// Define una ruta para manejar las solicitudes POST relacionadas con el registro de usuarios
userRouter.post('/registration', registerUser);

// Define una ruta para manejar las solicitudes POST relacionadas con la activacion de usuarios
userRouter.post('/activate-user', activateUser);

// Exporta el enrutador para su uso en otros módulos
export default userRouter;
