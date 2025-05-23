/*
 * Programador: Benjamin Orellana
 * Fecha Cración: 23 /05 / 2025
 * Versión: 1.0
 *
 * Descripción:
 *Este archivo (CTS_TB_RoutineExercises.js) contiene controladores para manejar operaciones CRUD en el modelo routine_exercises.
 * Tema: Controladores - RoutineExercises
 * Capa: Backend
 */

import RoutineExercisesModel from '../Models/MD_TB_RoutineExercises.js';

// Obtener todos los ejercicios o filtrar por routine_id
export const OBRS_RoutineExercises_CTS = async (req, res) => {
  try {
    const { routine_id } = req.query;
    const whereClause = routine_id ? { routine_id } : {};
    const registros = await RoutineExercisesModel.findAll({
      where: whereClause
    });
    res.json(registros);
  } catch (error) {
    console.error('Error al obtener ejercicios:', error);
    res.status(500).json({ mensajeError: 'Error al obtener ejercicios' });
  }
};

// Obtener un ejercicio por su ID
export const OBR_RoutineExercises_CTS = async (req, res) => {
  try {
    const registro = await RoutineExercisesModel.findByPk(req.params.id);
    if (!registro) {
      return res.status(404).json({ mensajeError: 'Ejercicio no encontrado' });
    }
    res.json(registro);
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Crear un nuevo ejercicio
export const CR_RoutineExercises_CTS = async (req, res) => {
  try {
    const nuevoEjercicio = await RoutineExercisesModel.create(req.body);
    res.json({ message: 'Ejercicio creado correctamente', nuevoEjercicio });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Eliminar un ejercicio por ID
export const ER_RoutineExercises_CTS = async (req, res) => {
  try {
    const filasEliminadas = await RoutineExercisesModel.destroy({
      where: { id: req.params.id }
    });
    if (filasEliminadas === 0) {
      return res.status(404).json({ mensajeError: 'Ejercicio no encontrado' });
    }
    res.json({ message: 'Ejercicio eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Actualizar un ejercicio por ID
export const UR_RoutineExercises_CTS = async (req, res) => {
  try {
    const { id } = req.params;
    const [numFilasActualizadas] = await RoutineExercisesModel.update(
      req.body,
      {
        where: { id }
      }
    );

    if (numFilasActualizadas === 1) {
      const registroActualizado = await RoutineExercisesModel.findByPk(id);
      res.json({
        message: 'Ejercicio actualizado correctamente',
        registroActualizado
      });
    } else {
      res.status(404).json({ mensajeError: 'Ejercicio no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};
