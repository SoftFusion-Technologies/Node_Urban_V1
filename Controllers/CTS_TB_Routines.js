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

// Mostrar todos los registros de routines o filtrar por student_id
export const OBRS_Routines_CTS = async (req, res) => {
  try {
    const { student_id } = req.query;
    const whereClause = student_id ? { student_id } : {};
    const registros = await RoutinesModel.findAll({ where: whereClause });
    res.json(registros);
  } catch (error) {
    console.error('Error al obtener rutinas:', error);
    res.status(500).json({ mensajeError: 'Error al obtener rutinas' });
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
