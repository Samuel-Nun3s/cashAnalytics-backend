import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import logger from './utils/logger.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim())
    }
  })
);

app.use('/api', routes);

export default app;
