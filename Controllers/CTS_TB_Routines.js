/*
 * Programador: Benjamin Orellana
 * Fecha Cración: 23 /05 / 2025
 * Versión: 1.0
 *
 * Descripción:
 *Este archivo (CTS_TB_Routines.js) contiene controladores para manejar operaciones CRUD en el modelo Sequelize de la tabla routines.
 * Tema: Controladores - Routines
 * Capa: Backend
 */

// Importa el modelo necesario
import RoutinesModel from '../Models/MD_TB_Routines.js';
import RoutineExercisesModel from '../Models/MD_TB_RoutineExercises.js';

// Mostrar todos los registros de routines o filtrar por student_id
// Mostrar todos los registros de routines o filtrar por student_id, incluyendo ejercicios anidados
export const OBRS_Routines_CTS = async (req, res) => {
  try {
    const { student_id } = req.query;
    const whereClause = student_id ? { student_id } : {};

    const registros = await RoutinesModel.findAll({
      where: whereClause,
      include: [
        {
          model: RoutineExercisesModel,
          as: 'exercises' // El alias que definiste en la asociación, ajustar si es distinto
          // Puedes incluir atributos específicos o filtrado si quieres
          // attributes: ['id', 'name', 'sets', 'reps']
        }
      ]
    });

    res.json(registros);
  } catch (error) {
    console.error('Error al obtener rutinas con ejercicios:', error);
    res
      .status(500)
      .json({ mensajeError: 'Error al obtener rutinas con ejercicios' });
  }
};

// Mostrar un registro específico de routines por su ID
export const OBR_Routines_CTS = async (req, res) => {
  try {
    const registro = await RoutinesModel.findByPk(req.params.id);
    res.json(registro);
  } catch (error) {
    res.json({ mensajeError: error.message });
  }
};

export const CR_Routines_CTS = async (req, res) => {
  try {
    const registro = await RoutinesModel.create(req.body);
    res.json({
      message: 'Rutina creada correctamente',
      id: registro.id
    });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Eliminar un registro en routines por su ID
export const ER_Routines_CTS = async (req, res) => {
  try {
    await RoutinesModel.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Rutina eliminada correctamente' });
  } catch (error) {
    res.json({ mensajeError: error.message });
  }
};

// Actualizar un registro en routines por su ID
export const UR_Routines_CTS = async (req, res) => {
  try {
    const { id } = req.params;
    const [numRowsUpdated] = await RoutinesModel.update(req.body, {
      where: { id }
    });

    if (numRowsUpdated === 1) {
      const registroActualizado = await RoutinesModel.findByPk(id);
      res.json({
        message: 'Rutina actualizada correctamente',
        registroActualizado
      });
    } else {
      res.status(404).json({ mensajeError: 'Rutina no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Eliminar ejercicios de una rutina por músculo
export const DL_RoutineExercisesByMuscle_CTS = async (req, res) => {
  try {
    const { routineId, musculo } = req.params;

    const deleted = await RoutineExercisesModel.destroy({
      where: {
        routine_id: routineId,
        musculo: musculo
      }
    });

    if (deleted > 0) {
      return res.json({
        message: `Ejercicios del músculo "${musculo}" eliminados correctamente.`
      });
    } else {
      return res
        .status(404)
        .json({
          mensajeError:
            'No se encontraron ejercicios con ese músculo en la rutina.'
        });
    }
  } catch (error) {
    return res.status(500).json({ mensajeError: error.message });
  }
};

// Obtener rutinas, opcionalmente filtrando por student_id
// Controlador para traer rutinas con ejercicios filtrando por studentId
export const GET_RutinasConEjercicios = async (req, res) => {
  try {
    const { studentId } = req.query;

    if (!studentId) {
      return res
        .status(400)
        .json({ mensajeError: 'Falta el parámetro studentId' });
    }

    const rutinas = await RoutinesModel.findAll({
      where: { student_id: studentId },
      include: [{ model: RoutineExercisesModel, as: 'exercises' }],
      order: [['fecha', 'ASC']]
    });

    // Filtrar rutinas que tengan al menos un ejercicio
    const rutinasConEjercicios = rutinas.filter(
      (rutina) => rutina.exercises && rutina.exercises.length > 0
    );

    res.json(rutinasConEjercicios);
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};
