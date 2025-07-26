const authService = require('../../app/auth/SimpleAuthService');

// Middleware para verificar JWT
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Token de acceso requerido'
      });
    }

    const token = authHeader.substring(7); // Remover "Bearer "
    
    const result = await authService.verificarToken(token);
    
    if (result.success) {
      req.user = result.user;
      next();
    } else {
      return res.status(401).json({
        success: false,
        error: result.error
      });
    }
  } catch (error) {
    console.error('Error en auth middleware:', error);
    return res.status(401).json({
      success: false,
      error: 'Token inválido'
    });
  }
};

// Middleware opcional - no requiere autenticación pero agrega info si está autenticado
const optionalAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const result = await authService.verificarToken(token);
      
      if (result.success) {
        req.user = result.user;
        req.isAuthenticated = true;
      } else {
        req.isAuthenticated = false;
      }
    } else {
      req.isAuthenticated = false;
    }
    
    next();
  } catch (error) {
    req.isAuthenticated = false;
    next();
  }
};

module.exports = {
  authMiddleware,
  optionalAuthMiddleware
};
