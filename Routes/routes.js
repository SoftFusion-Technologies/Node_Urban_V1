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
  UR_Routines_CTS,
  DL_RoutineExercisesByMuscle_CTS,
  DL_UpdateMuscleName_CTS
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
  UR_RoutineRequest_CTS,
  atenderSolicitud // <-- (marcar como atendida)
} from '../Controllers/CTS_TB_RoutineRequests.js';

// import { getStats } from '../Controllers/CTS_TB_RoutineRequestStats.js';

import {
  OBR_StudentsPendientes_CTS,
  OBRS_StudentsPendientes_CTS,
  CR_StudentsPendientes_CTS,
  ER_StudentsPendientes_CTS,
  UR_StudentsPendientes_CTS,
  MIGRAR_AlumnoPendiente_CTS
} from '../Controllers/CTS_TB_StudentsPendientes.js';

import {
  OBR_Leads_CTS,
  OBRS_Leads_CTS,
  CR_Leads_CTS,
  ER_Leads_CTS,
  UR_Leads_CTS
} from '../Controllers/CTS_TB_Leads.js';

import {
  OBRS_StudentMonthlyGoals_CTS,
  OBR_StudentMonthlyGoals_CTS,
  CR_StudentMonthlyGoals_CTS,
  ER_StudentMonthlyGoals_CTS,
  UR_StudentMonthlyGoals_CTS
} from '../Controllers/CTS_TB_StudentMonthlyGoals.js';

// NUEVO MODULO DE PROGRESO PARA ALUMNOS
import {
  OBRS_StudentProgress_CTS,
  OBR_StudentProgress_CTS,
  CR_StudentProgress_CTS,
  UR_StudentProgress_CTS,
  ER_StudentProgress_CTS
} from '../Controllers/AlumnProgress/CTS_TB_StudentProgress.js';

import {
  OBRS_StudentWeeklyCheckin_CTS,
  OBR_StudentWeeklyCheckin_CTS,
  CR_StudentWeeklyCheckin_CTS,
  UR_StudentWeeklyCheckin_CTS,
  ER_StudentWeeklyCheckin_CTS
} from '../Controllers/AlumnProgress/CTS_TB_StudentWeeklyCheckin.js';

import {
  OBRS_StudentAchievements_CTS,
  OBR_StudentAchievement_CTS,
  CR_StudentAchievement_CTS,
  UR_StudentAchievement_CTS,
  ER_StudentAchievement_CTS
} from '../Controllers/AlumnProgress/CTS_TB_StudentAchievements.js';
// NUEVO MODULO DE PROGRESO PARA ALUMNOS

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
router.get('/routines/:id', OBRS_Routines_CTS);

// Crear una nueva rutina
router.post('/routines', CR_Routines_CTS);

// Eliminar una rutina por ID
router.delete('/routines/:id', ER_Routines_CTS);

// Actualizar una rutina por ID
router.put('/routines/:id', UR_Routines_CTS);

// eliminar rutina y musculo
router.delete('/routines/:routineId/:musculo', DL_RoutineExercisesByMuscle_CTS);
// routes
router.put('/routines/:routineId/muscle/:oldMuscle', DL_UpdateMuscleName_CTS);

// ----------------------------------------------------------------

// ----------------------------------------------------------------
// Obtener todos los ejercicios o filtrar por routine_id
router.get('/routine_exercises', OBRS_RoutineExercises_CTS);

// Obtener un ejercicio por id
router.get('/routine_exercises/:id', OBR_RoutineExercises_CTS);

// Crear un nuevo ejercicio
router.post('/routine_exercises', CR_RoutineExercises_CTS);

// Eliminar un ejercicio por id
router.delete(
  '/routines/:routineId/routines_exercises/:exerciseId',
  ER_RoutineExercises_CTS
);
// Actualizar un ejercicio por id
router.put(
  '/routines/:routineId/routines_exercises/:exerciseId',
  UR_RoutineExercises_CTS
);
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
// Rutas para routine_requests
router.get('/routine_requests', OBRS_RoutineRequests_CTS);
router.get('/routine_requests/:id', OBR_RoutineRequest_CTS);
router.post('/routine_requests', CR_RoutineRequest_CTS);
router.delete('/routine_requests/:id', ER_RoutineRequest_CTS);
router.put('/routine_requests/:id', UR_RoutineRequest_CTS);

// Nueva ruta para marcar solicitud como atendida y mover a stats
router.post('/routine_requests/atender/:id', atenderSolicitud);

// Ruta para consultar estadísticas
// router.get('/routine_request_stats', getStats);
// ----------------------------------------------------------------

// GET /api/students-pendientes           → Obtener todos o filtrar por user_id
router.get('/students-pendientes', OBRS_StudentsPendientes_CTS);

// GET /api/students-pendientes/:id       → Obtener alumno pendiente por ID
router.get('/students-pendientes/:id', OBR_StudentsPendientes_CTS);

// POST /api/students-pendientes          → Crear nuevo alumno pendiente
router.post('/students-pendientes', CR_StudentsPendientes_CTS);

// DELETE /api/students-pendientes/:id    → Eliminar alumno pendiente
router.delete('/students-pendientes/:id', ER_StudentsPendientes_CTS);

// PUT /api/students-pendientes/:id       → Actualizar alumno pendiente
router.put('/students-pendientes/:id', UR_StudentsPendientes_CTS);

// POST /api/students-pendientes/migrar/:id → Autorizar (migrar) alumno
router.post('/students-pendientes/migrar/:id', MIGRAR_AlumnoPendiente_CTS);
// ----------------------------------------------------------------

// Obtener todos los leads o aplicar filtros si los tuviera
router.get('/leads', OBRS_Leads_CTS);

// Obtener un lead específico por su ID
router.get('/leads/:id', OBR_Leads_CTS);

// Crear un nuevo lead
router.post('/leads', CR_Leads_CTS);

// Eliminar un lead por su ID
router.delete('/leads/:id', ER_Leads_CTS);

// Actualizar un lead por su ID
router.put('/leads/:id', UR_Leads_CTS);

// Obtener todos los objetivos o filtrarlos por student_id, mes, año
router.get('/student-monthly-goals', OBRS_StudentMonthlyGoals_CTS);

// Obtener un objetivo específico por su ID
router.get('/student-monthly-goals/:id', OBR_StudentMonthlyGoals_CTS);

// Crear un nuevo objetivo (o varios)
router.post('/student-monthly-goals', CR_StudentMonthlyGoals_CTS);

// Eliminar un objetivo por su ID
router.delete('/student-monthly-goals/:id', ER_StudentMonthlyGoals_CTS);

// Actualizar un objetivo por su ID
router.put('/student-monthly-goals/:id', UR_StudentMonthlyGoals_CTS);


// ===========================
// NUEVO MODULO DE PROGRESO PARA ALUMNOS
// ===========================

// Progreso mensual del alumno
// Obtener todos los progresos o filtrarlos por student_id, mes y año
router.get('/student-progress', OBRS_StudentProgress_CTS);

// Obtener un progreso específico por ID
router.get('/student-progress/:id', OBR_StudentProgress_CTS);

// Crear nuevo progreso
router.post('/student-progress', CR_StudentProgress_CTS);

// Actualizar progreso por ID
router.put('/student-progress/:id', UR_StudentProgress_CTS);

// Eliminar progreso por ID
router.delete('/student-progress/:id', ER_StudentProgress_CTS);

// ----------------------------------------

// Check-in semanal del alumno
// Obtener todos los check-ins o filtrarlos por student_id, semana y año
router.get('/student-weekly-checkin', OBRS_StudentWeeklyCheckin_CTS);

// Obtener un check-in específico por ID
router.get('/student-weekly-checkin/:id', OBR_StudentWeeklyCheckin_CTS);

// Crear nuevo check-in
router.post('/student-weekly-checkin', CR_StudentWeeklyCheckin_CTS);

// Actualizar check-in por ID
router.put('/student-weekly-checkin/:id', UR_StudentWeeklyCheckin_CTS);

// Eliminar check-in por ID
router.delete('/student-weekly-checkin/:id', ER_StudentWeeklyCheckin_CTS);

// ----------------------------------------

// Logros del alumno
// Obtener todos los logros o filtrarlos por student_id
router.get('/student-achievements', OBRS_StudentAchievements_CTS);

// Obtener un logro específico por ID
router.get('/student-achievements/:id', OBR_StudentAchievement_CTS);

// Crear nuevo logro
router.post('/student-achievements', CR_StudentAchievement_CTS);

// Actualizar logro por ID
router.put('/student-achievements/:id', UR_StudentAchievement_CTS);

// Eliminar logro por ID
router.delete('/student-achievements/:id', ER_StudentAchievement_CTS);

// Exporta el enrutador
export default router;
