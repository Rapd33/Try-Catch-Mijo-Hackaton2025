const usuarioRepository = require('../../infrastructura/database/UsuarioRepository');
const jwt = require('jsonwebtoken');

class AuthService {
  // Registro de usuario
  async registrar({ cedula, nombre, email, telefono, password }) {
    try {
      // Validaciones básicas
      if (!cedula || !nombre || !email || !password) {
        return {
          success: false,
          error: 'Todos los campos obligatorios deben ser completados'
        };
      }

      if (password.length < 6) {
        return {
          success: false,
          error: 'La contraseña debe tener al menos 6 caracteres'
        };
      }

      // Verificar si el usuario ya existe
      const existeEmail = await usuarioRepository.buscarPorEmail(email);
      if (existeEmail) {
        return {
          success: false,
          error: 'El email ya está registrado'
        };
      }

      const existeCedula = await usuarioRepository.buscarPorCedula(cedula);
      if (existeCedula) {
        return {
          success: false,
          error: 'La cédula ya está registrada'
        };
      }

      // Crear usuario
      const resultado = await usuarioRepository.crearUsuario({
        cedula,
        nombre,
        email,
        telefono,
        password
      });

      if (resultado.success) {
        return {
          success: true,
          message: 'Usuario registrado exitosamente',
          userId: resultado.id
        };
      } else {
        return resultado;
      }
    } catch (error) {
      console.error('Error en registro:', error);
      return {
        success: false,
        error: 'Error interno del servidor'
      };
    }
  }

  // Login de usuario
  async login({ email, password }) {
    try {
      // Validaciones básicas
      if (!email || !password) {
        return {
          success: false,
          error: 'Email y contraseña son requeridos'
        };
      }

      // Buscar usuario
      const usuarioDb = await usuarioRepository.buscarPorEmail(email);
      if (!usuarioDb) {
        return {
          success: false,
          error: 'Credenciales inválidas'
        };
      }

      // Verificar contraseña
      const passwordValida = await usuarioRepository.verificarPassword(password, usuarioDb.password_hash);
      if (!passwordValida) {
        return {
          success: false,
          error: 'Credenciales inválidas'
        };
      }

      // Crear objeto usuario del dominio
      const usuario = {
        id: usuarioDb.id,
        cedula: usuarioDb.cedula,
        nombre: usuarioDb.nombre,
        telefono: usuarioDb.telefono,
        email: usuarioDb.email,
        esAdmin: usuarioDb.es_admin
      };

      // Generar JWT
      const token = jwt.sign(
        {
          id: usuarioDb.id,
          email: usuarioDb.email,
          cedula: usuarioDb.cedula,
          esAdmin: usuarioDb.es_admin
        },
        process.env.JWT_SECRET || 'tu-secreto-super-seguro',
        { expiresIn: '24h' }
      );

      return {
        success: true,
        message: 'Login exitoso',
        token,
        user: usuario
      };
    } catch (error) {
      console.error('Error en login:', error);
      return {
        success: false,
        error: 'Error interno del servidor'
      };
    }
  }

  // Verificar token JWT
  async verificarToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu-secreto-super-seguro');
      
      // Buscar usuario actual en la DB
      const usuario = await usuarioRepository.buscarPorId(decoded.id);
      if (!usuario) {
        return {
          success: false,
          error: 'Usuario no encontrado'
        };
      }

      return {
        success: true,
        user: {
          id: usuario.id,
          cedula: usuario.cedula,
          nombre: usuario.nombre,
          email: usuario.email,
          telefono: usuario.telefono,
          esAdmin: usuario.es_admin
        }
      };
    } catch (error) {
      console.error('Error verificando token:', error);
      return {
        success: false,
        error: 'Token inválido'
      };
    }
  }

  // Obtener perfil de usuario
  async obtenerPerfil(userId) {
    try {
      const usuario = await usuarioRepository.buscarPorId(userId);
      if (!usuario) {
        return {
          success: false,
          error: 'Usuario no encontrado'
        };
      }

      return {
        success: true,
        user: {
          id: usuario.id,
          cedula: usuario.cedula,
          nombre: usuario.nombre,
          email: usuario.email,
          telefono: usuario.telefono,
          esAdmin: usuario.es_admin,
          createdAt: usuario.created_at
        }
      };
    } catch (error) {
      console.error('Error obteniendo perfil:', error);
      return {
        success: false,
        error: 'Error interno del servidor'
      };
    }
  }
}

module.exports = new AuthService();
