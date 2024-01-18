import {Request, Response,NextFunction} from 'express'
import { CatchAsyncError } from './catchAsyncError'
import ErrorHandler from '../utils/errorHandler';
import jwt, {JwtPayload } from 'jsonwebtoken';
import { redis } from '../utils/redis';


export const isAutheticated = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.headers.authorization);
        const access_token = req.headers.authorization;

        if (!access_token) {
            return next(new ErrorHandler(400, 'No estás autorizado para acceder a esta ruta'));
        }

        const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as JwtPayload;

        if (!decoded) {
            return next(new ErrorHandler(400, 'No estás autorizado para acceder a esta ruta'));
        }

        const user = await redis.get(decoded.id);

        if (!user) {
            return next(new ErrorHandler(400, 'Usuario no encontrado'));
        }

        req.user = JSON.parse(user);
        next();
    } catch (error: any) {
        return next(new ErrorHandler(500, `Error de autenticación: ${error.message}`));
    }
});
