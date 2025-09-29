const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      error: true,
      message: 'Acesso negado. Apenas administradores podem acessar esta rota'
    });
  }

  next();
}

const isOwnerOrAdmin = (req, res, next) => {
  const resourceUserId = req.params.userId || req.params.id;
  const currentUserId = req.user.id;
  const userRole = req.user.role;

  if (userRole === 'admin' || resourceUserId === currentUserId) {
    return next();
  }

  return res.status(403).json({
    error: true,
    message: 'Acesso negado. Voce so pode acessar seus proprios recursos.'
  });
};

export default {
  isAdmin,
  isOwnerOrAdmin
}