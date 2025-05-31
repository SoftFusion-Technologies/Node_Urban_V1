import express from 'express';
import cors from 'cors';
// El Intercambio de Recursos de Origen Cruzado (CORS (en-US))
// es un mecanismo que utiliza cabeceras HTTP adicionales para permitir que un user agent (en-US)
// obtenga permiso para acceder a recursos seleccionados desde un servidor, en un origen distinto (dominio) al que pertenece.

// importamos la conexion de la base de datos
import db from './DataBase/db.js';
import GetRoutes from './Routes/routes.js';
import dotenv from 'dotenv';

import {
  login,
  authenticateToken,
  loginAlumno,
  authenticateStudent
} from './Security/auth.js'; // Importa las funciones del archivo auth.js
import { PORT } from './DataBase/config.js';
import mysql from 'mysql2/promise'; // Usar mysql2 para las promesas

// CONFIGURACION PRODUCCION
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// const PORT = process.env.PORT || 3000;

// console.log(process.env.PORT)

const app = express();
app.use(cors()); // aca configuramos cors para no tener errores
app.use(express.json());
app.use('/', GetRoutes);
// definimos la conexion

// Para verificar si nuestra conexión funciona, lo hacemos con el método authenticate()
//  el cual nos devuelve una promesa que funciona de la siguiente manera:
// un try y un catch para captar cualquier tipo de errores
try {
  db.authenticate();
  console.log('Conexion con la db establecida');
} catch (error) {
  console.log(`El error de la conexion es : ${error}`);
}

const pool = mysql.createPool({
  host: 'localhost', // Configurar según tu base de datos
  user: 'root', // Configurar según tu base de datos
  password: '123456', // Configurar según tu base de datos
  database: 'DB_UrbanDESA_23052025'
});

// Ruta de login
app.post('/login', login);

// Ruta protegida
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Esto es una ruta protegida' });
});

// 🔐 Ruta de login para alumnos
app.post('/loginAlumno', loginAlumno);

// ✅ Ruta protegida (requiere token)
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Esto es una ruta protegida', user: req.user });
});

app.get('/', (req, res) => {
  if (req.url == '/') {
    res.send(
      'si en la URL pone /jobs,/ask,/postulantes... vera los registros en formato JSON'
    ); // este hola mundo se mostrara en el puerto 5000 y en la raiz principal
  } else if (req.url != '/') {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('404 ERROR');
  }
});

/*
 * MODULO ESTADISTICAS
 */
// Endpoint que devuelve el total de alumnos por profesor
// GET /estadisticas/alumnos-por-profesor
app.get('/estadisticas/alumnos-por-profesor', async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT 
         u.id AS profesor_id,
         u.name AS profesor_nombre,
         COUNT(s.id) AS total_alumnos
       FROM students s
       INNER JOIN users u ON s.user_id = u.id
       GROUP BY u.id, u.name
       ORDER BY total_alumnos DESC`
    );

    res.status(200).json(result);
  } catch (error) {
    console.error('Error al obtener alumnos por profesor:', error);
    res.status(500).json({ error: 'Error al obtener alumnos por profesor' });
  }
});

// GET /estadisticas/rutinas-por-profesor?mes=5&anio=2025
app.get('/estadisticas/rutinas-por-profesor', async (req, res) => {
  try {
    const { mes, anio } = req.query;

    const [result] = await pool.query(
      `SELECT 
         u.id AS profesor_id,
         u.name AS profesor_nombre,
         COUNT(r.id) AS total_rutinas
       FROM routines r
       INNER JOIN students s ON r.student_id = s.id
       INNER JOIN users u ON s.user_id = u.id
       WHERE r.mes = ? AND r.anio = ?
       GROUP BY u.id, u.name
       ORDER BY total_rutinas DESC`,
      [mes, anio]
    );

    res.status(200).json(result);
  } catch (error) {
    console.error('Error al obtener rutinas por profesor:', error);
    res.status(500).json({ error: 'Error al obtener rutinas por profesor' });
  }
});

app.get('/estadisticas/ayudas-por-profesor', async (req, res) => {
  try {
    const query = `
      SELECT
        u.id AS profesor_id,
        u.name AS profesor_nombre,
        COUNT(r.id) AS total_ayudas
      FROM routine_request_stats r
      INNER JOIN users u ON r.instructor_id = u.id
      GROUP BY u.id, u.name
      ORDER BY total_ayudas DESC
    `;

    const [result] = await pool.query(query);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error al obtener ayudas por profesor:', error);
    res.status(500).json({ error: 'Error al obtener ayudas por profesor' });
  }
});

if (!PORT) {
  console.error('El puerto no está definido en el archivo de configuración.');
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

process.on('uncaughtException', (err) => {
  console.error('Excepción no capturada:', err);
  process.exit(1); // Opcional: reiniciar la aplicación
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Promesa rechazada no capturada:', promise, 'razón:', reason);
  process.exit(1); // Opcional: reiniciar la aplicación
});
