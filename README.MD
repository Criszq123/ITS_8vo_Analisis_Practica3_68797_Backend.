```markdown
# API REST de Autenticación

API REST para registro y autenticación de usuarios utilizando Node.js, Express, MySQL y JWT.

## Requisitos Previos

- [Node.js](https://nodejs.org/) (v18+ recomendado)
- [npm](https://www.npmjs.com/) (viene con Node.js)
- [MySQL](https://www.mysql.com/) (v8.0+)
- [Postman](https://www.postman.com/) o similar (para probar endpoints)

## Instalación

1. **Clonar el repositorio**
```bash
git clone [URL_DEL_REPOSITORIO]
cd apirest-2.0
```

2. **Instalar dependencias**
```bash
npm install
```

## Configuración

1. **Crear base de datos MySQL**
```sql
CREATE DATABASE auth_db;
USE auth_db;

CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

2. **Configurar variables de entorno**  
Crear un archivo `.env` en la raíz del proyecto:
```env
DB_HOST=localhost
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=auth_db
JWT_SECRET=claveSecretaSuperSegura
```

## Ejecución

**Iniciar el servidor:**
```bash
node app.js
```

El servidor estará disponible en: `http://localhost:3000`

## Endpoints

### Registro de Usuario
```http
POST /api/auth/register
```
**Cuerpo de la solicitud:**
```json
{
  "name": "Juan",
  "lastName": "Pérez",
  "email": "juan@example.com",
  "password": "password123"
}
```

### Inicio de Sesión
```http
POST /api/auth/login
```
**Cuerpo de la solicitud:**
```json
{
  "email": "juan@example.com",
  "password": "password123"
}
```

## Probando la API

**Ejemplo con curl:**
```bash
# Registro
curl -X POST -H "Content-Type: application/json" -d '{
  "name": "Juan",
  "lastName": "Pérez",
  "email": "juan@example.com",
  "password": "password123"
}' http://localhost:3000/api/auth/register

# Login
curl -X POST -H "Content-Type: application/json" -d '{
  "email": "juan@example.com",
  "password": "password123"
}' http://localhost:3000/api/auth/login
```

## Estructura del Proyecto
```
├── src/
│   ├── core/           # Lógica de negocio
│   ├── infrastructure/ # Bases de datos y servicios
│   └── interfaces/     # Controladores y rutas
├── app.js              # Punto de entrada
├── package.json
└── .env.example
```

## Dependencias Principales
- Express: Framework web
- MySQL2: Cliente MySQL
- Sequelize: ORM para MySQL
- JWT: Autenticación con tokens
- Bcrypt: Encriptación de contraseñas
- CORS: Manejo de políticas CORS

## Troubleshooting

**Error de conexión a MySQL:**
- Verificar credenciales en `.env`
- Asegurarse que el servicio MySQL esté corriendo
- Verificar que la tabla users exista

**Error de dependencias:**
```bash
rm -rf node_modules && npm install
```

**Variables de entorno no detectadas:**
- Asegurarse que el archivo `.env` esté en la raíz del proyecto
- Reiniciar el servidor después de cambios en `.env`
```