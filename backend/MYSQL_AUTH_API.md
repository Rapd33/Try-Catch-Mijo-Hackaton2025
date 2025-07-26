# API de Autenticación Simple con MySQL

## 🚀 Configuración

### 1. Variables de Entorno
Actualiza tu archivo `.env` con las credenciales de tu RDS MySQL:

```env
# Configuración de MySQL RDS
DB_HOST=tu-host-rds.region.rds.amazonaws.com
DB_USER=tu-usuario
DB_PASSWORD=tu-password
DB_NAME=tu-base-de-datos-nombre
DB_PORT=3306

# JWT Secret
JWT_SECRET=mi-secreto-jwt-super-seguro-cambiame-en-produccion
```

### 2. Iniciar el Servidor
```bash
cd backend
npm run dev
```

## 🔗 Endpoints Disponibles

### 📝 Registro de Usuario
```http
POST /api/auth/register
Content-Type: application/json

{
  "cedula": "12345678",
  "nombre": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "telefono": "+573001234567",
  "password": "miPassword123"
}
```

**Respuesta Exitosa:**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "userId": 1
}
```

### 🔑 Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "juan@ejemplo.com",
  "password": "miPassword123"
}
```

**Respuesta Exitosa:**
```json
{
  "success": true,
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "cedula": "12345678",
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "telefono": "+573001234567",
    "esAdmin": false
  }
}
```

### 👤 Obtener Perfil (Protegido)
```http
GET /api/auth/profile
Authorization: Bearer tu-jwt-token-aqui
```

**Respuesta:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "cedula": "12345678",
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "telefono": "+573001234567",
    "esAdmin": false,
    "createdAt": "2025-01-20T10:30:00.000Z"
  }
}
```

### ✅ Verificar Token (Protegido)
```http
GET /api/auth/verify
Authorization: Bearer tu-jwt-token-aqui
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Token válido",
  "user": {
    "id": 1,
    "cedula": "12345678",
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "telefono": "+573001234567",
    "esAdmin": false
  }
}
```

## 🔒 Autenticación

### Headers Requeridos para Rutas Protegidas
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Flujo de Autenticación
1. **Registro**: `POST /api/auth/register`
2. **Login**: `POST /api/auth/login` → Obtener token
3. **Usar token**: Incluir en header `Authorization: Bearer TOKEN`
4. **Verificar**: `GET /api/auth/verify` (opcional)

## 📊 Tabla de Base de Datos

La tabla `usuarios` se crea automáticamente con esta estructura:

```sql
CREATE TABLE usuarios (
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
```

## 🧪 Pruebas con Postman

### 1. Registro
- Método: POST
- URL: `http://localhost:3000/api/auth/register`
- Body (JSON):
```json
{
  "cedula": "12345678",
  "nombre": "Test User",
  "email": "test@ejemplo.com",
  "telefono": "+573001234567",
  "password": "password123"
}
```

### 2. Login
- Método: POST
- URL: `http://localhost:3000/api/auth/login`
- Body (JSON):
```json
{
  "email": "test@ejemplo.com",
  "password": "password123"
}
```

### 3. Perfil (con token)
- Método: GET
- URL: `http://localhost:3000/api/auth/profile`
- Headers: `Authorization: Bearer [TOKEN_DEL_LOGIN]`

## ⚠️ Errores Comunes

### Error de Conexión a Base de Datos
```json
{
  "success": false,
  "error": "Error interno del servidor"
}
```
**Solución**: Verificar credenciales de RDS en el archivo `.env`

### Usuario ya Existe
```json
{
  "success": false,
  "error": "El email ya está registrado"
}
```

### Credenciales Inválidas
```json
{
  "success": false,
  "error": "Credenciales inválidas"
}
```

### Token Inválido
```json
{
  "success": false,
  "error": "Token de acceso requerido"
}
```

## 🔄 Próximos Pasos

1. **Configurar RDS**: Actualizar `.env` con tus credenciales
2. **Probar endpoints**: Usar Postman para registro y login
3. **Frontend**: Integrar con React
4. **Mejoras**: Agregar más middleware y validaciones
