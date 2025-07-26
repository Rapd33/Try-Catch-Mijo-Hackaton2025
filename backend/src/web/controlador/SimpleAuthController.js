const authService = require('../../app/auth/SimpleAuthService');

class SimpleAuthController {
  // Registro de usuario
  async register(req, res) {
    try {
      const { cedula, nombre, email, telefono, password } = req.body;

      const result = await authService.registrar({
        cedula,
        nombre,
        email,
        telefono,
        password
      });

      if (result.success) {
        return res.status(201).json({
          success: true,
          message: result.message,
          userId: result.userId
        });
      } else {
        return res.status(400).json({
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      console.error('Error en register controller:', error);
      return res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  }

  // Login de usuario
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const result = await authService.login({ email, password });

      if (result.success) {
        return res.status(200).json({
          success: true,
          message: result.message,
          token: result.token,
          user: result.user
        });
      } else {
        return res.status(401).json({
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      console.error('Error en login controller:', error);
      return res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  }

  // Obtener perfil del usuario
  async profile(req, res) {
    try {
      const userId = req.user.id; // Viene del middleware de autenticación

      const result = await authService.obtenerPerfil(userId);

      if (result.success) {
        return res.status(200).json({
          success: true,
          user: result.user
        });
      } else {
        return res.status(404).json({
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      console.error('Error en profile controller:', error);
      return res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  }

  // Verificar si el token es válido
  async verify(req, res) {
    try {
      // Si llegamos aquí, el middleware ya verificó el token
      return res.status(200).json({
        success: true,
        message: 'Token válido',
        user: req.user
      });
    } catch (error) {
      console.error('Error en verify controller:', error);
      return res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  }
}

module.exports = new SimpleAuthController();
