/*
 * Programador: Benjamin Orellana
 * Fecha Cración: 23 /05 / 2025
 * Versión: 1.0
 *
 * Descripción:
 *Controladores para manejar operaciones CRUD en el modelo RoutineRequests
 * Tema: Controladores - Routine Requests
 * Capa: Backend
 */

import RoutineRequestsModel from '../Models/MD_TB_RoutineRequests.js';

// Obtener todos los requests o filtrar por estado
export const OBRS_RoutineRequests_CTS = async (req, res) => {
  try {
    const { estado } = req.query;
    const whereClause = estado ? { estado } : {};
    const registros = await RoutineRequestsModel.findAll({
      where: whereClause
    });
    res.json(registros);
  } catch (error) {
    console.error('Error al obtener solicitudes:', error);
    res.status(500).json({ mensajeError: 'Error al obtener solicitudes' });
  }
};

// Obtener un request específico por ID
export const OBR_RoutineRequest_CTS = async (req, res) => {
  try {
    const registro = await RoutineRequestsModel.findByPk(req.params.id);
    res.json(registro);
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Crear un nuevo request
export const CR_RoutineRequest_CTS = async (req, res) => {
  try {
    const registro = await RoutineRequestsModel.create(req.body);
    res.json({ message: 'Solicitud creada correctamente', registro });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Eliminar un request por ID
export const ER_RoutineRequest_CTS = async (req, res) => {
  try {
    await RoutineRequestsModel.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Solicitud eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Actualizar un request por ID
export const UR_RoutineRequest_CTS = async (req, res) => {
  try {
    const { id } = req.params;
    const [numRowsUpdated] = await RoutineRequestsModel.update(req.body, {
      where: { id }
    });

    if (numRowsUpdated === 1) {
      const registroActualizado = await RoutineRequestsModel.findByPk(id);
      res.json({
        message: 'Solicitud actualizada correctamente',
        registroActualizado
      });
    } else {
      res.status(404).json({ mensajeError: 'Solicitud no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};
