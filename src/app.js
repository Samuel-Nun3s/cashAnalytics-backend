import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routes from './routes/index.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api', routes);

export default app;
