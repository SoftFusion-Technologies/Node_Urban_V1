import jwt from 'jsonwebtoken';
import db from '../DataBase/db.js';

// Función de login

export const login = async (req, res) => {
  const { email, password } = req.body;

  const sql =
    'SELECT * FROM users WHERE email = :email AND password = :password';
  try {
    const [results, metadata] = await db.query(sql, {
      replacements: { email: email, password: password }
    });
    if (results.length > 0) {
      const user = results[0];
      const token = jwt.sign({ id: user.id, level: user.level }, 'softfusion', {
        expiresIn: '1h'
      });
      return res.json({
        message: 'Success',
        token,
        level: user.level,
        name: user.name
      });
    } else {
      return res.json('Fail');
    }
  } catch (err) {
    console.log('Error executing query', err);
    return res.json('Error');
  }
};

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'softfusion', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

export const loginAlumno = async (req, res) => {
  const { telefono, dni } = req.body;

  const sql = `
    SELECT * FROM students
    WHERE telefono = :telefono AND dni = :dni
  `;

  try {
    const [results] = await db.query(sql, {
      replacements: { telefono, dni }
    });

    if (results.length > 0) {
      const student = results[0];
      const token = jwt.sign(
        { id: student.id, role: 'student', nomyape: student.nomyape },
        'softfusion',
        { expiresIn: '1h' }
      );

      return res.json({
        message: 'Success',
        token,
        name: student.nomyape
      });
    } else {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error del servidor' });
  }
};

export const authenticateStudent = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'softfusion', (err, student) => {
    if (err) return res.sendStatus(403);
    req.student = student;
    next();
  });
};
