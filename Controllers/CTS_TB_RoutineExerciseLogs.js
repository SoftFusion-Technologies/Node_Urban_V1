/*
 * Programador: Benjamin Orellana
 * Fecha Creación: 08/08/2025
 * Versión: 1.0
 *
 * Descripción:
 * Controladores para manejar operaciones CRUD en el modelo routine_exercise_logs.
 * Tema: Controladores - RoutineExerciseLogs
 * Capa: Backend
 */

import RoutineExerciseLogsModel from '../Models/MD_TB_RoutineExerciseLogs.js';

// Obtener todos los registros de logs o filtrar por ejercicio/alumno
export const OBRS_RoutineExerciseLogs_CTS = async (req, res) => {
  try {
    const { student_id, routine_exercise_id } = req.query;
    const whereClause = {};
    if (student_id) whereClause.student_id = student_id;
    if (routine_exercise_id)
      whereClause.routine_exercise_id = routine_exercise_id;

    const registros = await RoutineExerciseLogsModel.findAll({
      where: whereClause
    });
    res.json(registros);
  } catch (error) {
    console.error('Error al obtener logs:', error);
    res.status(500).json({ mensajeError: 'Error al obtener logs' });
  }
};

// Obtener un log por ID
export const OBR_RoutineExerciseLog_CTS = async (req, res) => {
  try {
    const registro = await RoutineExerciseLogsModel.findByPk(req.params.id);
    if (!registro) {
      return res.status(404).json({ mensajeError: 'Registro no encontrado' });
    }
    res.json(registro);
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Crear un nuevo log (registro de peso)
export const CR_RoutineExerciseLog_CTS = async (req, res) => {
  try {
    const log = req.body;

    const nuevoLog = await RoutineExerciseLogsModel.create(log);
    return res.json({
      message: 'Registro de peso creado correctamente',
      nuevoLog
    });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Eliminar un log por ID
export const ER_RoutineExerciseLog_CTS = async (req, res) => {
  try {
    const { logId } = req.params;
    const filasEliminadas = await RoutineExerciseLogsModel.destroy({
      where: { id: logId }
    });

    if (filasEliminadas === 0) {
      return res.status(404).json({ mensajeError: 'Registro no encontrado' });
    }
    res.json({ message: 'Registro eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Actualizar un log por ID (si se permite)
export const UR_RoutineExerciseLog_CTS = async (req, res) => {
  try {
    const { logId } = req.params;
    const datosActualizar = req.body;

    const [numFilasActualizadas] = await RoutineExerciseLogsModel.update(
      datosActualizar,
      { where: { id: logId } }
    );

    if (numFilasActualizadas === 1) {
      const logActualizado = await RoutineExerciseLogsModel.findByPk(logId);
      return res.json({
        message: 'Registro actualizado correctamente',
        logActualizado
      });
    } else {
      return res.status(404).json({ mensajeError: 'Registro no encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ mensajeError: error.message });
  }
};
