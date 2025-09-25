import { Router } from "express";

const routes = Router();

routes.get('/', (req, res) => {
  res.status(200).json({
    message: 'API esta funcionando!',
    version: '1.0.0',
    documentation: '...'
  });
});

export default routes;