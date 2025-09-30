import { Router } from 'express';
import authRoutes from './authRoutes.js';

const routes = Router();

routes.get('/', (req, res) => {
  res.status(200).json({
    message: 'API esta funcionando!',
    version: '1.0.0',
    documentation: '...'
  });
});

routes.use('/auth', authRoutes);

export default routes;