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

// controllers
export const DL_UpdateMuscleName_CTS = async (req, res) => {
  try {
    const { routineId, oldMuscle } = req.params;
    const { newMuscle } = req.body;

    const [updated] = await RoutineExercisesModel.update(
      { musculo: newMuscle },
      {
        where: {
          routine_id: routineId,
          musculo: oldMuscle
        }
      }
    );

    if (updated > 0) {
      return res.json({ message: 'Músculo actualizado correctamente.' });
    } else {
      return res.status(404).json({
        mensajeError:
          'No se encontraron ejercicios con ese músculo en la rutina.'
      });
    }
  } catch (error) {
    return res.status(500).json({ mensajeError: error.message });
  }
};

// Marcar una rutina como completada
export const UR_CompletarRutina_CTS = async (req, res) => {
  try {
    const { id } = req.params;

    const [actualizadas] = await RoutinesModel.update(
      { completado: true },
      { where: { id } }
    );

    if (actualizadas === 1) {
      const rutinaCompletada = await RoutinesModel.findByPk(id);
      return res.json({
        message: 'Rutina marcada como completada',
        rutinaCompletada
      });
    } else {
      return res.status(404).json({ mensajeError: 'Rutina no encontrada' });
    }
  } catch (error) {
    return res.status(500).json({ mensajeError: error.message });
  }
};
