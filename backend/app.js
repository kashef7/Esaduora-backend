import express from 'express';
import AppError from './utils/AppError.js';
import globalErrorHandler from './utils/errorController.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {router as userRouter} from './user/userRouter.js';
export const app = express();


//App middlewares

//body parser and limiter
app.use(express.json());

app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

//Routes

app.use('/esadora/api/users',userRouter);

//Error handler middleware

app.use('/{*any}',(req,res,next)=>{
  next(new AppError(`this URL:${req.originalUrl} was not found in any route`,404));
})

app.use(globalErrorHandler);

