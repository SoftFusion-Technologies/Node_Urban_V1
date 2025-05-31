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
import RoutineRequestStatsModel from '../Models/MD_TB_RoutineRequestStats.js';
import RoutinesModel from '../Models/MD_TB_Routines.js';
import { Op, fn, col, where } from 'sequelize';

// Obtener requests filtrando sólo los que le corresponden al instructor
export const OBRS_RoutineRequests_CTS = async (req, res) => {
  try {
    const { estado, instructor_id } = req.query;

    if (!instructor_id) {
      return res
        .status(400)
        .json({ mensajeError: 'instructor_id es requerido' });
    }

    // Aquí asumiendo que instructor_id está relacionado con las rutinas,
    // vamos a obtener sólo solicitudes que sean de rutinas de ese instructor.

    // Para eso, necesitamos relacionar RoutineRequests con Routines y filtrar
    // asumiendo que tienes modelo de routines y su relación instructor_id.

    // Para simplificar, hacemos una consulta con JOIN usando Sequelize
    const registros = await RoutineRequestsModel.findAll({
      where: estado ? { estado } : {},
      include: [
        {
          model: RoutinesModel,
          as: 'routine',
          where: { instructor_id }
        }
      ]
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

export const CR_RoutineRequest_CTS = async (req, res) => {
  try {
    const { student_id, routine_id, exercise_id, mensaje } = req.body;

    if (!student_id || !routine_id || !exercise_id || !mensaje) {
      return res
        .status(400)
        .json({ mensajeError: 'Faltan campos obligatorios' });
    }

    // Normalizar el mensaje (sin espacios y en minúsculas)
    const mensajeNormalizado = mensaje.trim().toLowerCase();

    // Buscar si ya existe una solicitud pendiente con el mismo contenido exacto
    const existe = await RoutineRequestsModel.findOne({
      where: {
        student_id,
        routine_id,
        exercise_id,
        estado: 'pendiente',
        [Op.and]: where(
          fn('lower', fn('trim', col('mensaje'))),
          mensajeNormalizado
        )
      }
    });

    if (existe) {
      return res.status(400).json({
        mensajeError:
          'Ya existe una solicitud pendiente para este ejercicio con el mismo mensaje'
      });
    }

    // Crear la nueva solicitud
    const nuevaSolicitud = await RoutineRequestsModel.create({
      student_id,
      routine_id,
      exercise_id,
      mensaje,
      estado: 'pendiente'
    });

    res.status(201).json(nuevaSolicitud);
  } catch (error) {
    console.error('Error al crear solicitud:', error);
    res.status(500).json({ mensajeError: 'Error al crear la solicitud' });
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

// Marcar solicitud como atendida, mover a stats y eliminar solicitud
export const atenderSolicitud = async (req, res) => {
  const { id } = req.params;
  const { instructor_id } = req.body;

  try {
    const solicitud = await RoutineRequestsModel.findByPk(id);
    if (!solicitud)
      return res.status(404).json({ mensajeError: 'Solicitud no encontrada' });

    // Validar que el instructor que atiende es el dueño de la rutina
    const rutina = await RoutinesModel.findByPk(solicitud.routine_id);
    if (!rutina || rutina.instructor_id !== instructor_id) {
      return res
        .status(403)
        .json({ mensajeError: 'No autorizado para atender esta solicitud' });
    }

    // Crear registro en stats
    await RoutineRequestStatsModel.create({
      student_id: solicitud.student_id,
      routine_id: solicitud.routine_id,
      exercise_id: solicitud.exercise_id,
      instructor_id,
      mensaje: solicitud.mensaje,
      fecha_atendida: new Date(),
      mes: new Date().getMonth() + 1,
      anio: new Date().getFullYear(),
      created_at: new Date()
    });

    // Borrar solicitud
    await RoutineRequestsModel.destroy({ where: { id } });

    res.json({
      message: 'Solicitud atendida y movida a estadísticas correctamente'
    });
  } catch (error) {
    console.error('Error al atender solicitud:', error);
    res.status(500).json({ mensajeError: 'Error al atender solicitud' });
  }
};
