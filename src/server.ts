import express from 'express';
import routes from './routes';

import 'reflect-metadata';

import './database';
import uploadConfig from './config/upload';

const app = express();

app.use(express.static(uploadConfig.directory));
app.use(express.json());

app.use(routes);

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
