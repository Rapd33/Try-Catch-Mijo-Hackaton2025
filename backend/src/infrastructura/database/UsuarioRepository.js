const db = require('../database/DatabaseConnection');
const bcrypt = require('bcryptjs');

class UsuarioRepository {
  // Crear un nuevo usuario
  async crearUsuario({ cedula, nombre, email, telefono, password, esAdmin = false }) {
    try {
      // Hash de la contraseña
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const sql = `
        INSERT INTO usuarios (cedula, nombre, email, telefono, password_hash, es_admin)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const params = [cedula, nombre, email, telefono, passwordHash, esAdmin];
      const result = await db.query(sql, params);

      return {
        success: true,
        id: result.insertId,
        message: 'Usuario creado exitosamente'
      };
    } catch (error) {
      console.error('Error creando usuario:', error);
      
      // Manejar errores específicos de MySQL
      if (error.code === 'ER_DUP_ENTRY') {
        if (error.message.includes('email')) {
          return { success: false, error: 'El email ya está registrado' };
        }
        if (error.message.includes('cedula')) {
          return { success: false, error: 'La cédula ya está registrada' };
        }
      }
      
      return { success: false, error: 'Error interno del servidor' };
    }
  }

  // Buscar usuario por email
  async buscarPorEmail(email) {
    try {
      const sql = 'SELECT * FROM usuarios WHERE email = ?';
      const usuarios = await db.query(sql, [email]);
      return usuarios.length > 0 ? usuarios[0] : null;
    } catch (error) {
      console.error('Error buscando usuario por email:', error);
      throw error;
    }
  }

  // Buscar usuario por cédula
  async buscarPorCedula(cedula) {
    try {
      const sql = 'SELECT * FROM usuarios WHERE cedula = ?';
      const usuarios = await db.query(sql, [cedula]);
      return usuarios.length > 0 ? usuarios[0] : null;
    } catch (error) {
      console.error('Error buscando usuario por cédula:', error);
      throw error;
    }
  }

  // Buscar usuario por ID
  async buscarPorId(id) {
    try {
      const sql = 'SELECT id, cedula, nombre, email, telefono, es_admin, created_at FROM usuarios WHERE id = ?';
      const usuarios = await db.query(sql, [id]);
      return usuarios.length > 0 ? usuarios[0] : null;
    } catch (error) {
      console.error('Error buscando usuario por ID:', error);
      throw error;
    }
  }

  // Verificar contraseña
  async verificarPassword(password, passwordHash) {
    try {
      return await bcrypt.compare(password, passwordHash);
    } catch (error) {
      console.error('Error verificando contraseña:', error);
      return false;
    }
  }

  // Listar todos los usuarios (sin contraseñas)
  async listarUsuarios() {
    try {
      const sql = 'SELECT id, cedula, nombre, email, telefono, es_admin, created_at FROM usuarios ORDER BY created_at DESC';
      return await db.query(sql);
    } catch (error) {
      console.error('Error listando usuarios:', error);
      throw error;
    }
  }

  // Actualizar usuario
  async actualizarUsuario(id, { nombre, telefono }) {
    try {
      const sql = 'UPDATE usuarios SET nombre = ?, telefono = ? WHERE id = ?';
      const result = await db.query(sql, [nombre, telefono, id]);
      
      return {
        success: result.affectedRows > 0,
        message: result.affectedRows > 0 ? 'Usuario actualizado' : 'Usuario no encontrado'
      };
    } catch (error) {
      console.error('Error actualizando usuario:', error);
      return { success: false, error: 'Error interno del servidor' };
    }
  }
}

module.exports = new UsuarioRepository();
