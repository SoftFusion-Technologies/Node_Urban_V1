/*
 * Programador: Benjamin Orellana
 * Fecha Creación: 08 /08 / 2025
 * Versión: 1.0
 *
 * Descripción:
 * Definición del modelo Sequelize para la tabla routine_exercise_logs.
 * Relaciona un ejercicio de rutina, un alumno, fecha, peso, y observaciones.
 */

import dotenv from 'dotenv';
import db from '../DataBase/db.js';
import { DataTypes } from 'sequelize';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const RoutineExerciseLogsModel = db.define(
  'routine_exercise_logs',
  {
    routine_exercise_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    student_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    peso: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
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

export default RoutineExerciseLogsModel;
