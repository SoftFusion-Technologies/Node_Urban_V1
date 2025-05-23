/*
 * Programador: Benjamin Orellana
 * Fecha Cración: 23 /05 / 2025
 * Versión: 1.0
 *
 * Descripción:
 *Este archivo (MD_TB_RoutineExercises.js) contiene la definición del modelo Sequelize para la tabla routine_exercises.
 * Tema: Modelos - RoutineExercises
 * Capa: Backend
 */

// Importa la configuración de la base de datos y tipos de datos necesarios
import dotenv from 'dotenv';
import db from '../DataBase/db.js';
import { DataTypes } from 'sequelize';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const RoutineExercisesModel = db.define(
  'routine_exercises',
  {
    routine_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    musculo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    orden: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    timestamps: false
  }
);

export default RoutineExercisesModel;
