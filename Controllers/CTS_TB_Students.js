/*
 * Programador: Benjamin Orellana
 * Fecha Creación: 23 /05 / 2025
 * Versión: 1.0
 *
 * Descripción:
 * Este archivo (CTS_TB_Students.js) contiene controladores para manejar operaciones CRUD en el modelo Sequelize de students.
 *
 * Tema: Controladores - Students
 *
 * Capa: Backend
 *
 * Nomenclatura: OBR_ obtenerRegistro
 *               OBRS_obtenerRegistros(plural)
 *               CR_ crearRegistro
 *               ER_ eliminarRegistro
 */

// Importa el modelo de students
import StudentsModel from '../Models/MD_TB_Students.js';

// Mostrar todos los registros de StudentsModel o filtrar por user_id (por ejemplo)
export const OBRS_Students_CTS = async (req, res) => {
  try {
    const { user_id } = req.query;
    const whereClause = user_id ? { user_id } : {};
    const registros = await StudentsModel.findAll({ where: whereClause });
    res.json(registros);
  } catch (error) {
    console.error('Error al obtener alumnos:', error);
    res.status(500).json({ mensajeError: 'Error al obtener alumnos' });
  }
};

// Mostrar un registro específico de StudentsModel por su ID
export const OBR_Students_CTS = async (req, res) => {
  try {
    const registro = await StudentsModel.findByPk(req.params.id);
    if (registro) {
      res.json(registro);
    } else {
      res.status(404).json({ mensajeError: 'Alumno no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Crear un nuevo registro en StudentsModel
export const CR_Students_CTS = async (req, res) => {
  try {
    const registro = await StudentsModel.create(req.body);
    res.json({ message: 'Alumno creado correctamente', registro });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Eliminar un registro en StudentsModel por su ID
export const ER_Students_CTS = async (req, res) => {
  try {
    const deletedCount = await StudentsModel.destroy({
      where: { id: req.params.id }
    });
    if (deletedCount === 1) {
      res.json({ message: 'Alumno eliminado correctamente' });
    } else {
      res.status(404).json({ mensajeError: 'Alumno no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Actualizar un registro en StudentsModel por su ID
export const UR_Students_CTS = async (req, res) => {
  try {
    const { id } = req.params;
    const [numRowsUpdated] = await StudentsModel.update(req.body, {
      where: { id }
    });

    if (numRowsUpdated === 1) {
      const registroActualizado = await StudentsModel.findByPk(id);
      res.json({
        message: 'Alumno actualizado correctamente',
        registroActualizado
      });
    } else {
      res.status(404).json({ mensajeError: 'Alumno no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};
