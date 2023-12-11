import express from 'express';
import apiRouter from './src/routers/index.js'
import errorHandlingMiddleware from './middlewares/error-handling-middleware.js';
import { SERVER_PORT } from './constants/app.constant.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);
app.use(errorHandlingMiddleware);

app.listen(SERVER_PORT, () => {
  console.log(`App listening on port ${SERVER_PORT}`);
});
