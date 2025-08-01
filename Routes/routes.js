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
  DL_UpdateMuscleName_CTS,
  UR_CompletarRutina_CTS,
  OBRS_RoutinesByInstructor_CTS
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

// NUEVO MODULO DE DIETAS
import {
  OBRS_Diets_CTS,
  OBR_Diets_CTS,
  CR_Diets_CTS,
  UR_Diets_CTS,
  ER_Diets_CTS
} from '../Controllers/Diets/CTS_TB_Diets.js';

import {
  OBRS_Meals_CTS,
  OBR_Meals_CTS,
  CR_Meals_CTS,
  UR_Meals_CTS,
  ER_Meals_CTS
} from '../Controllers/Diets/CTS_TB_Meals.js';

import {
  OBRS_MealItems_CTS,
  OBR_MealItems_CTS,
  CR_MealItems_CTS,
  UR_MealItems_CTS,
  ER_MealItems_CTS
} from '../Controllers/Diets/CTS_TB_MealItems.js';
// NUEVO MODULO DE DIETAS

// NUEVO MODULO DE GESTION DE RM
import {
  OBR_StudentRM_CTS,
  OBRS_StudentRM_CTS,
  CR_StudentRM_CTS,
  ER_StudentRM_CTS,
  UR_StudentRM_CTS,
  OBRS_HistorialRM_CTS
} from '../Controllers/CTS_TB_StudentRM.js';
// NUEVO MODULO DE GESTION DE RM

import {
  OBRS_RoutineExerciseLogs_CTS, // Obtener todos los logs o filtrar
  OBR_RoutineExerciseLog_CTS, // Obtener un log por id
  CR_RoutineExerciseLog_CTS, // Crear un nuevo log
  ER_RoutineExerciseLog_CTS, // Eliminar un log
  UR_RoutineExerciseLog_CTS, // Actualizar un log
  OBR_LastRoutineExerciseLog_CTS,
  OBRS_ExercisesWithLastLog_CTS,
  OBR_HistoryRoutineExerciseLogs_CTS
} from '../Controllers/CTS_TB_RoutineExerciseLogs.js';

import {
  OBRS_RutinaColores_CTS,
  OBR_RutinaColor_CTS,
  CR_RutinaColor_CTS,
  UR_RutinaColor_CTS,
  ER_RutinaColor_CTS
} from '../Controllers/CTS_TB_RutinaColores.js';

import {
  OBRS_EjerciciosProfesor_CTS, // Listar/buscar todos (GET)
  OBR_EjercicioProfesor_CTS, // Traer uno por ID (GET)
  CR_EjercicioProfesor_CTS, // Crear (POST)
  UR_EjercicioProfesor_CTS, // Editar (PUT)
  ER_EjercicioProfesor_CTS // Eliminar (DELETE)
} from '../Controllers/CTS_TB_EjerciciosProfesor.js';

import {
  OBRS_BloquesEjercicio_CTS,
  OBR_BloqueEjercicio_CTS,
  CR_BloqueEjercicio_CTS,
  UR_BloqueEjercicio_CTS,
  ER_BloqueEjercicio_CTS
} from '../Controllers/CTS_TB_BloquesEjercicio.js';
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

// Ruta para completar una rutina
router.put('/routines/:id/completar', UR_CompletarRutina_CTS);

router.get('/routines-by-instructor', OBRS_RoutinesByInstructor_CTS);

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

// NUEVO MODULO DE DIETAS
router.get('/diets', OBRS_Diets_CTS);
router.get('/diets/:id', OBR_Diets_CTS);
router.post('/diets', CR_Diets_CTS);
router.put('/diets/:id', UR_Diets_CTS);
router.delete('/diets/:id', ER_Diets_CTS);

router.get('/meals', OBRS_Meals_CTS);
router.get('/meals/:id', OBR_Meals_CTS);
router.post('/meals', CR_Meals_CTS);
router.put('/meals/:id', UR_Meals_CTS);
router.delete('/meals/:id', ER_Meals_CTS);

router.get('/meal_items', OBRS_MealItems_CTS);
router.get('/meal_items/:id', OBR_MealItems_CTS);
router.post('/meal_items', CR_MealItems_CTS);
router.put('/meal_items/:id', UR_MealItems_CTS);
router.delete('/meal_items/:id', ER_MealItems_CTS);
// NUEVO MODULO DE DIETAS

// ----------------------------------------------------------------
// Obtener todos los registros de RM (opcionalmente filtrar por student_id)
router.get('/student-rm', OBRS_StudentRM_CTS);

// Obtener un registro de RM por ID
router.get('/student-rm/:id', OBR_StudentRM_CTS);

// Crear un nuevo registro de RM
router.post('/student-rm', CR_StudentRM_CTS);

// Eliminar un registro de RM por ID
router.delete('/student-rm/:id', ER_StudentRM_CTS);

// Actualizar un registro de RM por ID
router.put('/student-rm/:id', UR_StudentRM_CTS);

router.get('/rm-historial', OBRS_HistorialRM_CTS); // http://localhost:8080/rm-historial?student_id=18&ejercicio=Sentadilla

// ----------------------------------------------------------------
// Obtener todos los logs o filtrar por alumno y/o ejercicio
router.get('/routine_exercise_logs', OBRS_RoutineExerciseLogs_CTS);

// 👉 Esta línea debe ir antes que la de :id
// GET /routine_exercise_logs/last?student_id=XX&routine_exercise_id=YY
router.get('/routine_exercise_logs/last', OBR_LastRoutineExerciseLog_CTS);

router.get(
  '/routine_exercise_logs/history',
  OBR_HistoryRoutineExerciseLogs_CTS
);
// Obtener un log por id
router.get('/routine_exercise_logs/:id', OBR_RoutineExerciseLog_CTS);

// Crear un nuevo log (registro de peso)
router.post('/routine_exercise_logs', CR_RoutineExerciseLog_CTS);

// Eliminar un log por id
router.delete('/routine_exercise_logs/:logId', ER_RoutineExerciseLog_CTS);

// Actualizar un log por id (opcional, si permitís edición)
router.put('/routine_exercise_logs/:logId', UR_RoutineExerciseLog_CTS);

// GET /routine_exercises/with_last_log?routine_id=XX&student_id=YY
router.get('/routine_exercises/with_last_log', OBRS_ExercisesWithLastLog_CTS);

router.get('/rutina-colores', OBRS_RutinaColores_CTS);
router.get('/rutina-colores/:id', OBR_RutinaColor_CTS);
router.post('/rutina-colores', CR_RutinaColor_CTS);
router.put('/rutina-colores/:id', UR_RutinaColor_CTS);
router.delete('/rutina-colores/:id', ER_RutinaColor_CTS);

// Buscar/listar ejercicios de un profesor (con filtro opcional)
router.get('/ejercicios-profes', OBRS_EjerciciosProfesor_CTS);

// Obtener uno por ID
router.get('/ejercicios-profes/:id', OBR_EjercicioProfesor_CTS);

// Crear nuevo
router.post('/ejercicios-profes', CR_EjercicioProfesor_CTS);

// Actualizar nombre de un ejercicio
router.put('/ejercicios-profes/:id', UR_EjercicioProfesor_CTS);

// Eliminar un ejercicio
router.delete('/ejercicios-profes/:id', ER_EjercicioProfesor_CTS);

router.get(
  '/ejercicios-profes/:ejercicio_id/bloques',
  OBRS_BloquesEjercicio_CTS
);
router.get('/bloques-ejercicio/:id', OBR_BloqueEjercicio_CTS);
router.post('/ejercicios-profes/:ejercicio_id/bloques', CR_BloqueEjercicio_CTS);
router.put('/bloques-ejercicio/:id', UR_BloqueEjercicio_CTS);
router.delete('/bloques-ejercicio/:id', ER_BloqueEjercicio_CTS);
// Exporta el enrutador
export default router;
