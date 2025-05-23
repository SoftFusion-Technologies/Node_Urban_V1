/*
  * Programador: Benjamin Orellana
  * Fecha Cración: 23 /05 / 2025
  * Versión: 1.0
  *
  * Descripción:
    *Este archivo (routes.js) define las rutas HTTP para operaciones CRUD en la tabla
  * Tema: Rutas
  
  * Capa: Backend 
*/

import express from 'express'; // Importa la librería Express

import {
  OBR_Users_CTS,
  OBRS_Users_CTS,
  OBRS_Instructores_CTS,
  CR_Users_CTS,
  ER_Users_CTS,
  UR_Users_CTS
  // Importa los controladores necesarios para la tabla password_reset - tb_15
} from '../Controllers/CTS_TB_Users.js';

import {
  OBR_Students_CTS,
  OBRS_Students_CTS,
  CR_Students_CTS,
  ER_Students_CTS,
  UR_Students_CTS
} from '../Controllers/CTS_TB_Students.js';

import {
  OBR_Routines_CTS,
  OBRS_Routines_CTS,
  CR_Routines_CTS,
  ER_Routines_CTS,
  UR_Routines_CTS
} from '../Controllers/CTS_TB_Routines.js';

import {
  OBR_RoutineExercises_CTS,
  OBRS_RoutineExercises_CTS,
  CR_RoutineExercises_CTS,
  ER_RoutineExercises_CTS,
  UR_RoutineExercises_CTS
} from '../Controllers/CTS_TB_RoutineExercises.js';

import {
  OBRS_RoutineFeedback_CTS,
  OBR_RoutineFeedback_CTS,
  CR_RoutineFeedback_CTS,
  ER_RoutineFeedback_CTS,
  UR_RoutineFeedback_CTS
} from '../Controllers/CTS_TB_RoutineFeedback.js';

import {
  OBRS_RoutineRequests_CTS,
  OBR_RoutineRequest_CTS,
  CR_RoutineRequest_CTS,
  ER_RoutineRequest_CTS,
  UR_RoutineRequest_CTS
} from '../Controllers/CTS_TB_RoutineRequests.js';

// ----------------------------------------------------------------
// Crea un enrutador de Express
const router = express.Router();
// Define las rutas para cada método del controlador
// ----------------------------------------------------------------

// ----------------------------------------------------------------
// Ruta para obtener todos los registros de Users_CTS tb_1
// ----------------------------------------------------------------
// Define las rutas para cada método del controlador de Users_CTS
// ----------------------------------------------------------------
router.get('/users', OBRS_Users_CTS);

// Obtener un registro específico de Users_CTS por su ID
router.get('/users/:id', OBR_Users_CTS);

// Crear un nuevo registro en Users_CTS
router.post('/users', CR_Users_CTS);

// Eliminar un registro en Users_CTS por su ID
router.delete('/users/:id', ER_Users_CTS);

// Actualizar un registro en Users_CTS por su ID
router.put('/users/:id', UR_Users_CTS);

// Ruta para obtener solo usuarios con level = 'instructor'
router.get('/instructores', OBRS_Instructores_CTS);
// ----------------------------------------------------------------

// ----------------------------------------------------------------
// Obtener todos los estudiantes (opcionalmente filtrar por user_id)
router.get('/students', OBRS_Students_CTS);

// Obtener un estudiante por ID
router.get('/students/:id', OBR_Students_CTS);

// Crear un nuevo estudiante
router.post('/students', CR_Students_CTS);

// Eliminar un estudiante por ID
router.delete('/students/:id', ER_Students_CTS);

// Actualizar un estudiante por ID
router.put('/students/:id', UR_Students_CTS);
// ----------------------------------------------------------------

// ----------------------------------------------------------------
// Obtener todas las rutinas o filtrar por student_id
router.get('/routines', OBRS_Routines_CTS);

// Obtener una rutina por ID
router.get('/routines/:id', OBR_Routines_CTS);

// Crear una nueva rutina
router.post('/routines', CR_Routines_CTS);

// Eliminar una rutina por ID
router.delete('/routines/:id', ER_Routines_CTS);

// Actualizar una rutina por ID
router.put('/routines/:id', UR_Routines_CTS);
// ----------------------------------------------------------------

// ----------------------------------------------------------------
// Obtener todos los ejercicios o filtrar por routine_id
router.get('/routine-exercises', OBRS_RoutineExercises_CTS);

// Obtener un ejercicio por id
router.get('/routine-exercises/:id', OBR_RoutineExercises_CTS);

// Crear un nuevo ejercicio
router.post('/routine-exercises', CR_RoutineExercises_CTS);

// Eliminar un ejercicio por id
router.delete('/routine-exercises/:id', ER_RoutineExercises_CTS);

// Actualizar un ejercicio por id
router.put('/routine-exercises/:id', UR_RoutineExercises_CTS);
// ----------------------------------------------------------------

// ----------------------------------------------------------------
// Obtener todos los feedbacks o filtrar por rutina o alumno
router.get('/routine-feedback', OBRS_RoutineFeedback_CTS);

// Obtener un feedback específico por ID
router.get('/routine-feedback/:id', OBR_RoutineFeedback_CTS);

// Crear un nuevo feedback
router.post('/routine-feedback', CR_RoutineFeedback_CTS);

// Eliminar un feedback por ID
router.delete('/routine-feedback/:id', ER_RoutineFeedback_CTS);

// Actualizar un feedback por ID
router.put('/routine-feedback/:id', UR_RoutineFeedback_CTS);
// ----------------------------------------------------------------

// ----------------------------------------------------------------
// Obtener todas las solicitudes o filtrar por estado
router.get('/routine_requests', OBRS_RoutineRequests_CTS);

// Obtener una solicitud por ID
router.get('/routine_requests/:id', OBR_RoutineRequest_CTS);

// Crear una nueva solicitud
router.post('/routine_requests', CR_RoutineRequest_CTS);

// Eliminar una solicitud por ID
router.delete('/routine_requests/:id', ER_RoutineRequest_CTS);

// Actualizar una solicitud por ID
router.put('/routine_requests/:id', UR_RoutineRequest_CTS);
// ----------------------------------------------------------------

// Exporta el enrutador
export default router;
