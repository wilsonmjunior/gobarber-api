import 'reflect-metadata';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import AppError from '@shared/errors/AppError';

import routes from '@shared/infra/http/routes';

import '@shared/container';
import '../typeorm';

import uploadConfig from '@config/upload';
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';

const app = express();

app.use(rateLimiter);
app.use(cors());
app.use('/files', express.static(uploadConfig.uploadsFolder));

app.use(express.json());
app.use(routes);
app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        error: error.message,
      });
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log(error);
    }

    return response.status(500).json({
      status: 'error',
      error: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
