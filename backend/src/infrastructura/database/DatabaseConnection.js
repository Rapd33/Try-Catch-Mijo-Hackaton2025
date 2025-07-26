const mysql = require('mysql2/promise');

class DatabaseConnection {
  constructor() {
    this.connection = null;
    this.config = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
      ssl: {
        rejectUnauthorized: false
      }
    };
  }

  async connect() {
    try {
      if (!this.connection) {
        this.connection = await mysql.createConnection(this.config);
        console.log('✅ Conectado a MySQL RDS exitosamente');
      }
      return this.connection;
    } catch (error) {
      console.error('❌ Error conectando a MySQL:', error);
      throw error;
    }
  }

  async disconnect() {
    if (this.connection) {
      await this.connection.end();
      this.connection = null;
      console.log('🔌 Desconectado de MySQL');
    }
  }

  async query(sql, params = []) {
    try {
      const connection = await this.connect();
      const [rows] = await connection.execute(sql, params);
      return rows;
    } catch (error) {
      console.error('❌ Error en query:', error);
      throw error;
    }
  }

  // Método para crear las tablas iniciales
  async createTables() {
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        cedula VARCHAR(20) UNIQUE NOT NULL,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        telefono VARCHAR(20),
        password_hash VARCHAR(255) NOT NULL,
        es_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;

    try {
      await this.query(createUsersTable);
      console.log('✅ Tabla usuarios creada/verificada');
    } catch (error) {
      console.error('❌ Error creando tabla usuarios:', error);
      throw error;
    }
  }
}

module.exports = new DatabaseConnection();
