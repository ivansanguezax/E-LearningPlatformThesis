// Importa la librería express
import express from 'express';

// Importa la función de controlador para el registro de usuarios
import { registerUser } from '../controllers/user.controller';

// Crea un enrutador utilizando express.Router()
const userRouter = express.Router();

// Define una ruta para manejar las solicitudes POST relacionadas con el registro de usuarios
userRouter.post('/registration', registerUser);

// Exporta el enrutador para su uso en otros módulos
export default userRouter;
