require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
export const app = express();

import cors from 'cors';
import cookieParser from 'cookie-parser';

//body parser, para poder recibir datos en formato json
app.use(express.json({limit: '50mb'}));

//Cookie parser, para poder recibir cookies
app.use(cookieParser());

//cors => para poder recibir peticiones desde el front
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}));

//testing api 
app.get('/test', (req:Request, res:Response, next:NextFunction) => {
    res.status(200).json({
        success: true,
        message: 'API working'
    });
});

// rutas desconocidas
app.all('*', (req:Request, res:Response, next:NextFunction) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server`);
});