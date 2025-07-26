class Usuarios {
  constructor(cedula, nombre, telefono, email, esAdmin = false, contrasena = null) {
    this.cedula = cedula;
    this.nombre = nombre;
    this.telefono = telefono;
    this.email = email;
    this.esAdmin = esAdmin;
    this.contrasena = contrasena;
  }

  // Método para verificar si es administrador
  isAdmin() {
    return this.esAdmin;
  }

  // Método para obtener información básica sin datos sensibles
  getPublicInfo() {
    return {
      cedula: this.cedula,
      nombre: this.nombre,
      email: this.email,
      esAdmin: this.esAdmin
    };
  }
}

module.exports = Usuarios;
